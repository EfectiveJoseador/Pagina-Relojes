const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'pages', 'tienda.html');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replacements
    content = content.replace(/<label for="filter-league">Liga<\/label>/g, '<label for="filter-league">Colección</label>');
    content = content.replace(/<label for="filter-team">Equipo<\/label>/g, '<label for="filter-team">Modelo</label>');
    content = content.replace(/<option value="">Todos los Equipos<\/option>/g, '<option value="">Todos los Modelos</option>');
    content = content.replace(/<option value="">Todas las Ligas<\/option>/g, '<option value="">Todas las Colecciones</option>');

    // Checkboxes
    // Assuming structure is standard, we replace the whole block or key parts
    content = content.replace(/id="filter-kids"/g, 'id="filter-auto"');
    content = content.replace(/Niños \(Kids\)/g, 'Automático');

    content = content.replace(/id="filter-retro"/g, 'id="filter-quartz"');
    content = content.replace(/Solo Retro/g, 'Cuarzo');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated tienda.html');

} catch (err) {
    console.error('Error updating file:', err);
}
