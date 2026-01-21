

const DropdownDedup = (function () {
    
    const CONFIG = {
        
        SIMILARITY_THRESHOLD: 0.7,

        
        STOPWORDS: [
            'uefa', 'champions', 'league', 'ucl', 'fc', 'cf', 'sc', 'ac',
            'club', 'team', 'women', 'u19', 'u21', 'u23', 'ii', 'b',
            'local', 'visitante', 'tercera', 'cuarta', 'home', 'away', 'third',
            'retro', 'icon', 'classic', 'vintage', 'special', 'edition',
            'black', 'gold', 'golden', 'white', 'pink', 'blue', 'red', 'green',
            'training', 'entrenamiento', 'pre-match', 'stadium', 'authentic',
            'player', 'fan', 'vapor', 'kids', 'niño', 'niños'
        ],

        
        CLUB_PREFIXES: ['fc', 'cf', 'sc', 'ac', 'real', 'cd', 'ud', 'rcd', 'rc', 'sd'],

        
        MANUAL_ALIASES: {
            'barca': 'FC Barcelona',
            'barça': 'FC Barcelona',
            'man utd': 'Manchester United',
            'man united': 'Manchester United',
            'man city': 'Manchester City',
            'atleti': 'Atlético Madrid',
            'atletico': 'Atlético Madrid',
            'madrid': 'Real Madrid', 
        }
    };

    

    
    function normalize(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') 
            .replace(/[^\w\s]/g, ' ')         
            .replace(/\s+/g, ' ')             
            .trim();
    }

    
    function tokenize(str, removeStopwords = true) {
        const normalized = normalize(str);
        let tokens = normalized.split(' ').filter(t => t.length > 1);

        if (removeStopwords) {
            tokens = tokens.filter(t => !CONFIG.STOPWORDS.includes(t));
        }

        return tokens;
    }

    
    function extractCore(str) {
        let tokens = tokenize(str, true);

        
        if (tokens.length > 1 && CONFIG.CLUB_PREFIXES.includes(tokens[0])) {
            tokens = tokens.slice(1);
        }

        
        tokens = tokens.filter(t => !/^\d{2,4}$/.test(t));

        return tokens;
    }

    
    function tokenSimilarity(tokens1, tokens2) {
        if (tokens1.length === 0 || tokens2.length === 0) return 0;

        const set1 = new Set(tokens1);
        const set2 = new Set(tokens2);

        const intersection = [...set1].filter(t => set2.has(t)).length;
        const union = new Set([...set1, ...set2]).size;

        return intersection / union;
    }

    
    function hasPartialMatch(tokens1, tokens2) {
        
        for (const t1 of tokens1) {
            for (const t2 of tokens2) {
                if (t1.includes(t2) || t2.includes(t1)) {
                    return true;
                }
            }
        }
        return false;
    }

    

    
    function isMatch(name1, name2) {
        
        const n1 = normalize(name1);
        const n2 = normalize(name2);

        if (n1 === n2) return true;

        
        const core1 = extractCore(name1);
        const core2 = extractCore(name2);

        if (core1.length === 0 || core2.length === 0) return false;

        
        if (core1.join(' ') === core2.join(' ')) return true;

        
        const similarity = tokenSimilarity(core1, core2);
        if (similarity >= CONFIG.SIMILARITY_THRESHOLD) return true;

        
        if (hasPartialMatch(core1, core2) && similarity >= 0.5) return true;

        return false;
    }

    
    function selectCanonical(name1, name2) {
        const tokens1 = tokenize(name1, false);
        const tokens2 = tokenize(name2, false);

        
        const hasPrefix1 = CONFIG.CLUB_PREFIXES.includes(tokens1[0]);
        const hasPrefix2 = CONFIG.CLUB_PREFIXES.includes(tokens2[0]);

        if (hasPrefix1 && !hasPrefix2) return name1;
        if (hasPrefix2 && !hasPrefix1) return name2;

        
        const noise1 = tokens1.filter(t => CONFIG.STOPWORDS.includes(t)).length;
        const noise2 = tokens2.filter(t => CONFIG.STOPWORDS.includes(t)).length;

        if (noise1 < noise2) return name1;
        if (noise2 < noise1) return name2;

        
        return name1.length <= name2.length ? name1 : name2;
    }

    

    
    function buildCanonicalMap(names) {
        const canonMap = {}; 
        const groups = [];   

        names.forEach(name => {
            let foundGroup = false;

            for (const group of groups) {
                
                if (group.some(member => isMatch(name, member))) {
                    group.push(name);
                    foundGroup = true;
                    break;
                }
            }

            if (!foundGroup) {
                groups.push([name]);
            }
        });

        
        const canonicals = [];

        groups.forEach(group => {
            if (group.length === 1) {
                canonicals.push(group[0]);
                canonMap[group[0]] = group[0];
            } else {
                
                let canonical = group[0];
                for (let i = 1; i < group.length; i++) {
                    canonical = selectCanonical(canonical, group[i]);
                }

                canonicals.push(canonical);

                
                group.forEach(variant => {
                    canonMap[variant] = canonical;
                });
            }
        });

        return { canonMap, canonicals };
    }

    
    function applyMapToDropdown(selectElement) {
        if (!selectElement) return {};

        
        const options = Array.from(selectElement.options);
        const firstOption = options[0]; 
        const names = options.slice(1).map(opt => opt.textContent.trim());

        
        const { canonMap, canonicals } = buildCanonicalMap(names);

        
        selectElement.innerHTML = '';
        selectElement.appendChild(firstOption);

        
        canonicals.sort((a, b) => a.localeCompare(b, 'es'));

        canonicals.forEach(canonical => {
            const option = document.createElement('option');
            option.value = canonical;
            option.textContent = canonical;
            selectElement.appendChild(option);
        });

        
        selectElement._canonMap = canonMap;

        return canonMap;
    }

    
    function getCanonical(selectElement, value) {
        if (!selectElement || !selectElement._canonMap) return value;
        return selectElement._canonMap[value] || value;
    }

    
    return {
        
        config: CONFIG,

        
        normalize,
        tokenize,
        extractCore,

        
        isMatch,
        selectCanonical,
        tokenSimilarity,

        
        buildCanonicalMap,
        applyMapToDropdown,
        getCanonical,

        
        debug: function (names) {
            const result = buildCanonicalMap(names);
            console.log('=== Dropdown Dedup Debug ===');
            console.log('Input:', names);
            console.log('Canonicals:', result.canonicals);
            console.log('Map:', result.canonMap);
            return result;
        }
    };
})();


if (typeof module !== 'undefined' && module.exports) {
    module.exports = DropdownDedup;
}
