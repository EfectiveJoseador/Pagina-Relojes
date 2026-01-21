import products from './products-data.js';

let product = null;
let selectedStrap = null;
let selectedBox = 'none';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')); // IDs are numbers in the new data
    product = products.find(p => p.id === productId);

    if (!product) {
        // Fallback for string IDs or older links if needed, but primarily 404 behavior
        window.location.href = '/pages/tienda.html';
        return;
    }

    // Set Page Title
    document.title = `${product.name} - Luxe MOD Watches`;

    // Breadcrumbs
    const leagueName = product.league || product.category;
    const breadcrumbLeague = document.getElementById('breadcrumb-league');
    if (breadcrumbLeague) {
        breadcrumbLeague.textContent = leagueName;
        breadcrumbLeague.href = `/pages/tienda.html?category=${encodeURIComponent(product.category)}`;
    }

    const breadcrumbTeam = document.getElementById('breadcrumb-team');
    if (breadcrumbTeam) {
        // If there's a specific team or collection, otherwise hide or set to name
        breadcrumbTeam.style.display = 'none'; // Simplify breadcrumbs for now
    }

    document.getElementById('breadcrumb-name').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `€${product.price.toFixed(2)}`;

    // Populate features (List Only, as requested)
    const featuresEl = document.getElementById('product-features');
    if (featuresEl && product.features && Array.isArray(product.features)) {
        featuresEl.innerHTML = product.features.map(feature => {
            if (feature.includes(':')) {
                const [label, ...rest] = feature.split(':');
                return `<li><i class="fas fa-check"></i> <strong>${label}:</strong>${rest.join(':')}</li>`;
            }
            return `<li><i class="fas fa-check"></i> ${feature}</li>`;
        }).join('');
    }

    // Populate Straps
    const strapContainer = document.getElementById('strap-selector-container');
    const strapSelector = document.getElementById('strap-selector');

    if (product.straps && product.straps.length > 0) {
        if (strapContainer) strapContainer.style.display = 'block';
        if (strapSelector) {
            strapSelector.innerHTML = '';
            product.straps.forEach((strap, index) => {
                const btn = document.createElement('button');
                btn.className = `size-btn ${index === 0 ? 'active' : ''}`; // Reuse size-btn class for styling
                btn.textContent = strap;
                btn.dataset.strap = strap;

                if (index === 0) selectedStrap = strap; // Default select first

                btn.addEventListener('click', () => {
                    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedStrap = strap;
                });

                strapSelector.appendChild(btn);
            });
            // Update CSS for strap buttons if needed, size-btn width is fixed to 45px usually, might need auto width
            // We will inject a style tag for this specific fix or ensure CSS handles it.
            // Check CSS below.
        }
    }

    if (product.oldPrice) {
        const oldPriceEl = document.getElementById('product-old-price');
        oldPriceEl.textContent = `€${product.oldPrice.toFixed(2)}`;
        oldPriceEl.classList.remove('hidden');
    }

    // Initialize Images
    initImages();

    // Add to Cart
    document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);

    // Quantity
    initQuantitySelector();

    // Box Selection
    const boxRadios = document.querySelectorAll('input[name="box"]');
    boxRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectedBox = e.target.value;
        });
    });

    // Related Products
    loadRelatedProducts();

    // Analytics
    if (window.Analytics) {
        window.Analytics.trackProductView({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category
        });
    }

    // Fix for strap button width if they are text
    const style = document.createElement('style');
    style.innerHTML = `
        .product-description { display: none; } /* Ensure text description is hidden as requested */
    `;
    document.head.appendChild(style);
});

function initQuantitySelector() {
    const qtyInput = document.getElementById('qty-input');
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');

    if (!qtyInput || !minusBtn || !plusBtn) return;

    minusBtn.addEventListener('click', () => {
        const val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });

    plusBtn.addEventListener('click', () => {
        const val = parseInt(qtyInput.value);
        if (val < 10) qtyInput.value = val + 1;
    });
}

function addToCart() {
    if (product.straps && product.straps.length > 0 && !selectedStrap) {
        alert('Por favor selecciona una correa.');
        return;
    }

    const quantity = parseInt(document.getElementById('qty-input').value) || 1;

    // Calculate box price
    const boxPrices = {
        'none': 0,
        'basic': 3,
        'black': 5,
        'brown': 5,
        'seiko': 10
    };
    const boxPrice = boxPrices[selectedBox] || 0;
    const totalPrice = product.price + boxPrice;

    const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        basePrice: product.price,
        price: totalPrice,
        quantity: quantity,
        customization: {
            strap: selectedStrap,
            box: selectedBox,
            boxPrice: boxPrice
        }
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(item =>
        item.id === cartItem.id &&
        item.customization.strap === cartItem.customization.strap &&
        item.customization.box === cartItem.customization.box
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    if (window.Toast) {
        window.Toast.success(`${product.name} añadido al carrito`);
    } else {
        showToast(`${product.name} añadido al carrito`);
    }

    if (window.Analytics) {
        window.Analytics.trackAddToCart(product, quantity, cartItem.customization);
    }
}

function showToast(message) {
    const existingToast = document.querySelector('.cart-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    // ... toast styles are usually global or in CSS, assuming existing CSS or inline
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) cartBadge.textContent = totalItems;
}

// Image Gallery Logic
let availableImages = [];
let currentImageIndex = 0;

function initImages() {
    const mainImg = document.getElementById('main-img');
    const thumbnailsContainer = document.querySelector('.thumbnails');

    mainImg.src = product.image;
    mainImg.onerror = function () {
        this.src = '/assets/images/placeholder-jersey.webp';
    };

    // Load available images (simplified from original but keeping logic)
    const allImages = [product.image, ...(product.images || [])];
    // Filter duplicates if any
    const uniqueImages = [...new Set(allImages)];

    uniqueImages.forEach((imgUrl, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `thumb ${idx === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${imgUrl}" alt="View ${idx + 1}" loading="lazy">`;
        thumb.addEventListener('click', () => {
            currentImageIndex = idx;
            updateMainImage(uniqueImages);
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
        thumbnailsContainer.appendChild(thumb);
    });

    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + uniqueImages.length) % uniqueImages.length;
        updateMainImage(uniqueImages);
        updateActiveThumb(currentImageIndex);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % uniqueImages.length;
        updateMainImage(uniqueImages);
        updateActiveThumb(currentImageIndex);
    });

    // Lightbox init
    initLightbox(uniqueImages);
}

function updateMainImage(images) {
    const mainImg = document.getElementById('main-img');
    mainImg.src = images[currentImageIndex];
}

function updateActiveThumb(index) {
    document.querySelectorAll('.thumb').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

// Lightbox
function initLightbox(images) {
    // Basic lightbox setup reusing the existing HTML structure
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;

    const mainImg = document.querySelector('.main-image');
    if (mainImg) {
        mainImg.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-arrow')) return;
            lightbox.classList.add('active');
            updateLightboxImage(images);
        });
    }

    document.getElementById('lightbox-close')?.addEventListener('click', () => lightbox.classList.remove('active'));
    document.getElementById('lightbox-overlay')?.addEventListener('click', () => lightbox.classList.remove('active'));

    // Lightbox navigation
    document.getElementById('lightbox-prev')?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage(images);
    });
    document.getElementById('lightbox-next')?.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage(images);
    });
}

function updateLightboxImage(images) {
    const lbImg = document.getElementById('lightbox-image');
    if (lbImg) lbImg.src = images[currentImageIndex];
}

// Related Products
function loadRelatedProducts() {
    const grid = document.getElementById('related-grid');
    if (!grid) return;

    // Simple random selection for now or existing logic
    const related = products.filter(p => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 8);

    grid.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-track">
                ${related.map(p => `
                    <article class="product-card">
                        <div class="product-image">
                            <a href="/pages/producto.html?id=${p.id}">
                                <img src="${p.image}" alt="${p.name}">
                            </a>
                        </div>
                        <div class="product-info">
                            <h3>${p.name}</h3>
                            <div class="product-price">€${p.price.toFixed(2)}</div>
                        </div>
                    </article>
                `).join('')}
            </div>
        </div>
    `;

    // Initialize carousel scroll logic if needed, or just CSS scroll
    const container = grid.querySelector('.carousel-container');
    container.style.overflowX = 'auto'; // Simple scroll for reliability
    container.style.display = 'flex';
}
