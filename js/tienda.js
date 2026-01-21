

import products from './products-data.js';
const CONFIG = {
    PRODUCTS_PER_PAGE: 20,
    LAZY_LOAD_THRESHOLD: '200px',
    PLACEHOLDER_COLOR: '#e0e0e0'
};
let allProducts = [];
let filteredProducts = [];
let currentProduct = null;
let selectedLeague = '';
let selectedTeam = '';
let selectedKids = false;
let selectedRetro = false;
let currentPage = 1;
let totalPages = 1;
let imageObserver = null;
const patchPrices = {
    none: 0,
    liga: 1,
    champions: 1,
    europa: 1,
    premier: 1,
    seriea: 1,
    mundial: 1,
    copamundo: 1,
    conmemorativo: 1
};
const SIZE_CONFIGS = {
    kids: ['16', '18', '20', '22', '24', '26', '28'],
    retro: ['S', 'M', 'L', 'XL', '2XL'],
    normal: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    nba: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
};

const extraPrices = {
    embolso: 2,
    envio: 5,
    caja: 8,
    manga: 4,
    oficial: 10
};


const PATCH_DEFINITIONS = {
    liga: "La Liga",
    premier: "Premier",
    seriea: "Serie A",
    bundesliga: "Bundesliga",
    ligue1: "Ligue 1",
    champions: "Champions",
    europa: "Europa League",
    mundial_clubes: "Mundial Clubes",
    copamundo: "Copa del Mundo",
    eurocopa: "Eurocopa",
    copa_america: "Copa América"
};


function getAllowedPatches(product) {
    if (!product) return [];

    const allowed = [];
    const league = product.league;
    const isNBA = product.category === 'nba' || product.league === 'nba';

    
    if (isNBA) return [];

    
    if (league === 'selecciones' || product.category === 'selecciones') {
        allowed.push('copamundo');
        allowed.push('eurocopa');
        allowed.push('copa_america');
        return allowed;
    }

    
    allowed.push('champions');
    allowed.push('europa');
    allowed.push('mundial_clubes');

    
    switch (league) {
        case 'laliga':
            allowed.push('liga');
            break;
        case 'premier':
            allowed.push('premier');
            break;
        case 'seriea':
            allowed.push('seriea');
            break;
        case 'bundesliga':
            allowed.push('bundesliga');
            break;
        case 'ligue1':
            allowed.push('ligue1');
            break;
    }

    return allowed;
}


function generatePatchOptionsHTML(product) {
    const allowedPatches = getAllowedPatches(product);

    if (allowedPatches.length === 0) {
        return ''; 
    }

    let options = '<option value="none">Sin parche</option>';
    allowedPatches.forEach(patchKey => {
        if (PATCH_DEFINITIONS[patchKey]) {
            options += `<option value="${patchKey}">${PATCH_DEFINITIONS[patchKey]}</option>`;
        }
    });

    return `
        <div class="form-group">
            <label>Parche (+€1)</label>
            <select class="quick-patch">
                ${options}
            </select>
        </div>
    `;
}
import * as imageLoader from './imageLoader.js';
function initLazyLoading() {
    imageLoader.init();
}

function observeLazyImages() {
    imageLoader.observeNewImages();
}
function calculatePagination() {
    totalPages = Math.ceil(filteredProducts.length / CONFIG.PRODUCTS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;
}

function getProductsForCurrentPage() {
    const start = (currentPage - 1) * CONFIG.PRODUCTS_PER_PAGE;
    const end = start + CONFIG.PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, end);
}

function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPagination() {
    const container = document.getElementById('pagination-container');
    if (!container) return;
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let paginationHTML = '<div class="pagination">';
    paginationHTML += `
        <button class="pagination-btn pagination-prev" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    if (startPage > 1) {
        paginationHTML += `<button class="pagination-btn" data-page="1">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
        `;
    }
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
        paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
    }
    paginationHTML += `
        <button class="pagination-btn pagination-next" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationHTML += '</div>';
    const start = (currentPage - 1) * CONFIG.PRODUCTS_PER_PAGE + 1;
    const end = Math.min(currentPage * CONFIG.PRODUCTS_PER_PAGE, filteredProducts.length);
    paginationHTML += `
        <div class="pagination-info">
            Mostrando ${start}-${end} de ${filteredProducts.length} productos
        </div>
    `;

    container.innerHTML = paginationHTML;
    container.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            goToPage(page);
        });
    });
}

function getMiniImagePath(imagePath) {
    
    return imagePath.replace(/\/(\d+)\.(webp|jpg|png|jpeg)$/i, '/$1_mini.$2');
}


function getSecondaryMiniImagePath(product) {
    if (product.images && product.images.length > 0) {
        return getMiniImagePath(product.images[0]);
    }
    
    return product.image.replace(/\/1\.(webp|jpg|png|jpeg)$/i, '/2_mini.$1');
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    const noResults = document.getElementById('no-results');

    calculatePagination();

    if (filteredProducts.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        renderPagination();
        return;
    }

    noResults.classList.add('hidden');

    const productsToShow = getProductsForCurrentPage();
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = productsToShow.map(product => {
        const productType = getProductType(product);
        const sizes = SIZE_CONFIGS[productType];
        const sizeOptions = sizes.map(size => {
            const sizeLabel = (size === '3XL' || size === '4XL') ? `${size} (+€2)` : size;
            return `<option value="${size}">${sizeLabel}</option>`;
        }).join('');
        return `
        <article class="product-card" data-id="${product.id}">
            <div class="product-image">
                <span class="badge-sale">OFERTA</span>
                <a href="/pages/producto.html?id=${product.id}">
                    <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23e5e7eb' width='1' height='1'/%3E%3C/svg%3E"
                        data-src="${getMiniImagePath(product.image)}"
                        alt="${product.name}"
                        class="primary-image lazy-image"
                        width="300"
                        height="300"
                        loading="lazy"
                    >
                    <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23e5e7eb' width='1' height='1'/%3E%3C/svg%3E"
                        data-src="${getSecondaryMiniImagePath(product)}"
                        alt="${product.name} - Vista 2"
                        class="secondary-image lazy-image"
                        width="300"
                        height="300"
                        loading="lazy"
                    >
                </a>
                <button class="btn-quick-add" data-id="${product.id}" title="Añadir al carrito">
                    <i class="fas fa-shopping-basket"></i>
                </button>
                
                <!-- Quick Add Panel -->
                <div class="quick-add-panel" data-product-id="${product.id}">
                    <div class="panel-header">
                        <span class="panel-title">Añadir rápido</span>
                        <button class="panel-close" data-id="${product.id}"><i class="fas fa-times"></i></button>
                    </div>
                    <form class="quick-add-form" data-product-id="${product.id}">
                        <div class="form-group">
                            <label>Talla *</label>
                            <select class="quick-size" required>
                                <option value="">Seleccionar</option>
                                ${sizeOptions}
                            </select>
                        </div>
                        
                        <div class="optional-toggle" data-id="${product.id}">
                            <i class="fas fa-chevron-down"></i>
                            <span>Personalización (opcional)</span>
                        </div>
                        
                        <div class="optional-fields" data-id="${product.id}">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <input type="text" class="quick-name" placeholder="Ej: MESSI" maxlength="15" pattern="[A-Za-zÀ-ÿ\\s]*">
                                </div>
                                <div class="form-group">
                                    <label>Dorsal</label>
                                    <input type="text" class="quick-number" placeholder="10" maxlength="2" inputmode="numeric" pattern="[0-9]*">
                                </div>
                            </div>
                            ${generatePatchOptionsHTML(product)}
                        </div>
                        
                        <div class="price-preview">
                            <span class="price-label">Total:</span>
                            <span class="price-value" data-base="${product.price}">€${product.price.toFixed(2)}</span>
                        </div>
                        
                        <button type="submit" class="btn-add-quick">
                            <i class="fas fa-cart-plus"></i> Añadir
                        </button>
                    </form>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="price-old">€${product.oldPrice.toFixed(2)}</span>
                    <span class="price">€${product.price.toFixed(2)}</span>
                </div>
            </div>
        </article>
    `;
    }).join('');
    grid.innerHTML = '';
    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
    }
    grid.appendChild(fragment);
    observeLazyImages();
    renderPagination();
    setupQuickAddListeners();
}


function setupQuickAddListeners() {
    
    document.querySelectorAll('.btn-quick-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = btn.dataset.id;
            toggleQuickAddPanel(productId);
        });
    });

    
    document.querySelectorAll('.quick-add-panel .panel-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = btn.dataset.id;
            closeQuickAddPanel(productId);
        });
    });

    
    document.querySelectorAll('.optional-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = toggle.dataset.id;
            const optionalFields = document.querySelector(`.optional-fields[data-id="${productId}"]`);
            if (optionalFields) {
                optionalFields.classList.toggle('show');
                toggle.classList.toggle('expanded');
            }
        });
    });

    
    document.querySelectorAll('.quick-add-form').forEach(form => {
        const productId = form.dataset.productId;
        const product = allProducts.find(p => p.id === parseInt(productId));
        if (!product) return;

        const updatePrice = () => {
            const sizeSelect = form.querySelector('.quick-size');
            const nameInput = form.querySelector('.quick-name');
            const numberInput = form.querySelector('.quick-number');
            const patchSelect = form.querySelector('.quick-patch');
            const priceValue = form.querySelector('.price-value');

            let total = product.price;

            
            const size = sizeSelect?.value;
            if (size === '3XL' || size === '4XL') {
                total += 2;
            }

            
            const name = nameInput?.value?.trim();
            const number = numberInput?.value?.trim();
            if (name && number) {
                total += 2;
            }

            
            const patch = patchSelect?.value;
            if (patch && patch !== 'none') {
                total += 1;
            }

            if (priceValue) {
                priceValue.textContent = `€${total.toFixed(2)}`;
            }
        };

        
        const nameInput = form.querySelector('.quick-name');
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                let value = e.target.value;
                
                value = value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
                if (value.length > 15) {
                    value = value.slice(0, 15);
                }
                e.target.value = value;
                updatePrice();
            });
        }

        
        const numberInput = form.querySelector('.quick-number');
        if (numberInput) {
            numberInput.addEventListener('input', (e) => {
                let value = e.target.value;
                
                value = value.replace(/\D/g, '');
                if (value.length > 2) {
                    value = value.slice(0, 2);
                }
                
                if (value !== '' && parseInt(value) > 99) {
                    value = '99';
                }
                e.target.value = value;
                updatePrice();
            });
        }

        
        form.querySelectorAll('select').forEach(input => {
            input.addEventListener('change', updatePrice);
        });

        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleQuickAddSubmit(form, product);
        });
    });

    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.quick-add-panel') && !e.target.closest('.btn-quick-add')) {
            closeAllQuickAddPanels();
        }
    });
}

function toggleQuickAddPanel(productId) {
    const panel = document.querySelector(`.quick-add-panel[data-product-id="${productId}"]`);
    const btn = document.querySelector(`.btn-quick-add[data-id="${productId}"]`);

    if (!panel) return;

    const isActive = panel.classList.contains('active');

    
    closeAllQuickAddPanels();

    if (!isActive) {
        panel.classList.add('active');
        if (btn) btn.classList.add('active');
    }
}

function closeQuickAddPanel(productId) {
    const panel = document.querySelector(`.quick-add-panel[data-product-id="${productId}"]`);
    const btn = document.querySelector(`.btn-quick-add[data-id="${productId}"]`);

    if (panel) panel.classList.remove('active');
    if (btn) btn.classList.remove('active');
}

function closeAllQuickAddPanels() {
    document.querySelectorAll('.quick-add-panel.active').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.btn-quick-add.active').forEach(btn => {
        btn.classList.remove('active');
    });
}

function handleQuickAddSubmit(form, product) {
    const sizeSelect = form.querySelector('.quick-size');
    const nameInput = form.querySelector('.quick-name');
    const numberInput = form.querySelector('.quick-number');
    const patchSelect = form.querySelector('.quick-patch');

    
    const size = sizeSelect?.value;
    if (!size) {
        if (window.Toast) {
            window.Toast.error('Por favor, selecciona una talla');
        } else {
            alert('Por favor, selecciona una talla');
        }
        return;
    }

    const name = nameInput?.value?.trim().toUpperCase() || '';
    const number = numberInput?.value?.trim() || '';

    
    if ((name && !number) || (!name && number)) {
        if (window.Toast) {
            window.Toast.error('El nombre y dorsal deben ir juntos');
        } else {
            alert('El nombre y dorsal deben ir juntos');
        }
        return;
    }

    
    let totalPrice = product.price;

    if (size === '3XL' || size === '4XL') {
        totalPrice += 2;
    }

    if (name && number) {
        totalPrice += 2;
    }

    const patch = patchSelect?.value || 'none';
    if (patch !== 'none') {
        totalPrice += patchPrices[patch] || 1;
    }

    
    const customization = {
        size: size,
        version: 'aficionado', 
        name: name,
        number: number,
        patch: patch,
        extras: []
    };

    const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        basePrice: product.price,
        price: totalPrice,
        quantity: 1,
        customization: customization
    };

    
    addToCart(cartItem);

    
    closeQuickAddPanel(product.id.toString());

    
    form.reset();
    const optionalFields = form.querySelector('.optional-fields');
    const optionalToggle = form.querySelector('.optional-toggle');
    if (optionalFields) optionalFields.classList.remove('show');
    if (optionalToggle) optionalToggle.classList.remove('expanded');

    
    if (window.Toast) {
        window.Toast.success(`${product.name} añadido al carrito`);
    }
    if (window.CartBadge) {
        window.CartBadge.animate();
    }
}
function init() {
    
    const cachedOrder = getProductOrderFromSession();

    if (cachedOrder && cachedOrder.length === products.length) {
        
        allProducts = cachedOrder.map(id => products.find(p => p.id === id)).filter(Boolean);
        console.log('Using session-cached product order');
    } else {
        
        allProducts = shuffleArray([...products]);
        saveProductOrderToSession(allProducts.map(p => p.id));
        console.log('Generated and cached new product order');
    }

    applySpecialPricing();

    filteredProducts = allProducts;
    initLazyLoading();

    populateLeagueFilter();
    attachEventListeners();
    setupModal();

    applyURLFilters();
    applyFilters(false);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function getProductOrderFromSession() {
    try {
        const cached = sessionStorage.getItem('tiendaProductOrder');
        if (cached) {
            const data = JSON.parse(cached);
            
            if (Array.isArray(data.order)) {
                return data.order;
            }
        }
    } catch (e) {  }
    return null;
}

function saveProductOrderToSession(orderIds) {
    try {
        sessionStorage.setItem('tiendaProductOrder', JSON.stringify({
            order: orderIds,
            timestamp: Date.now()
        }));
    } catch (e) {  }
}
function applySpecialPricing() {
    allProducts.forEach(product => {
        const nameLower = product.name.toLowerCase();
        const imageLower = (product.image || '').toLowerCase();
        const isKids = product.kids === true || nameLower.includes('kids') || nameLower.includes('niño') || nameLower.includes('niños') || imageLower.includes('kids');
        const isRetro = product.retro === true || product.name.toLowerCase().includes('retro') || product.league === 'retro';
        const isNBA = product.category === 'nba' || product.league === 'nba';
        let oldPrice = 25.00;
        let newPrice = 19.90;

        if (isNBA) {
            oldPrice = 30.00;
            newPrice = 24.90;
        } else if (isRetro) {
            oldPrice = 30.00;
            newPrice = 24.90;
        } else if (isKids) {
            oldPrice = 27.00;
            newPrice = 21.90;
        }
        product.oldPrice = oldPrice;
        product.price = newPrice;
        product.sale = true;
    });
}
function populateLeagueFilter() {
    const leagues = [...new Set(allProducts.map(p => p.league))].sort();
    const leagueSelect = document.getElementById('filter-league');

    if (leagueSelect) {
        leagueSelect.innerHTML = '<option value="">Todas las Ligas</option>';
        leagues.forEach(league => {
            const option = document.createElement('option');
            option.value = league;
            option.textContent = formatLeagueName(league);
            leagueSelect.appendChild(option);
        });
    }
}
function populateTeamFilter(league) {
    const teamSelect = document.getElementById('filter-team');
    const teamStep = document.getElementById('team-step');

    if (!league) {
        teamStep.classList.add('hidden');
        selectedTeam = '';
        return;
    }

    const leagueProducts = allProducts.filter(p => p.league === league);

    
    const variants = [
        'Local', 'Visitante', 'Tercera', 'Cuarta', 'Fourth', 'Home', 'Away', 'Third',
        'Portero', 'Goalkeeper', 'GK',
        'Retro', 'Icon', 'Classic', 'Vintage',
        'Especial', 'Special', 'Edici[oó]n.*', 'Limited', 'Commemorative', 'Conmemorativ[ao]',
        'Black', 'Gold', 'Golden', 'White', 'Pink', 'Blue', 'Red', 'Green', 'Golde', 'cyan',
        'Training', 'Entrenamiento', 'Pre-match', 'Warm-up',
        'Anniversary', 'Aniversario', 'Centemary', 'Centenario',
        'Player', 'Fan', 'Vapor', 'Authentic',
        'Stadium', 'Women', 'Edition'
    ];
    const variantRegex = new RegExp(`\\b(${variants.join('|')})\\b`, 'gi');

    
    const sizePattern = /\bS-[X\d]+L?\b/gi;

    
    
    const canonicalNames = {
        'mexico': 'México',
        'newcastle': 'Newcastle United',
        'newcastle united': 'Newcastle United',
        'barcelona': 'FC Barcelona',
        'fc barcelona': 'FC Barcelona',
        'sporting lisboa': 'Sporting de Lisboa',
        'sporting de lisboa': 'Sporting de Lisboa',
        'sporting lisbon': 'Sporting de Lisboa',
        'boca juniors': 'Boca Juniors',
        'boca juniors stadium': 'Boca Juniors',
        'flamengo': 'Flamengo',
        'inter miami': 'Inter Miami',
        'miami': 'Inter Miami',
        'man utd': 'Manchester United',
        'man united': 'Manchester United',
        'manchester united': 'Manchester United',
        'alaves': 'Alavés',
        'atletico madrid': 'Atlético Madrid',
        'atletico mineiro': 'Atlético Mineiro',
        'sao paulo': 'São Paulo',
        'celta': 'Celta de Vigo',
        'celta de vigo': 'Celta de Vigo',
        'athletic': 'Athletic Club',
        'athletic club': 'Athletic Club',
        'athletic bilbao': 'Athletic Club',
        'real sociedad': 'Real Sociedad',
        'brasil': 'Brasil',
        'brazil': 'Brasil'
    };

    
    const canonicalKeys = {
        'barcelona': 'fc barcelona',
        'newcastle': 'newcastle united',
        'sporting lisboa': 'sporting de lisboa',
        'sporting lisbon': 'sporting de lisboa',
        'miami': 'inter miami',
        'mexico': 'mexico',
        'man utd': 'manchester united',
        'man united': 'manchester united',
        'boca juniors stadium': 'boca juniors',
        'alaves': 'alaves',
        'celta': 'celta de vigo',
        'athletic': 'athletic club',
        'athletic bilbao': 'athletic club',
        'brazil': 'brasil'
    };

    
    const teamMap = new Map();

    leagueProducts.forEach(p => {
        let name = p.name;
        
        name = name.replace(/&amp;/g, '&').replace(/&[a-z]+;/gi, ' ');
        name = name.replace(/\d{2}\/\d{2}/, '');
        name = name.replace(/\b20\d{2}\b/, ''); 
        name = name.replace(/\(.*\)/g, ''); 
        name = name.replace(variantRegex, '');
        name = name.replace(sizePattern, ''); 
        name = name.replace(/\s+/g, ' ').trim();

        if (name) {
            
            let key = normalizeString(name);

            
            key = canonicalKeys[key] || key;

            
            const displayName = canonicalNames[key] || canonicalNames[normalizeString(name)] || name;

            
            if (!teamMap.has(key)) {
                teamMap.set(key, displayName);
            }
        }
    });

    const teams = [...teamMap.values()].sort();

    if (teamSelect) {
        teamSelect.innerHTML = '<option value="">Todos los Equipos</option>';
        teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamSelect.appendChild(option);
        });

        
        if (typeof DropdownDedup !== 'undefined') {
            DropdownDedup.applyMapToDropdown(teamSelect);
        }

        teamStep.classList.remove('hidden');
    }
}
function formatLeagueName(league) {
    const map = {
        'laliga': 'La Liga',
        'premier': 'Premier League',
        'seriea': 'Serie A',
        'bundesliga': 'Bundesliga',
        'ligue1': 'Ligue 1',
        'retro': 'Retro',
        'selecciones': 'Selecciones',
        'brasileirao': 'Brasileirão',
        'ligaarabe': 'Liga Árabe',
        'saf': 'SAF (Argentina)',
        'nba': 'NBA',
    };
    return map[league] || league;
}
function applyURLFilters() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    const league = params.get('league');
    const team = params.get('team');
    const kids = params.get('kids');
    const sort = params.get('sort');

    if (search) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = decodeURIComponent(search);
        }
    }

    if (league) {
        selectedLeague = league;
        const leagueSelect = document.getElementById('filter-league');
        if (leagueSelect) {
            leagueSelect.value = league;
            populateTeamFilter(league);
        }
    }

    if (team) {
        const decodedTeam = decodeURIComponent(team.replace(/\+/g, ' '));
        selectedTeam = decodedTeam;

        const teamSelect = document.getElementById('filter-team');
        if (teamSelect) {
            teamSelect.value = decodedTeam;
        }
    }

    if (kids) {
        selectedKids = kids === 'true' || kids === 'kids';
        const kidsCheckbox = document.getElementById('filter-kids');
        if (kidsCheckbox) {
            kidsCheckbox.checked = selectedKids;
        }
    }

    if (sort) {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.value = sort;
        }
    }
}

function updateURLWithFilters(searchTerm, sortBy) {
    const params = new URLSearchParams();

    if (searchTerm) {
        params.set('search', searchTerm);
    }
    if (selectedLeague) {
        params.set('league', selectedLeague);
    }
    if (selectedTeam) {
        params.set('team', selectedTeam);
    }
    if (selectedKids) {
        params.set('kids', selectedKids);
    }
    if (sortBy && sortBy !== 'default') {
        params.set('sort', sortBy);
    }

    const newURL = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

    history.pushState({}, '', newURL);
}
function attachEventListeners() {
    document.getElementById('search-input').addEventListener('input', (e) => {
        applyFilters();
    });
    document.getElementById('filter-league').addEventListener('change', (e) => {
        selectedLeague = e.target.value;
        selectedTeam = '';
        populateTeamFilter(selectedLeague);
        applyFilters();
    });
    document.getElementById('filter-team').addEventListener('change', (e) => {
        selectedTeam = e.target.value;
        applyFilters();
    });
    
    const kidsCheckbox = document.getElementById('filter-kids');
    if (kidsCheckbox) {
        kidsCheckbox.addEventListener('change', (e) => {
            selectedKids = e.target.checked;
            applyFilters();
        });
    }
    
    const retroCheckbox = document.getElementById('filter-retro');
    if (retroCheckbox) {
        retroCheckbox.addEventListener('change', (e) => {
            selectedRetro = e.target.checked;
            applyFilters();
        });
    }
    document.getElementById('sort-select').addEventListener('change', applyFilters);
    document.getElementById('close-filters').addEventListener('click', () => {
        const container = document.querySelector('.catalog-container');
        container.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    });
    document.getElementById('show-filters').addEventListener('click', () => {
        const container = document.querySelector('.catalog-container');
        container.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden';
    });
    const backdrop = document.querySelector('.filters-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            const container = document.querySelector('.catalog-container');
            container.classList.remove('sidebar-open');
            document.body.style.overflow = '';
        });
    }
    document.getElementById('clear-filters').addEventListener('click', () => {
        document.getElementById('filter-league').value = '';
        selectedLeague = '';
        selectedTeam = '';
        selectedKids = false;
        selectedRetro = false;
        document.getElementById('team-step').classList.add('hidden');
        
        const kidsCb = document.getElementById('filter-kids');
        if (kidsCb) kidsCb.checked = false;
        
        const retroCb = document.getElementById('filter-retro');
        if (retroCb) retroCb.checked = false;

        document.getElementById('search-input').value = '';
        document.getElementById('sort-select').value = 'default';
        applyFilters();
    });
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function applyFilters(updateURL = true) {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? normalizeString(searchInput.value) : '';
    const sortBy = document.getElementById('sort-select').value;
    currentPage = 1;

    
    const teamSearchAliases = {
        'sporting de lisboa': ['sporting lisboa', 'sporting lisbon', 'sporting de lisboa'],
        'fc barcelona': ['fc barcelona', 'barcelona'],
        'newcastle united': ['newcastle united', 'newcastle'],
        'méxico': ['mexico', 'méxico'],
        'inter miami': ['inter miami', 'miami'],
        'boca juniors': ['boca juniors', 'boca juniors stadium', 'boca'],
        'manchester united': ['manchester united', 'man utd', 'man united'],
        'alavés': ['alaves', 'alavés'],
        'atlético madrid': ['atletico madrid', 'atlético madrid'],
        'atlético mineiro': ['atletico mineiro', 'atlético mineiro'],
        'são paulo': ['sao paulo', 'são paulo'],
        'celta de vigo': ['celta', 'celta de vigo'],
        'athletic club': ['athletic', 'athletic club', 'athletic bilbao'],
        'brasil': ['brasil', 'brazil']
    };

    filteredProducts = allProducts.filter(product => {
        const productName = normalizeString(product.name);
        const matchesSearch = productName.includes(searchTerm);
        const matchesLeague = selectedLeague === '' || product.league === selectedLeague;
        let matchesTeam = true;
        if (selectedTeam !== '') {
            const teamKey = normalizeString(selectedTeam);
            const aliases = teamSearchAliases[teamKey] || [teamKey];
            
            matchesTeam = aliases.some(alias => productName.includes(normalizeString(alias)));
        }
        let matchesKids = true;
        const nameLower = product.name.toLowerCase();
        const imageLower = (product.image || '').toLowerCase();
        const isKidsProduct = product.kids === true || nameLower.includes('kids') || nameLower.includes('niño') || nameLower.includes('niños') || imageLower.includes('kids');

        if (selectedKids) {
            matchesKids = isKidsProduct;
        }

        
        let matchesRetro = true;
        if (selectedRetro) {
            matchesRetro = nameLower.includes('retro');
        }

        return matchesSearch && matchesLeague && matchesTeam && matchesKids && matchesRetro;
    });
    function getProductTypeOrder(name) {
        const nameLower = name.toLowerCase();
        const isKids = nameLower.includes('kids') || nameLower.includes('niño') || nameLower.includes('niños');

        if (isKids) return 4;
        if (nameLower.includes('tercera')) return 3;
        if (nameLower.includes('visitante') || name.includes(' F')) return 2;
        if (nameLower.includes('local') || name.includes(' L')) return 1;
        return 5;
    }
    filteredProducts.sort((a, b) => getProductTypeOrder(a.name) - getProductTypeOrder(b.name));
    if (sortBy === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    if (window.Analytics) {
        if (searchTerm && searchTerm.length >= 2) {
            window.Analytics.trackSearch(searchTerm, filteredProducts.length);
        }
        if (selectedLeague) {
            window.Analytics.trackFilterUse('league', selectedLeague);
        }
        if (selectedTeam) {
            window.Analytics.trackFilterUse('team', selectedTeam);
        }
        if (selectedKids) {
            window.Analytics.trackFilterUse('kids', selectedKids);
        }
        if (sortBy !== 'default') {
            window.Analytics.trackFilterUse('sort', sortBy);
        }
    }

    if (updateURL) {
        updateURLWithFilters(searchTerm, sortBy);
    }

    renderProducts();
}
function setupModal() {
    const modal = document.getElementById('customization-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const form = document.getElementById('customization-form');

    if (!modal || !form) return;

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    form.addEventListener('submit', handleFormSubmit);
    const inputs = ['modal-size', 'modal-version', 'modal-name', 'modal-number', 'modal-patch'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updatePreview);
            element.addEventListener('input', updatePreview);
        }
    });
}
function openCustomizationModal(productId) {
    currentProduct = allProducts.find(p => p.id === productId);
    if (!currentProduct) return;
    document.getElementById('customization-form').reset();
    document.getElementById('modal-product-id').value = productId;
    populateSizeOptions();
    updatePreview();
    document.getElementById('customization-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function getProductType(product) {
    const nameLower = product.name.toLowerCase();
    const imageLower = (product.image || '').toLowerCase();
    if (product.kids === true || nameLower.includes('kids') || nameLower.includes('niño') || nameLower.includes('niños') || imageLower.includes('kids')) return 'kids';
    if (product.category === 'nba' || product.league === 'nba') return 'nba';
    if (product.retro === true || product.name.toLowerCase().includes('retro') || product.league === 'retro') return 'retro';
    return 'normal';
}
function populateSizeOptions() {
    if (!currentProduct) return;

    const productType = getProductType(currentProduct);
    const sizes = SIZE_CONFIGS[productType];
    const sizeSelect = document.getElementById('modal-size');
    sizeSelect.innerHTML = '<option value="">Seleccionar Talla</option>';
    sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        const sizeLabel = (size === '3XL' || size === '4XL') ? `${size} (+€2)` : size;
        option.textContent = sizeLabel;
        sizeSelect.appendChild(option);
    });
}
function closeModal() {
    document.getElementById('customization-modal').classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}
function updatePreview() {
    const size = document.getElementById('modal-size').value;
    if (!size) {
        alert('Por favor, selecciona una talla');
        return;
    }

    const name = document.getElementById('modal-name').value.trim();
    if (name && !/^[A-Za-zÀ-ÿ\s]+$/.test(name)) {
        alert('El nombre solo puede contener letras y espacios');
        return;
    }

    const number = document.getElementById('modal-number').value;
    if (number && (number < 0 || number > 99)) {
        alert('El dorsal debe estar entre 0 y 99');
        return;
    }
    if ((name && !number) || (!name && number)) {
        alert('⚠️ El nombre y el dorsal deben ir juntos.\n\nSi quieres personalizar la camiseta, debes escribir AMBOS campos:\n• Nombre (ej: MESSI)\n• Dorsal (ej: 10)');
        return;
    }
    const customization = {
        size: size,
        version: document.getElementById('modal-version').value,
        name: name ? name.toUpperCase() : '',
        number: number || '',
        patch: document.getElementById('modal-patch').value,
        extras: []
    };
    let totalPrice = currentProduct.price;
    if (customization.version === 'jugador') totalPrice += 5;
    if (customization.patch && customization.patch !== 'none') {
        totalPrice += patchPrices[customization.patch] || 0;
    }
    if (customization.name && customization.number) {
        totalPrice += 2;
    }
    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        image: currentProduct.image,
        basePrice: currentProduct.price,
        price: totalPrice,
        quantity: 1,
        customization: customization
    };
    addToCart(cartItem);
    closeModal();
    if (window.Toast) {
        window.Toast.success(`${currentProduct.name} añadido al carrito`);
    }
    if (window.CartBadge) {
        window.CartBadge.animate();
    }
}
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(cartItem =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.customization) === JSON.stringify(item.customization)
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
updateCartCount();
