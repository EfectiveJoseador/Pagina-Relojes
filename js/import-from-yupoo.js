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

        await sharp(tempPath)
            .webp({ quality: 85 })
            .toFile(finalPath);

        print('green', `  ✓ Guardada: ${path.basename(finalPath)}`);

        if (filename === '1' || filename === '2') {
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

    if (name.includes('gmteiko')) {
        return 'GMTeiko';
    }
    if (name.includes('nauteiko')) {
        return 'Nauteiko';
    }
    if (name.includes('royal seikoak') || name.includes('royal-seikoak')) {
        return 'Royal Seikoak';
    }
    if (name.includes('seikojust')) {
        return 'Seikojust';
    }
    if (name.includes('seikom') || name.includes('seiko m') || name.includes('mariner')) {
        return 'SeikoMariner';
    }
    if (name.includes('yatch') || name.includes('tacheiko')) {
        return 'Yatcheiko';
    }
    if (name.includes('santeiko') || name.includes('santos')) {
        return 'Santeiko';
    }
    if (name.includes('seitona') || name.includes('daytona')) {
        return 'Seitona';
    }

    const firstWord = productName.split(' ')[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
}

function parseRcbMods(html) {
    const data = {
        name: 'Desconocido',
        description: '',
        images: [],
        features: [],
        straps: [],
        sizes: [],
        price: 0,
        specifications: {}
    };

    const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (titleMatch) {
        let rawName = titleMatch[1].replace(/<[^>]+>/g, '').trim();
        data.name = rawName.replace(/\s*\([^)]+\)/g, '').trim();
    }

    const cleanHtml = html.replace(/\s+/g, ' ');

    const specPatterns = {
        'Diámetro': /Diámetro:\s*([^<•·\n"]+)/i,
        'Movimiento': /Movimiento:\s*([^<•·\n"]+)/i,
        'Grosor': /Grosor:\s*([^<•·\n"]+)/i,
        'Cristal': /Cristal:\s*([^<•·\n"]+)/i,
        'Luminosidad': /Luminosidad:\s*([^<•·\n"]+)/i,
        'Caja': /Caja:\s*([^<•·\n"]+)/i,
        'Corona': /Corona:\s*([^<•·\n"]+)/i,
        'Bisel': /Bisel:\s*([^<•·\n"]+)/i,
        'Tamaño de muñeca': /Tamaño de muñeca:\s*([^<•·\n"]+)/i,
        'Lugs': /Lugs:\s*([^<•·\n"]+)/i,
        'Correa': /Correa:\s*([^<•·\n"]+)/i,
        'Fondo de caja': /Fondo de caja:\s*([^<•·\n"]+)/i
    };

    for (const [key, regex] of Object.entries(specPatterns)) {
        const match = cleanHtml.match(regex);
        if (match) {
            let value = match[1].trim();
            data.specifications[key] = value;
            data.features.push(`${key}: ${value}`);
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

    const imgRegex = /class="[^"]*product__media[^"]*media--transparent[^"]*"[\s\S]*?<img[^>]+src="([^"]+)"/g;
    let match;
    const foundImages = new Set();

    while ((match = imgRegex.exec(html)) !== null) {
        let src = match[1];
        if (src.startsWith('//')) src = 'https:' + src;
        let cleanSrc = src.split('?')[0];
        foundImages.add(cleanSrc);
    }
    data.images = Array.from(foundImages);

    const priceMatch = html.match(/<meta property="og:price:amount" content="([^"]+)"/);
    if (priceMatch) {
        data.price = parseFloat(priceMatch[1].replace(',', '.'));
    }

    return data;
}

async function main() {
    print('bright', '\n=== IMPORTE DE RELOJES (RCB MODS) ===\n');

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

        if (!url.includes('rcbmods.com')) {
            print('red', 'Error: La URL no parece ser de rcbmods.com');
            continue;
        }

        print('yellow', `\nDescargando HTML de: ${url}...`);
        let html;
        try {
            html = await fetchHtml(url);
        } catch (e) {
            print('red', `Error descargando URL: ${e.message}`);
            continue;
        }

        const data = parseRcbMods(html);

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
            name: data.name,
            category: collectionName,
            league: collectionName,
            price: productPricing.price,
            oldPrice: productPricing.oldPrice,
            image: localImages[0],
            images: localImages.slice(1),
            description: data.features.length > 0 ? "Especificaciones Técnicas:\n" + data.features.join('\n') : "Reloj de alta calidad.",
            features: data.features,
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

    let content = fs.readFileSync(FILES.products, 'utf-8');

    const startIdx = content.indexOf('[');
    const endIdx = content.lastIndexOf(']');

    if (startIdx === -1 || endIdx === -1) {
        print('red', 'No se pudo encontrar el array de productos.');
        return;
    }

    let arrayContent = content.substring(startIdx + 1, endIdx);

    const escapedName = newProduct.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const namePattern = new RegExp(`"name"\\s*:\\s*"${escapedName}"`);
    const nameMatch = arrayContent.match(namePattern);

    if (nameMatch) {
        print('yellow', `\n⚠️  El producto "${newProduct.name}" ya existe. Actualizando datos...`);

        let blockStart = arrayContent.lastIndexOf('{', nameMatch.index);

        let blockEnd = -1;
        let braceCount = 0;
        for (let i = blockStart; i < arrayContent.length; i++) {
            if (arrayContent[i] === '{') braceCount++;
            if (arrayContent[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                    blockEnd = i;
                    break;
                }
            }
        }

        if (blockStart !== -1 && blockEnd !== -1) {
            const oldBlock = arrayContent.substring(blockStart, blockEnd + 1);

            const idMatch = oldBlock.match(/"id":\s*(\d+)/);
            if (idMatch) newProduct.id = parseInt(idMatch[1]);

            const newBlock = JSON.stringify(newProduct, null, 4);

            const newContent = content.substring(0, startIdx + 1 + blockStart) +
                newBlock +
                content.substring(startIdx + 1 + blockEnd + 1);

            fs.writeFileSync(FILES.products, newContent);
            print('green', `✓ Producto "${newProduct.name}" actualizado exitosamente.`);
            return;
        }
    }

    print('green', `\nCreando nuevo producto: "${newProduct.name}"`);

    let insertionContent = content.replace(/export\s+default\s+products;\s*$/, '').trim();
    const newEndIdx = insertionContent.lastIndexOf(']');

    const newEntry = JSON.stringify(newProduct, null, 4);
    const innerContent = insertionContent.substring(startIdx + 1, newEndIdx).trim();
    const hasActualProducts = innerContent.replace(/\/\*[\s\S]*?\*\//g, '').trim().length > 0;
    const prefix = (hasActualProducts && !innerContent.endsWith(',')) ? ',' : '';

    const insertion = `${prefix}\n    ${newEntry}\n`;
    let finalContent = insertionContent.slice(0, newEndIdx) + insertion + insertionContent.slice(newEndIdx);
    finalContent += '\n\nexport default products;';

    fs.writeFileSync(FILES.products, finalContent);
    print('green', `✓ Producto guardado en ${FILES.products}`);
}

main().catch(err => {
    console.error('Error fatal:', err);
});
