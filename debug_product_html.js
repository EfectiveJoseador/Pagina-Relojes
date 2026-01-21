const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'pages', 'producto.html');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const snippet = lines.slice(320, 370).join('\n');
fs.writeFileSync('debug_html.txt', snippet, 'utf8');
console.log('Dumped lines 320-370 to debug_html.txt');
