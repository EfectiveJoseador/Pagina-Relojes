const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const sharp = require('sharp');

const COLORS = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m'
};

const FILES = {
    products: path.join(__dirname, 'products-data.js'),
    assetsDir: path.join(__dirname, '..', 'assets', 'productos', 'RC_Mods')
};

if (!fs.existsSync(FILES.assetsDir)) {
    fs.mkdirSync(FILES.assetsDir, { recursive: true });
}

function print(color, text) {
    console.log(`${COLORS[color] || COLORS.reset}${text}${COLORS.reset}`);
}

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                'Accept-Encoding': 'identity',
                'Cache-Control': 'max-age=0',
                'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1'
            }
        };

        https.get(url, options, (res) => {
            let data = '';

            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                let redirectUrl = res.headers.location;
                if (redirectUrl.startsWith('/')) {
                    const parsedOriginal = new URL(url);
                    redirectUrl = `${parsedOriginal.protocol}//${parsedOriginal.host}${redirectUrl}`;
                }
                print('yellow', `  ↳ Redirigiendo a: ${redirectUrl}`);
                return fetchHtml(redirectUrl).then(resolve).catch(reject);
            }

            if (res.statusCode !== 200) {
                print('red', `  Status Code: ${res.statusCode}`);
            }

            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => reject(err));
        });
    });
}

async function processImage(url, destDir, filename) {
    const tempPath = path.join(destDir, `${filename}.tmp`);
    const finalPath = path.join(destDir, `${filename}.webp`);
    const miniPath = path.join(destDir, `${filename}_mini.webp`);

    try {
        await downloadImage(url, tempPath);

        const image = sharp(tempPath);
        const metadata = await image.metadata();

        if (metadata.height > metadata.width) {
            print('yellow', `  ℹ Imagen vertical detectada (${metadata.width}x${metadata.height}). Recortando a cuadrado...`);
            const cropSize = metadata.width;
            const topOffset = Math.floor((metadata.height - cropSize) / 2);

            await image
                .extract({ left: 0, top: topOffset, width: cropSize, height: cropSize })
                .webp({ quality: 85 })
                .toFile(finalPath);
        } else {
            await image
                .webp({ quality: 85 })
                .toFile(finalPath);
        }

        print('green', `  ✓ Guardada: ${path.basename(finalPath)}`);

        if (filename === '1' || filename === '2') {
            // Re-instantiate sharp for the resize to ensure we work from the original temp file
            // or we could chain from the previous operation if we weren't saving to file mid-way.
            // Simplest is to just read tempPath again or reuse the image object if we carefully await.
            // Since we extracted above potentially, let's just reload from tempPath to be safe and simple for the thumbnail
            // The thumbnail logic forces a square cover resize anyway.
            await sharp(tempPath)
                .resize(600, 600, {
                    fit: 'cover',
                    position: 'center'
                })
                .webp({ quality: 80 })
                .toFile(miniPath);
            print('green', `  ✓ Miniatura: ${path.basename(miniPath)}`);
        }

        fs.unlinkSync(tempPath);

        return `/assets/productos/RC_Mods/${path.basename(destDir)}/${path.basename(finalPath)}`;

    } catch (e) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        throw new Error(`Error procesando imagen ${filename}: ${e.message}`);
    }
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

function calculatePrice(productName, specifications) {
    const name = productName.toLowerCase();
    const movement = (specifications.Movimiento || '').toLowerCase();

    if (name.includes('gmteiko')) {
        print('cyan', '  💰 Tipo detectado: GMTeiko → 139.90€ / 169.90€');
        return { price: 139.90, oldPrice: 169.90 };
    }

    if (movement.includes('vk') || movement.includes('cuarzo') || movement.includes('quartz') || movement.includes('híbrido')) {
        print('cyan', '  💰 Tipo detectado: Cuarzo/Híbrido → 119.90€ / 149.90€');
        return { price: 119.90, oldPrice: 149.90 };
    }

    if (name.includes('open heart') || name.includes('openheart') || name.includes('open-heart')) {
        print('cyan', '  💰 Tipo detectado: Open Heart → 139.90€ / 169.90€');
        return { price: 139.90, oldPrice: 169.90 };
    }

    print('cyan', '  💰 Tipo detectado: Automático → 129.90€ / 169.90€');
    return { price: 129.90, oldPrice: 169.90 };
}

function detectCollection(productName) {
    const name = productName.toLowerCase();

    // Prioridad a colecciones específicas
    if (name.includes('royal seikoak') || name.includes('royal-seikoak')) return 'Royal Seikoak';
    if (name.includes('seitona') || name.includes('daytona')) return 'Seitona';
    if (name.includes('gmteiko')) return 'GMTeiko';
    if (name.includes('nauteiko')) return 'Nauteiko';
    if (name.includes('seikom') || name.includes('seiko m') || name.includes('mariner') || name.includes('submariner')) return 'SeikoMariner';
    if (name.includes('yatch') || name.includes('tacheiko') || name.includes('yacht')) return 'Yatcheiko';
    if (name.includes('seikojust') || name.includes('datejust') || name.includes('just')) return 'Seikojust';
    if (name.includes('santeiko') || name.includes('santos')) return 'Santeiko';

    // Fallback inteligente: Usar la primera palabra capitalizada si parece una marca
    const firstWord = productName.split(' ')[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
}

function parseShopifyProduct(html) {
    const data = {
        name: 'Desconocido',
        description: '',
        images: [],
        straps: [],
        sizes: [],
        price: 0,
        specifications: {}
    };

    // Intentar extraer datos del JSON inyectado por Shopify (const product = {...} o window.essentialCountdownTimerMeta)
    let productJsonMatch = html.match(/const\s+product\s*=\s*({[\s\S]*?});/);
    let jsonSource = 'const product';

    // Si no encuentra const product, intentar con window.essentialCountdownTimerMeta
    if (!productJsonMatch) {
        productJsonMatch = html.match(/window\.essentialCountdownTimerMeta\s*=\s*{[\s\S]*?productData:\s*({[\s\S]*?}),/);
        jsonSource = 'window.essentialCountdownTimerMeta';
    }

    if (productJsonMatch) {
        try {
            const productData = JSON.parse(productJsonMatch[1]);
            data.name = productData.title;

            // Descripción desde JSON
            const desc = productData.description || '';
            // Limpiar descripción de tags HTML para búsqueda simple si fuera necesario, 
            // pero para regexes de specs usamos el HTML

            // Precio (viene en centimos habitualmente en Shopify JSON)
            data.price = productData.price / 100;

            // Imágenes
            if (productData.images && productData.images.length > 0) {
                data.images = productData.images.map(img => {
                    if (img.startsWith('//')) return 'https:' + img;
                    return img.split('?')[0];
                });
            }

            console.log(COLORS.green + `  ✓ Datos extraídos del objeto JSON nativo (${jsonSource}).` + COLORS.reset);
        } catch (e) {
            console.log(COLORS.red + '  Error parseando JSON nativo: ' + e.message + COLORS.reset);
        }
    }

    const titleMatch = html.match(/<h1[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
        html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

    // Si no tenemos nombre aún o queremos confirmar con el H1 (a veces el JSON tiene variantes)
    if (!data.name || data.name === 'Desconocido') {
        if (titleMatch) {
            let rawName = titleMatch[1].replace(/<[^>]+>/g, '').trim();
            rawName = rawName.replace(/\s*\([^)]+\)/g, '').trim();
            data.name = rawName;
        }
    }

    // Post-procesado del nombre (común para ambos métodos)
    data.name = data.name.replace(/Seiko\s+Mod\s+Datejust/gi, 'Seikojust');

    const cleanHtml = html.replace(/\s+/g, ' ');

    // Intentar extraer desde meta description og:description
    const metaDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
    let descriptionText = '';
    if (metaDescMatch) {
        descriptionText = metaDescMatch[1];
    }

    // Combinar HTML y descripción para buscar especificaciones
    // IMPORTANTE: Si extrajimos datos del JSON, usar SOLO la descripción del JSON
    // porque el HTML puede tener datos de otros productos
    let combinedText = cleanHtml + ' ' + descriptionText;

    // Si extrajimos descripción del JSON, usarla como fuente principal
    if (productJsonMatch) {
        try {
            const productData = JSON.parse(productJsonMatch[1]);
            const jsonDesc = productData.description || '';
            if (jsonDesc) {
                console.log(COLORS.cyan + '  ℹ Usando descripción del JSON para extraer especificaciones' + COLORS.reset);
                combinedText = jsonDesc.replace(/\s+/g, ' ') + ' ' + descriptionText;
            }
        } catch (e) {
            // Si falla el parse, seguir con combinedText original
        }
    }

    // Shopify usa formato de lista HTML <li><strong>Campo:</strong> valor</li> o bullets
    // Actualizado para soportar <b>Campo:</b><span> </span>Valor (CrownMods)
    const specPatterns = {
        'Caja': /<strong>Caja:<\/strong>\s*([^<]+)|<b>Caja:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Caja:\s*([^\n<-•]+)/i,
        'Diámetro': /<strong>Diámetro:<\/strong>\s*([^<]+)|<b>Diámetro:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Diámetro:\s*([^\n<-•]+)/i,
        'Movimiento': /<strong>Movimiento:\s*<\/strong>\s*([^<]+)|<b>Movimiento:<\/b>(?:\s*<span>(?:&nbsp;|\s)*<\/span>)?\s*([^<]+)|<strong>Movimiento:<\/strong>\s*([^<]+)|[-•]?\s*Movimiento:\s*([^\n<-•]+)/i,
        'Grosor': /<strong>Grosor:<\/strong>\s*([^<]+)|<b>Espesor:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|<b>Grosor:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Grosor:\s*([^\n<-•]+)/i,
        'Cristal': /<strong>Cristal:<\/strong>\s*([^<]+)|<b>Cristal:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Cristal:\s*([^\n<-•]+)/i,
        'Luminosidad': /<strong>Luminosidad:<\/strong>\s*([^<]+)|<b>Agujas luminosas:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Luminosidad:\s*([^\n<-•]+)/i,
        'Corona': /<strong>Corona:<\/strong>\s*([^<]+)|<b>Corona:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Corona:\s*([^\n<-•]+)/i,
        'Bisel': /<strong>Bisel:<\/strong>\s*([^<]+)|<b>Bisel:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Bisel:\s*([^\n<-•]+)/i,
        'Tamaño de muñeca': /<strong>Tamaño de (?:la )?muñeca:<\/strong>\s*([^<]+)|<b>Tamaño de la muñeca:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Tamaño de (?:la )?muñeca:\s*([^\n<-•]+)/i,
        'Pulsera': /<strong>Pulsera:<\/strong>\s*([^<]+)|<b>Pulsera:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Pulsera:\s*([^\n<-•]+)/i,
        'Correa': /<strong>Correa:<\/strong>\s*([^<]+)|<b>Correa:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|<b>Tamaño de la correa:<\/b>(?:\s*<span>\s*<\/span>)?\s*([^<]+)|[-•]\s*Correa:\s*([^\n<-•]+)/i,
        'Fondo de caja': /<strong>Fondo de caja:<\/strong>\s*([^<]+)|[-•]\s*Fondo de caja:\s*([^\n<-•]+)/i,
        'Esfera': /<strong>Esfera:<\/strong>\s*([^<]+)|[-•]\s*Esfera:\s*([^\n<-•]+)/i
    };

    for (const [key, regex] of Object.entries(specPatterns)) {
        const match = combinedText.match(regex);
        if (match) {
            // Encontrar el primer grupo capturado no nulo
            let value = match.slice(1).find(m => m !== undefined && m !== null) || '';
            value = value.trim();
            // Limpiar caracteres especiales adicionales y tags HTML residuales
            value = value.replace(/[•·].*$/, '').replace(/<\/?[^>]+(>|$)/g, "").trim();

            // Capitalizar primera letra
            if (value.length > 0) {
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }
            data.specifications[key] = value;

            // Normalizar el movimiento para casos específicos
            if (key === 'Movimiento') {
                const vLower = value.toLowerCase();
                // Solo normalizar automáticos, mantener híbridos como están
                if (vLower.includes('nh35') || vLower.includes('automático') || vLower.includes('automatic')) {
                    if (!vLower.includes('vk') && !vLower.includes('híbrido') && !vLower.includes('hibrido')) {
                        let caliber = 'NH35';
                        if (vLower.includes('nh34') || vLower.includes('gmt')) caliber = 'NH34';
                        if (vLower.includes('nh38')) caliber = 'NH38';
                        data.specifications['Movimiento'] = `Seiko ${caliber} automático`;
                    }
                }
            }
        }
    }

    const strapsMatch = cleanHtml.match(/Correas Disponibles:\s*([^<]+)/i) ||
        cleanHtml.match(/Available Straps?:\s*([^<]+)/i) ||
        cleanHtml.match(/Bracelet Options?:\s*([^<]+)/i);

    if (strapsMatch) {
        data.straps = strapsMatch[1]
            .split(/[,;&\n]+/)
            .map(s => s.trim())
            .filter(Boolean);
    }

    data.sizes = [];
    const sizeFeatures = data.features.find(f => f.startsWith('Diámetro:') || f.startsWith('Diametro:'));
    if (sizeFeatures && (sizeFeatures.includes('36 mm o 39 mm') || sizeFeatures.includes('36mm o 39mm') || sizeFeatures.includes('36mm / 39mm'))) {
        data.sizes = ['36mm', '39mm'];
        console.log('  ℹ Tamaños detectados: 36mm, 39mm');
    }

    if (data.straps.length === 0 && (data.name.toLowerCase().includes('gmt') || data.name.toLowerCase().includes('diver'))) {
        data.straps = ['Jubilee', 'Oyster'];
        console.log('  ℹ No se encontraron correas específicas, usando opciones por defecto: Jubilee, Oyster');
    }

    if (data.name.toLowerCase().includes('seikojust') || data.name.toLowerCase().includes('just')) {
        const requiredStraps = ['Jubilee', 'President'];
        requiredStraps.forEach(s => {
            if (!data.straps.includes(s)) data.straps.push(s);
        });
        console.log('  ℹ Seikojust detectado: Asegurando correas Jubilee y President');
    }

    // Si ya tenemos imágenes del JSON, no necesitamos buscarlas en el HTML
    if (data.images.length > 0) {
        return data;
    }

    // Shopify usa diferentes patrones para imágenes
    // Intentar varios selectores comunes de Shopify
    const imgRegex1 = /<img[^>]+class="[^"]*product[^"]*"[^>]+src="([^"]+)"/gi;
    const imgRegex2 = /<img[^>]+data-src="([^"]+)"/gi;
    const imgRegex3 = /<img[^>]+srcset="([^"]+)\s+\d+w/gi;
    const imgRegex4 = /<img[^>]+src="([^"]+)"/gi;

    let match;
    const foundImages = new Set();

    // ... rest doesn't need much change but keeping logic consistent
    // Intentar primer patrón (imágenes de producto)
    while ((match = imgRegex1.exec(html)) !== null) {
        let src = match[1];
        if (src.startsWith('//')) src = 'https:' + src;
        let cleanSrc = src.split('?')[0];
        if (!cleanSrc.includes('placeholder') && !cleanSrc.includes('icon')) {
            foundImages.add(cleanSrc);
        }
    }

    // Intentar data-src si no se encontraron imágenes
    if (foundImages.size === 0) {
        while ((match = imgRegex2.exec(html)) !== null) {
            let src = match[1];
            if (src.startsWith('//')) src = 'https:' + src;
            let cleanSrc = src.split('?')[0];
            if (!cleanSrc.includes('placeholder') && !cleanSrc.includes('icon')) {
                foundImages.add(cleanSrc);
            }
        }
    }

    // Intentar srcset si aun no hay imágenes
    if (foundImages.size === 0) {
        while ((match = imgRegex3.exec(html)) !== null) {
            let src = match[1];
            if (src.startsWith('//')) src = 'https:' + src;
            let cleanSrc = src.split('?')[0];
            if (!cleanSrc.includes('placeholder') && !cleanSrc.includes('icon')) {
                foundImages.add(cleanSrc);
            }
        }
    }

    // Como último recurso, tomar todas las imágenes
    if (foundImages.size === 0) {
        while ((match = imgRegex4.exec(html)) !== null) {
            let src = match[1];
            if (src.startsWith('//')) src = 'https:' + src;
            let cleanSrc = src.split('?')[0];
            if (!cleanSrc.includes('placeholder') && !cleanSrc.includes('icon') &&
                (cleanSrc.includes('cdn.shopify.com') || cleanSrc.includes('atelier-cohen-dubois') || cleanSrc.includes('crownmods'))) {
                foundImages.add(cleanSrc);
            }
        }
    }

    // Convertir a array y filtrar la primera imagen (generalmente el logo)
    const allImages = Array.from(foundImages);

    // Encontrar el índice de la imagen de corte (Trustpilot o banners finales)
    const cutoffIndex = allImages.findIndex(img =>
        img.includes('Banniere_Trustpilot_-_ES_-_Page_produits.png') ||
        img.includes('25_2759eda4-8b45-475c-8c06-550e77d4398f.png')
    );

    // Si se encuentra la imagen de corte, tomar solo hasta antes de esa imagen
    // Si no, tomar todas (menos la primera si hay más de una)
    let finalImages = allImages;

    if (cutoffIndex !== -1) {
        finalImages = allImages.slice(0, cutoffIndex);
    }

    // Saltar la primera imagen (logo) si hay más de una y no hemos cortado antes
    data.images = finalImages.length > 1 ? finalImages.slice(1) : finalImages;

    const priceMatch = html.match(/<meta property="og:price:amount" content="([^"]+)"/);
    if (priceMatch) {
        data.price = parseFloat(priceMatch[1].replace(',', '.'));
    }

    return data;
}

async function main() {
    print('bright', '\n=== IMPORTE DE RELOJES (SHOPIFY) ===\n');

    const args = process.argv.slice(2);
    let initialUrl = args[0];
    let continueImporting = true;
    let isFirstRun = true;

    while (continueImporting) {
        let url;
        if (isFirstRun && initialUrl) {
            url = initialUrl;
        } else {
            url = await askQuestion(`${COLORS.cyan}Introduce la URL del producto RCBMods (o deja vacío para salir): ${COLORS.reset}`);
        }

        isFirstRun = false;

        if (!url || url.trim() === '') {
            continueImporting = false;
            break;
        }

        if (!url.includes('atelier-cohen-dubois.com') && !url.includes('crownmods.es') && !url.includes('shopify') && !url.includes('crownmods')) {
            print('red', 'Warning: La URL no parece conocida, pero intentaremos continuar.');
        }

        print('yellow', `\nDescargando HTML de: ${url}...`);
        let html;
        try {
            html = await fetchHtml(url);
        } catch (e) {
            print('red', `Error descargando URL: ${e.message}`);
            continue;
        }

        const data = parseShopifyProduct(html);

        print('green', '\n¡Datos Extraídos!');
        console.log(`${COLORS.bright}Nombre:${COLORS.reset} ${data.name}`);
        console.log(`${COLORS.bright}Precio:${COLORS.reset} €${data.price}`);
        console.log(`${COLORS.bright}Specs encontradas:${COLORS.reset} ${Object.keys(data.specifications).length}`);
        if (data.straps.length) console.log(`${COLORS.bright}Correas:${COLORS.reset} ${data.straps.join(', ')}`);
        console.log(`${COLORS.bright}Imágenes encontradas:${COLORS.reset} ${data.images.length}`);

        if (data.images.length === 0) {
            print('red', 'No se encontraron imágenes. Revisa el selector.');
            continue;
        }

        console.log(`\n${COLORS.cyan}Imágenes disponibles:${COLORS.reset}`);
        data.images.forEach((img, i) => {
            console.log(`[${i}] ${img}`);
        });

        const selectionStr = await askQuestion(`\n${COLORS.yellow}Elige las imágenes (índices separados por coma, ej: 0,2,5): ${COLORS.reset}`);
        const selectedIndices = selectionStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && data.images[n]);

        if (selectedIndices.length === 0) {
            print('red', 'Ninguna imagen seleccionada.');
            continue;
        }

        const selectedImages = selectedIndices.map(i => data.images[i]);

        const handle = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        print('yellow', '\nDescargando y procesando imágenes...');
        const localImages = [];
        const productDir = path.join(FILES.assetsDir, handle);
        if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });

        for (let i = 0; i < selectedImages.length; i++) {
            const imageNumber = i + 1;
            try {
                const relPath = await processImage(selectedImages[i], productDir, imageNumber.toString());
                localImages.push(relPath);
            } catch (e) {
                print('red', `  ✗ ${e.message}`);
            }
        }

        const productPricing = calculatePrice(data.name, data.specifications);

        const collectionName = detectCollection(data.name);

        const finalProduct = {
            id: Date.now(),
            name: collectionName,  // Usar el nombre de la categoría como nombre del producto
            category: collectionName,
            league: collectionName,
            price: productPricing.price,
            oldPrice: productPricing.oldPrice,
            image: localImages[0],
            images: localImages.slice(1),
            sizes: data.sizes,
            straps: data.straps,
            specs: data.specifications
        };

        await saveOrUpdateProduct(finalProduct);

        print('bright', '\n--- Producto Completado ---\n');
    }

    print('bright', '\n¡Proceso Finalizado!');
}

async function saveOrUpdateProduct(newProduct) {
    if (!fs.existsSync(FILES.products)) {
        print('red', 'products-data.js no existe.');
        return;
    }

    // Leer el archivo completo
    let content = fs.readFileSync(FILES.products, 'utf-8');

    // Extraer la parte del array de productos
    const arrayStartMatch = content.match(/const\s+products\s*=\s*\[/);
    if (!arrayStartMatch) {
        print('red', 'No se pudo encontrar la declaración del array de productos.');
        return;
    }

    const arrayStart = arrayStartMatch.index + arrayStartMatch[0].length;
    const arrayEndMatch = content.match(/\];\s*export\s+default\s+products;/);
    if (!arrayEndMatch) {
        print('red', 'No se pudo encontrar el final del array de productos.');
        return;
    }

    const arrayEnd = arrayEndMatch.index;
    const arrayContent = content.substring(arrayStart, arrayEnd);

    // Intentar parsear el array de productos
    let products;
    try {
        products = JSON.parse('[' + arrayContent + ']');
    } catch (e) {
        print('red', `Error parseando el array de productos: ${e.message}`);
        print('yellow', 'Intentando recuperación...');

        // Intentar extraer productos uno por uno
        products = [];
        const productMatches = arrayContent.matchAll(/{[\s\S]*?(?=,\s*{|$)}/g);
        for (const match of productMatches) {
            try {
                const prod = JSON.parse(match[0].trim().replace(/,$/, ''));
                products.push(prod);
            } catch (err) {
                // Skip productos corruptos
            }
        }
    }

    // Buscar si el producto ya existe
    const existingIndex = products.findIndex(p => p.name === newProduct.name);

    if (existingIndex !== -1) {
        print('yellow', `\n⚠️  El producto "${newProduct.name}" ya existe. Actualizando datos...`);
        // Preservar el ID del producto existente
        newProduct.id = products[existingIndex].id;
        // Actualizar el producto
        products[existingIndex] = newProduct;
    } else {
        print('green', `\nCreando nuevo producto: "${newProduct.name}"`);
        // Agregar nuevo producto
        products.push(newProduct);
    }

    // Generar el nuevo contenido del archivo
    const productsJson = products.map(p => JSON.stringify(p, null, 4)).join(',\n    ');
    const newContent = `const products = [\n    ${productsJson}\n];\n\nexport default products;`;

    // Escribir el archivo
    fs.writeFileSync(FILES.products, newContent, 'utf-8');
    print('green', `✓ Producto "${newProduct.name}" guardado exitosamente en ${FILES.products}`);
}

main().catch(err => {
    console.error('Error fatal:', err);
});
