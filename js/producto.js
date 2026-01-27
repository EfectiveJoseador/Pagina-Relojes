import products from './products-data.js';

let product = null;
let selectedStrap = null;
let selectedSize = null;
let selectedBox = 'none';

document.addEventListener('DOMContentLoaded', () => {
    // ... (rest of setup) ...
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')); // IDs are numbers in the new data
    product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = '/pages/tienda.html';
        return;
    }

    // Set Page Title
    document.title = `${product.name} - Luxe MOD Watches`;

    // Breadcrumbs
    const breadcrumbCategory = document.getElementById('breadcrumb-category');
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = product.category || 'Colección';
        breadcrumbCategory.href = `/pages/tienda.html?collection=${encodeURIComponent(product.category)}`;
    }

    document.getElementById('breadcrumb-name').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `€${product.price.toFixed(2)}`;

    // Populate features
    const featuresEl = document.getElementById('product-features');
    if (featuresEl && product.features && Array.isArray(product.features)) {
        featuresEl.innerHTML = product.features.map(feature => {
            if (feature.includes(':')) {
                const [label, ...rest] = feature.split(':');
                const value = rest.join(':').trim();
                return `<li><i class="fas fa-check"></i> <span><strong>${label}:</strong> ${value}</span></li>`;
            }
            return `<li><i class="fas fa-check"></i> <span>${feature}</span></li>`;
        }).join('');
    }

    // Populate Sizes
    const sizeContainer = document.getElementById('size-selector-container');
    const sizeSelector = document.getElementById('size-selector');

    if (product.sizes && product.sizes.length > 0) {
        if (sizeContainer) sizeContainer.style.display = 'block';
        if (sizeSelector) {
            sizeSelector.innerHTML = '';
            product.sizes.forEach((size, index) => {
                const btn = document.createElement('button');
                btn.className = `size-btn ${index === 0 ? 'active' : ''}`;
                btn.textContent = size;
                btn.dataset.size = size;

                if (index === 0) selectedSize = size;

                btn.addEventListener('click', () => {
                    // Only target buttons within the size selector
                    const sizeBtns = sizeSelector.querySelectorAll('.size-btn');
                    sizeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedSize = size;
                });

                sizeSelector.appendChild(btn);
            });
        }
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
                btn.className = `size-btn ${index === 0 ? 'active' : ''}`;
                btn.textContent = strap;
                btn.dataset.strap = strap;

                if (index === 0) selectedStrap = strap;

                btn.addEventListener('click', () => {
                    // Only target buttons within the strap selector
                    const strapBtns = strapSelector.querySelectorAll('.size-btn');
                    strapBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedStrap = strap;
                });

                strapSelector.appendChild(btn);
            });
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

    const style = document.createElement('style');
    style.innerHTML = `
        .product-description { display: none; }
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

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        alert('Por favor selecciona un tamaño.');
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
            size: selectedSize,
            strap: selectedStrap,
            box: selectedBox,
            boxPrice: boxPrice
        }
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = cart.findIndex(item =>
        item.id === cartItem.id &&
        item.customization.strap === cartItem.customization.strap &&
        item.customization.size === cartItem.customization.size &&
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
// Lightbox Logic
let lightboxState = {
    zoom: 1,
    isDragging: false,
    startX: 0,
    startY: 0,
    translateX: 0,
    translateY: 0,
    maxZoom: 3,
    minZoom: 1
};

function initLightbox(images) {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;

    const mainImg = document.querySelector('.main-image');
    if (mainImg) {
        mainImg.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-arrow')) return;
            openLightbox(images, currentImageIndex);
        });
    }

    // Close Events
    const closeBtn = document.getElementById('lightbox-close');
    const overlay = document.getElementById('lightbox-overlay');

    [closeBtn, overlay].forEach(el => {
        el?.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1, images);
        if (e.key === 'ArrowRight') navigateLightbox(1, images);
    });

    // Navigation
    document.getElementById('lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1, images));
    document.getElementById('lightbox-next')?.addEventListener('click', () => navigateLightbox(1, images));

    // Zoom Controls
    initZoomControls();
}

function openLightbox(images, index) {
    const lightbox = document.getElementById('image-lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    currentImageIndex = index;
    updateLightboxImage(images);
    renderLightboxThumbnails(images);
    resetZoom();
}

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction, images) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    updateLightboxImage(images);
    updateActiveLightboxThumb();
    resetZoom();
}

function updateLightboxImage(images) {
    const lbImg = document.getElementById('lightbox-image');
    if (lbImg) {
        // Fade effect
        lbImg.style.opacity = '0.5';
        setTimeout(() => {
            lbImg.src = images[currentImageIndex];
            lbImg.onload = () => lbImg.style.opacity = '1';
        }, 150);
    }
}

function renderLightboxThumbnails(images) {
    const container = document.getElementById('lightbox-thumbnails');
    if (!container) return;

    container.innerHTML = '';
    images.forEach((img, idx) => {
        const thumb = document.createElement('div');
        thumb.className = `lightbox-thumb ${idx === currentImageIndex ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img}" loading="lazy">`;
        thumb.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent drag/click conflicts
            currentImageIndex = idx;
            updateLightboxImage(images);
            updateActiveLightboxThumb();
            resetZoom();
        });
        container.appendChild(thumb);
    });
}

function updateActiveLightboxThumb() {
    document.querySelectorAll('.lightbox-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === currentImageIndex);
        if (i === currentImageIndex) t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
}

// ------ Zoom & Pan Core Logic ------

function initZoomControls() {
    const imgWrapper = document.getElementById('lightbox-wrapper');
    const img = document.getElementById('lightbox-image');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const slider = document.getElementById('zoom-slider');
    const levelDisplay = document.getElementById('zoom-level-display');

    if (!imgWrapper || !img) return;

    // Helper: Apply Transforms
    function updateTransform() {
        // Constrain Dragging Boundaries
        if (lightboxState.zoom > 1) {
            const rect = imgWrapper.getBoundingClientRect();
            // Allow panning logic here if needed, simplified for now
        } else {
            lightboxState.translateX = 0;
            lightboxState.translateY = 0;
        }

        img.style.transform = `translate(${lightboxState.translateX}px, ${lightboxState.translateY}px) scale(${lightboxState.zoom})`;

        // Update UI
        if (slider) slider.value = Math.round(lightboxState.zoom * 100);
        if (levelDisplay) levelDisplay.textContent = `${Math.round(lightboxState.zoom * 100)}%`;

        imgWrapper.classList.toggle('zoomed', lightboxState.zoom > 1);
        imgWrapper.classList.toggle('dragging', lightboxState.isDragging);
    }

    function setZoom(val) {
        lightboxState.zoom = Math.min(Math.max(val, lightboxState.minZoom), lightboxState.maxZoom);
        updateTransform();
    }

    // Button Events
    zoomInBtn?.addEventListener('click', () => setZoom(lightboxState.zoom + 0.25));
    zoomOutBtn?.addEventListener('click', () => setZoom(lightboxState.zoom - 0.25));

    // Slider Event
    slider?.addEventListener('input', (e) => {
        setZoom(parseInt(e.target.value) / 100);
    });

    // Mouse Wheel Zoom
    imgWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.002;
        setZoom(lightboxState.zoom + delta);
    }, { passive: false });

    // Double Click to Reset/Max
    imgWrapper.addEventListener('dblclick', (e) => {
        if (lightboxState.zoom > 1) {
            resetZoom();
        } else {
            setZoom(2.5); // Instant zoom to 250%
        }
    });

    // Pan (Drag) Logic
    imgWrapper.addEventListener('mousedown', (e) => {
        if (lightboxState.zoom <= 1) return;
        lightboxState.isDragging = true;
        lightboxState.startX = e.clientX - lightboxState.translateX;
        lightboxState.startY = e.clientY - lightboxState.translateY;
        e.preventDefault(); // Prevent default drag behavior
    });

    window.addEventListener('mousemove', (e) => {
        if (!lightboxState.isDragging) return;
        e.preventDefault();
        lightboxState.translateX = e.clientX - lightboxState.startX;
        lightboxState.translateY = e.clientY - lightboxState.startY;
        updateTransform();
    });

    window.addEventListener('mouseup', () => {
        lightboxState.isDragging = false;
        updateTransform();
    });
}

function resetZoom() {
    lightboxState.zoom = 1;
    lightboxState.translateX = 0;
    lightboxState.translateY = 0;

    const slider = document.getElementById('zoom-slider');
    const levelDisplay = document.getElementById('zoom-level-display');
    const img = document.getElementById('lightbox-image');

    if (slider) slider.value = 100;
    if (levelDisplay) levelDisplay.textContent = '100%';
    if (img) img.style.transform = `translate(0px, 0px) scale(1)`;

    document.getElementById('lightbox-wrapper')?.classList.remove('zoomed', 'dragging');
}

// Related Products Carousel
function getMiniImagePath(imagePath) {
    if (!imagePath) return '';
    return imagePath.replace(/\/(\d+)\.(webp|jpg|png|jpeg)$/i, '/$1.webp'); // Simplificado para usar la webp normal si no hay mini o usar _mini si existe
    // Nota: home.js usa _mini, aquí imitamos o reutilizamos.
    // Para asegurar compatibilidad con la estructura de home.js:
    // return imagePath.replace(/\/(\d+)\.(webp|jpg|png|jpeg)$/i, '/$1_mini.$2');
    // Usaremos la versión simple o la misma que home.js si estamos seguros de que existe.
    // Dado que home.js lo usa, asumimos que existen.
    return imagePath.replace(/\/(\d+)\.(webp|jpg|png|jpeg)$/i, '/$1_mini.$2');
}

function getSecondaryMiniImage(product) {
    if (product.images && product.images.length > 0) {
        return getMiniImagePath(product.images[0]);
    }
    if (product.image) {
        // Intento de adivinar la segunda imagen
        const secondaryPath = product.image.replace(/\/1\.(webp|jpg|png|jpeg)$/i, '/2.$1');
        return getMiniImagePath(secondaryPath);
    }
    return null;
}


function loadRelatedProducts() {
    const carousel = document.getElementById('related-carousel');
    if (!carousel) return;

    const track = document.getElementById('related-track');
    const prevBtn = document.getElementById('related-prev');
    const nextBtn = document.getElementById('related-next');
    const carouselContainer = carousel.querySelector('.carousel-container');

    if (!track || !prevBtn || !nextBtn) return;

    // Filter and Shuffle Logic
    // Same filtering as before: exclude current product
    const related = products.filter(p => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 8);

    if (related.length === 0) return;

    // Render Cards in Track
    track.innerHTML = related.map(product => {
        const miniImage = getMiniImagePath(product.image);
        const secondaryImg = getSecondaryMiniImage(product);
        return `
            <article class="product-card carousel-product-card">
                <div class="product-image">
                    <a href="/pages/producto.html?id=${product.id}">
                        <img src="${miniImage}" alt="${product.name}" class="primary-image" loading="lazy">
                        ${secondaryImg ? `<img src="${secondaryImg}" alt="${product.name} - Vista 2" class="secondary-image" loading="lazy">` : ''}
                    </a>
                    <button class="btn-quick-view"><i class="fas fa-eye"></i></button>

                </div>
                <div class="product-info">
                    <span class="product-category">${product.category || 'Reloj'}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        ${product.oldPrice ? `<span class="price-old">€${product.oldPrice.toFixed(2)}</span>` : ''}
                        <span class="price">€${product.price.toFixed(2)}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    // --- CAROUSEL LOGIC COPY FROM HOME.JS ---

    const originalCards = Array.from(track.querySelectorAll('.product-card'));
    if (originalCards.length === 0) return;

    const cardWidth = 280 + 24; // Width + Gap (gap is 1.5rem = 24px)
    const totalCards = originalCards.length;

    // Clone for infinite scroll
    originalCards.forEach(card => {
        const cloneEnd = card.cloneNode(true);
        cloneEnd.classList.add('carousel-clone');
        // cloneEnd.querySelector('img').loading = 'eager'; // Optional
        track.appendChild(cloneEnd);
    });

    [...originalCards].reverse().forEach(card => {
        const cloneStart = card.cloneNode(true);
        cloneStart.classList.add('carousel-clone');
        // cloneStart.querySelector('img').loading = 'eager'; // Optional
        track.insertBefore(cloneStart, track.firstChild);
    });

    let currentPosition = totalCards * cardWidth;
    let isJumping = false;
    let animationId = null;
    let isPaused = false;

    // const SCROLL_SPEED = 0.5; // Slightly faster for related? Keep consistent with home
    const SCROLL_SPEED = 0.3;
    const PAUSE_DURATION = 3000;

    function setPosition(position, animate = true) {
        if (animate) {
            track.style.transition = 'transform 150ms ease-out';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(${-position}px)`;
    }

    function checkBoundary(e) {
        if (e && e.target !== track) return;

        if (currentPosition >= totalCards * 2 * cardWidth) {
            isJumping = true;
            track.style.transition = 'none';
            currentPosition -= totalCards * cardWidth;
            track.style.transform = `translateX(${-currentPosition}px)`;
            void track.offsetHeight; // Force reflow
            isJumping = false;
        }

        if (currentPosition < totalCards * cardWidth) {
            isJumping = true;
            track.style.transition = 'none';
            currentPosition += totalCards * cardWidth;
            track.style.transform = `translateX(${-currentPosition}px)`;
            void track.offsetHeight;
            isJumping = false;
        }
    }

    function smoothScroll() {
        if (isPaused || isJumping) {
            animationId = requestAnimationFrame(smoothScroll);
            return;
        }

        currentPosition += SCROLL_SPEED;

        if (currentPosition >= totalCards * 2 * cardWidth) {
            currentPosition -= totalCards * cardWidth;
            track.style.transition = 'none';
            track.style.transform = `translateX(${-currentPosition}px)`;
        } else {
            track.style.transition = 'none';
            track.style.transform = `translateX(${-currentPosition}px)`;
        }

        animationId = requestAnimationFrame(smoothScroll);
    }

    function startAutoScroll() {
        if (animationId) return;
        isPaused = false;
        animationId = requestAnimationFrame(smoothScroll);
    }

    function stopAutoScroll() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    function pauseAutoScroll() {
        isPaused = true;
    }

    function resumeAutoScroll() {
        isPaused = false;
    }

    let resumeTimeout = null;
    function handleUserInteraction() {
        pauseAutoScroll();
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(resumeAutoScroll, PAUSE_DURATION);
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isJumping) return;
        handleUserInteraction();
        currentPosition -= cardWidth;
        setPosition(currentPosition, true);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isJumping) return;
        handleUserInteraction();
        currentPosition += cardWidth;
        setPosition(currentPosition, true);
    });

    track.addEventListener('transitionend', checkBoundary);

    carouselContainer.addEventListener('mouseenter', pauseAutoScroll);
    carouselContainer.addEventListener('mouseleave', () => {
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeAutoScroll();
    });

    // Initial Set
    setPosition(currentPosition, false);
    track.offsetHeight; // Force reflow

    startAutoScroll();

    // Touch / Drag Logic
    let isDragging = false;
    let startPos = 0;
    let lastPos = 0;
    let lastTime = 0;
    let velocity = 0;
    let inertiaId = null;

    track.style.touchAction = 'pan-y';
    track.style.userSelect = 'none';

    function touchStart(event) {
        if (inertiaId) {
            cancelAnimationFrame(inertiaId);
            inertiaId = null;
        }
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        isDragging = true;
        track.classList.add('dragging');
        startPos = event.touches[0].clientX;
        lastPos = startPos;
        lastTime = performance.now();
        velocity = 0;
        isPaused = true;
        if (resumeTimeout) clearTimeout(resumeTimeout);
    }

    function touchMove(event) {
        if (!isDragging) return;
        event.preventDefault();
        const currentX = event.touches[0].clientX;
        const diff = currentX - lastPos;
        const now = performance.now();
        const dt = now - lastTime;

        if (dt > 0) {
            velocity = diff / dt * 16;
        }
        currentPosition -= diff;
        lastPos = currentX;
        lastTime = now;

        track.style.transform = `translateX(${-currentPosition}px)`;
    }

    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('dragging');

        if (Math.abs(velocity) > 0.5) {
            applyInertia();
        } else {
            if (resumeTimeout) clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                isPaused = false;
                if (!animationId) animationId = requestAnimationFrame(smoothScroll);
            }, PAUSE_DURATION);
        }
    }

    function applyInertia() {
        const friction = 0.94;
        function inertiaStep() {
            if (Math.abs(velocity) < 0.1) {
                inertiaId = null;
                if (resumeTimeout) clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(() => {
                    isPaused = false;
                    if (!animationId) animationId = requestAnimationFrame(smoothScroll);
                }, PAUSE_DURATION);
                return;
            }
            currentPosition -= velocity;
            velocity *= friction;
            track.style.transform = `translateX(${-currentPosition}px)`;
            inertiaId = requestAnimationFrame(inertiaStep);
        }
        inertiaId = requestAnimationFrame(inertiaStep);
    }

    track.addEventListener('touchstart', touchStart, { passive: true });
    track.addEventListener('touchmove', touchMove, { passive: false });
    track.addEventListener('touchend', touchEnd, { passive: true });
}
