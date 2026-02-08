

import products from './products-data.js';
const CONFIG = {
    PRODUCTS_PER_PAGE: 20,
    LAZY_LOAD_THRESHOLD: '200px',
    PLACEHOLDER_COLOR: '#e0e0e0',
    // Progressive loading configuration
    PROGRESSIVE_LOADING: {
        ENABLED: true,
        ROW_DELAY: 75,  // ms between each row
        CARD_DELAY: 50,  // ms between each card within a row (left to right)
        FIRST_ROW_DELAY: 0,  // ms for first row (instant)
        USE_RAF: true  // use requestAnimationFrame
    }
};
let allProducts = [];
let filteredProducts = [];
let currentProduct = null;
let selectedLeague = '';
let selectedTeam = '';
let selectedAuto = false;
let selectedQuartz = false;
let currentPage = 1;
let totalPages = 1;
let imageObserver = null;

// Export variables to window for mobile-filters.js
window.selectedAuto = selectedAuto;
window.selectedQuartz = selectedQuartz;
window.selectedLeague = selectedLeague;
window.selectedTeam = selectedTeam;


function generateSizeOptionsHTML(product) {
    if (!product.sizes || product.sizes.length === 0) {
        return '';
    }

    let options = '<option value="">Seleccionar tamaño *</option>';
    product.sizes.forEach(size => {
        options += `<option value="${size}">${size}</option>`;
    });

    return `
        <div class="form-group">
            <label>Tamaño *</label>
            <select class="quick-size" required>
                ${options}
            </select>
        </div>
    `;
}

function generateStrapOptionsHTML(product) {
    if (!product.straps || product.straps.length === 0) {
        return '';
    }

    let options = '<option value="">Seleccionar correa *</option>';
    product.straps.forEach(strap => {
        options += `<option value="${strap}">${strap}</option>`;
    });

    return `
        <div class="form-group">
            <label>Correa *</label>
            <select class="quick-strap" required>
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

    // Si no hay imágenes extra, devolvemos la misma imagen principal
    // para evitar que aparezca vacío al hacer hover
    return getMiniImagePath(product.image);
}

/**
 * Detects the current number of columns in the grid
 * by reading computed CSS grid-template-columns
 */
function getCurrentGridColumns() {
    const grid = document.getElementById('product-grid');
    if (!grid) return 5; // default fallback

    const computedStyle = window.getComputedStyle(grid);
    const columns = computedStyle.gridTemplateColumns;

    // Count the number of column definitions
    // e.g., "1fr 1fr 1fr 1fr 1fr" = 5 columns
    const columnCount = columns.split(' ').filter(col => col.trim()).length;

    return columnCount || 5;
}

/**
 * Renders a single row of products
 */
function renderProductRow(products, rowIndex) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = products.map((product, colIndex) => {
        return `
        <article class="product-card progressive-loading" data-id="${product.id}" data-row="${rowIndex}" data-col="${colIndex}">
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
                        ${generateSizeOptionsHTML(product)}
                        ${generateStrapOptionsHTML(product)}
                        
                        <div class="form-group">
                            <label>Caja <span style="color: var(--text-muted); font-weight: 400; font-size: 0.8em;">Opcional</span></label>
                            <select class="quick-box">
                                <option value="none">Sin caja - Gratis</option>
                                <option value="basic">Caja 1 - Básica (+€3)</option>
                                <option value="black">Caja 2 - Negra (+€5)</option>
                                <option value="brown">Caja 3 - Negra/Marrón (+€5)</option>
                                <option value="seiko">Caja 4 - Seiko + Tarjetas (+€10)</option>
                            </select>
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

    // Append all products in this row to fragment
    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
    }

    // Add all products to grid at once
    grid.appendChild(fragment);

    // Trigger animation sequentially from left to right
    const rowCards = grid.querySelectorAll(`[data-row="${rowIndex}"]`);
    rowCards.forEach((card, index) => {
        const cardDelay = index * CONFIG.PROGRESSIVE_LOADING.CARD_DELAY;

        setTimeout(() => {
            requestAnimationFrame(() => {
                card.classList.remove('progressive-loading');
                card.classList.add('progressive-loaded');

                // Trigger lazy loading for this specific card
                observeLazyImages();
            });
        }, cardDelay);
    });
}

/**
 * Renders products progressively by rows
 */
function renderProductsByRows(productsToShow) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    // Clear grid
    grid.innerHTML = '';

    if (!CONFIG.PROGRESSIVE_LOADING.ENABLED) {
        // Fallback to instant rendering
        renderAllProductsInstantly(productsToShow);
        return;
    }

    // Detect current grid columns
    const columnsPerRow = getCurrentGridColumns();

    // Split products into rows
    const rows = [];
    for (let i = 0; i < productsToShow.length; i += columnsPerRow) {
        rows.push(productsToShow.slice(i, i + columnsPerRow));
    }

    // Render rows progressively
    rows.forEach((rowProducts, rowIndex) => {
        const delay = rowIndex === 0
            ? CONFIG.PROGRESSIVE_LOADING.FIRST_ROW_DELAY
            : CONFIG.PROGRESSIVE_LOADING.ROW_DELAY * rowIndex;

        if (CONFIG.PROGRESSIVE_LOADING.USE_RAF) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    renderProductRow(rowProducts, rowIndex);
                });
            }, delay);
        } else {
            setTimeout(() => {
                renderProductRow(rowProducts, rowIndex);
            }, delay);
        }
    });

    // Setup listeners after all rows are rendered
    const totalDelay = CONFIG.PROGRESSIVE_LOADING.ROW_DELAY * rows.length + 100;
    setTimeout(() => {
        setupQuickAddListeners();
    }, totalDelay);
}

/**
 * Fallback: Render all products instantly (when progressive loading is disabled)
 */
function renderAllProductsInstantly(productsToShow) {
    const grid = document.getElementById('product-grid');
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = productsToShow.map(product => {
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
                        ${generateSizeOptionsHTML(product)}
                        ${generateStrapOptionsHTML(product)}
                        
                        <div class="form-group">
                            <label>Caja <span style="color: var(--text-muted); font-weight: 400; font-size: 0.8em;">Opcional</span></label>
                            <select class="quick-box">
                                <option value="none">Sin caja - Gratis</option>
                                <option value="basic">Caja 1 - Básica (+€3)</option>
                                <option value="black">Caja 2 - Negra (+€5)</option>
                                <option value="brown">Caja 3 - Negra/Marrón (+€5)</option>
                                <option value="seiko">Caja 4 - Seiko + Tarjetas (+€10)</option>
                            </select>
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

    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
    }
    grid.appendChild(fragment);
    observeLazyImages();
    setupQuickAddListeners();
}

/**
 * Main render function - now uses progressive loading
 */
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

    // Use progressive loading system
    renderProductsByRows(productsToShow);

    renderPagination();
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
            const boxSelect = form.querySelector('.quick-box');
            const priceValue = form.querySelector('.price-value');

            let total = product.price;


            const boxPrices = {
                'none': 0,
                'basic': 3,
                'black': 5,
                'brown': 5,
                'seiko': 10
            };
            const box = boxSelect?.value || 'none';
            total += boxPrices[box] || 0;

            if (priceValue) {
                priceValue.textContent = `€${total.toFixed(2)}`;
            }
        };




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
    const strapSelect = form.querySelector('.quick-strap');
    const boxSelect = form.querySelector('.quick-box');

    // Validar tamaño si es requerido
    if (product.sizes && product.sizes.length > 0) {
        const size = sizeSelect?.value;
        if (!size) {
            if (window.Toast) {
                window.Toast.error('Por favor, selecciona un tamaño');
            } else {
                alert('Por favor, selecciona un tamaño');
            }
            return;
        }
    }

    // Validar correa si es requerida
    if (product.straps && product.straps.length > 0) {
        const strap = strapSelect?.value;
        if (!strap) {
            if (window.Toast) {
                window.Toast.error('Por favor, selecciona una correa');
            } else {
                alert('Por favor, selecciona una correa');
            }
            return;
        }
    }


    const boxPrices = {
        'none': 0,
        'basic': 3,
        'black': 5,
        'brown': 5,
        'seiko': 10
    };
    const selectedBox = boxSelect?.value || 'none';
    const boxPrice = boxPrices[selectedBox] || 0;
    const totalPrice = product.price + boxPrice;

    const customization = {
        size: sizeSelect?.value || null,
        strap: strapSelect?.value || null,
        box: selectedBox,
        boxPrice: boxPrice
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

    if (window.Toast) {
        window.Toast.success(`${product.name} añadido al carrito`);
    }
    if (window.CartBadge) {
        window.CartBadge.animate();
    }
}
function init() {

    const cachedOrder = getProductOrderFromSession();
    const currentProductIds = products.map(p => p.id);





    const cacheValid = cachedOrder &&
        cachedOrder.length === products.length &&
        cachedOrder.every(id => currentProductIds.includes(id));

    if (cacheValid) {

        allProducts = cachedOrder.map(id => products.find(p => p.id === id)).filter(Boolean);
        console.log('✓ Using session-cached product order');
    } else {

        allProducts = shuffleArray([...products]);
        saveProductOrderToSession(allProducts.map(p => p.id));
        console.log('✓ Generated new product order (cache invalidated or new products added)');
    }

    applySpecialPricing();

    filteredProducts = allProducts;
    initLazyLoading();

    populateLeagueFilter();
    attachEventListeners();

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
        const cached = sessionStorage.getItem('tiendaProductOrder_v2');
        if (cached) {
            const data = JSON.parse(cached);

            if (Array.isArray(data.order)) {
                return data.order;
            }
        }
    } catch (e) { }
    return null;
}

function saveProductOrderToSession(orderIds) {
    try {
        sessionStorage.setItem('tiendaProductOrder_v2', JSON.stringify({
            order: orderIds,
            timestamp: Date.now()
        }));
    } catch (e) { }
}
function applySpecialPricing() {


    allProducts.forEach(product => {

        if (product.price && product.oldPrice) {
            product.sale = true;
            return;
        }


        if (!product.price) {
            product.price = 129.90;
            product.oldPrice = 169.90;
            product.sale = true;
        }
    });
}
function populateLeagueFilter() {
    const leagues = [...new Set(allProducts.map(p => p.league))].sort();
    const leagueSelect = document.getElementById('filter-league');

    if (leagueSelect) {
        leagueSelect.innerHTML = '<option value="">Todas las Colecciones</option>';
        leagues.forEach(league => {
            const option = document.createElement('option');
            option.value = league;
            option.textContent = formatLeagueName(league);
            leagueSelect.appendChild(option);
        });
    }
}

function formatLeagueName(league) {
    const map = {
        'retro': 'Retro',
        'relojes': 'Relojes',
        'gmteiko': 'GMTeiko',
        'nauteiko': 'Nauteiko',
        'royal seikoak': 'Royal Seikoak',
        'seikojust': 'Seikojust',
        'seitona': 'Seitona',
        'seikomariner': 'SeikoMariner',
        'yatcheiko': 'Yatcheiko'
    };
    return map[league.toLowerCase()] || league;
}
function applyURLFilters() {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    const league = params.get('collection');
    const team = params.get('team');
    const auto = params.get('auto');
    const quartz = params.get('quartz');
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
        }
    }



    if (auto) {
        selectedAuto = auto === 'true';
        const cb = document.getElementById('filter-auto');
        if (cb) {
            cb.checked = selectedAuto;
        }
    }

    if (quartz) {
        selectedQuartz = quartz === 'true';
        const cb = document.getElementById('filter-quartz');
        if (cb) {
            cb.checked = selectedQuartz;
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
        params.set('collection', selectedLeague);
    }

    if (selectedAuto) {
        params.set('auto', selectedAuto);
    }
    if (selectedQuartz) {
        params.set('quartz', selectedQuartz);
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
        applyFilters();
    });

    const autoCheckbox = document.getElementById('filter-auto');
    if (autoCheckbox) {
        autoCheckbox.addEventListener('change', (e) => {
            selectedAuto = e.target.checked;
            window.selectedAuto = selectedAuto; // Sync to window
            applyFilters();
        });
    }

    const quartzCheckbox = document.getElementById('filter-quartz');
    if (quartzCheckbox) {
        quartzCheckbox.addEventListener('change', (e) => {
            selectedQuartz = e.target.checked;
            window.selectedQuartz = selectedQuartz; // Sync to window
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
        selectedAuto = false;
        selectedQuartz = false;

        const autoCb = document.getElementById('filter-auto');
        if (autoCb) autoCb.checked = false;

        const quartzCb = document.getElementById('filter-quartz');
        if (quartzCb) quartzCb.checked = false;

        // Sync with window variables
        window.selectedAuto = false;
        window.selectedQuartz = false;
        window.selectedLeague = '';
        window.selectedTeam = '';

        document.getElementById('search-input').value = '';
        document.getElementById('sort-select').value = 'default';
        applyFilters();
    });
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function applyFilters(updateURL = true) {
    // Sync local variables with window (for mobile-filters.js)
    if (typeof window.selectedAuto !== 'undefined') {
        selectedAuto = window.selectedAuto;
    }
    if (typeof window.selectedQuartz !== 'undefined') {
        selectedQuartz = window.selectedQuartz;
    }
    if (typeof window.selectedLeague !== 'undefined') {
        selectedLeague = window.selectedLeague;
    }
    if (typeof window.selectedTeam !== 'undefined') {
        selectedTeam = window.selectedTeam;
    }

    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? normalizeString(searchInput.value) : '';
    const sortBy = document.getElementById('sort-select').value;
    currentPage = 1;

    filteredProducts = allProducts.filter(product => {
        const productName = normalizeString(product.name);
        const matchesSearch = productName.includes(searchTerm);
        const matchesLeague = selectedLeague === '' || product.league === selectedLeague;

        let matchesAuto = true;
        if (selectedAuto) {
            const mov = (product.specs && product.specs['Movimiento']) || '';
            const normalizedMov = normalizeString(mov);
            // Must include 'automatico' AND NOT include 'cuarzo'
            matchesAuto = normalizedMov.includes('automatico') && !normalizedMov.includes('cuarzo');
        }

        let matchesQuartz = true;
        if (selectedQuartz) {
            const mov = (product.specs && product.specs['Movimiento']) || '';
            const normalizedMov = normalizeString(mov);
            matchesQuartz = normalizedMov.includes('cuarzo');
        }

        return matchesSearch && matchesLeague && matchesAuto && matchesQuartz;
    });

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
        if (sortBy !== 'default') {
            window.Analytics.trackFilterUse('sort', sortBy);
        }
    }

    if (updateURL) {
        updateURLWithFilters(searchTerm, sortBy);
    }

    renderProducts();
}

// Export applyFilters to window for mobile-filters.js
window.applyFilters = applyFilters;

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
