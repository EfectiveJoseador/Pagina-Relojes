const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'pages', 'producto.html');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // We look for the exact structure we saw in debug_html.txt
    // Using a regex that tolerates the encoding chars

    // Pattern: <div class="description-block"> ... </div>
    // We want to replace the inner content or the whole block

    const regex = /<div class="description-block">\s*<h3>[^<]*<\/h3>\s*<p id="product-description">[\s\S]*?<\/ul>\s*<\/div>/;

    if (regex.test(content)) {
        const replacement = `<div class="description-block">
                    <h3>Descripción</h3>
                    <div id="product-description" class="product-description"></div>
                    <ul id="product-features" class="features-list"></ul>
                </div>`;

        content = content.replace(regex, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Successfully cleaned description block in producto.html');
    } else {
        console.log('Could not find the description block with regex.');
        // Fallback: try to replace based on specific strings if regex fails due to encoding
        const startStr = '<div class="description-block">';
        const endStr = '</div>'; // Risks nested divs
        // Since we know the line numbers roughly (320-370), we can't rely on them remaining constant

        // Let's try replacing the inner UL if the main regex fails, 
        // aiming for the "Escudo bordado" part
        if (content.indexOf('Escudo bordado') > -1) {
            console.log('Found "Escudo bordado", attempting manual splice...');
            // This is risky without Cheerio or DOM parser.
            // But we have the debug text.

            // Let's try a simpler regex that skips the header title encoding
            const simpleRegex = /<p id="product-description">[\s\S]*?<\/ul>/;
            if (simpleRegex.test(content)) {
                content = content.replace(simpleRegex, '<div id="product-description" class="product-description"></div><ul id="product-features" class="features-list"></ul>');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Successfully replaced inner content');
            }
        }
    }

} catch (err) {
    console.error('Error updating file:', err);
}
