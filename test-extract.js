const https = require('https');

const url = 'https://crownmods.es/products/seiko-mod-daytona-ice-blue-1';

https.get(url, (res) => {
    let html = '';
    res.on('data', chunk => html += chunk);
    res.on('end', () => {
        // Look for the essentialCountdownTimerMeta section
        const timerMetaMatch = html.match(/window\.essentialCountdownTimerMeta\s*=\s*{/);
        if (timerMetaMatch) {
            const startIdx = html.indexOf(timerMetaMatch[0]);
            console.log('Found window.essentialCountdownTimerMeta at position:', startIdx);
            console.log('Context:', html.substring(startIdx, startIdx + 500));

            // Try different regex patterns
            const patterns = [
                /window\.essentialCountdownTimerMeta\s*=\s*{[\s\S]*?productData:\s*({[\s\S]*?}),/,
                /productData:\s*({.+?}),\s*productCollections/,
                /productData:\s*({"id":.+?}),\s*productCollections/
            ];

            patterns.forEach((pattern, i) => {
                const match = html.match(pattern);
                if (match) {
                    console.log(`\n✓ Pattern ${i + 1} matched!`);
                    try {
                        const data = JSON.parse(match[1]);
                        console.log('  Title:', data.title);
                    } catch (e) {
                        console.log('  Parse error:', e.message);
                    }
                } else {
                    console.log(`\n✗ Pattern ${i + 1} did not match`);
                }
            });
        } else {
            console.log('✗ window.essentialCountdownTimerMeta not found');
        }
    });
}).on('error', (e) => {
    console.error(e);
});
