import products from './products-data.js';

const FEATURED_CONFIG = {
    PRODUCT_COUNT: 6,
    ROTATION_DAYS: 7
};
const LABEL_TYPES = {
    NUEVO: { text: 'NUEVO', class: 'badge-nuevo', color: '#10b981' },
    TENDENCIA: { text: 'TENDENCIA', class: 'badge-trending', color: '#8b5cf6' },
    POPULAR: { text: 'POPULAR', class: 'badge-popular', color: '#f59e0b' },
    TOP_PICKS: { text: 'TOP PICKS', class: 'badge-top', color: '#3b82f6' }
};
const CURRENT_SEASON = '25/26';

function getProductLabel(product, index) {
    const name = product.name || '';
    const isRetro = product.retro || product.league === 'retro' || name.toLowerCase().includes('retro');
    const isCurrentSeason = name.includes(CURRENT_SEASON) || name.includes('24/25');
    if (isRetro) {
        const retroLabels = [LABEL_TYPES.TENDENCIA, LABEL_TYPES.POPULAR, LABEL_TYPES.TOP_PICKS];
        return retroLabels[index % retroLabels.length];
    }
    if (isCurrentSeason && product.new !== false) {
        return LABEL_TYPES.NUEVO;
    }
    const labels = [LABEL_TYPES.TENDENCIA, LABEL_TYPES.POPULAR, LABEL_TYPES.TOP_PICKS];
    return labels[index % labels.length];
}
function detectLowPerformance() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
    }
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        return true;
    }
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        return true;
    }
    if ('ontouchstart' in window && window.innerWidth < 768) {
        return true;
    }
    return false;
}
document.addEventListener('DOMContentLoaded', () => {
    if (detectLowPerformance()) {
        document.body.classList.add('low-performance');
    }
    if (sessionStorage.getItem('homeAnimationSeen')) {
        document.body.classList.add('animation-seen');
    } else {
        setTimeout(() => {
            sessionStorage.setItem('homeAnimationSeen', 'true');
        }, 3500);
    }

    initHome();
});

async function initHome() {
    applySpecialPricing();
    initCatalogoCarousel();
    initCatalogoCards();

}


function initCatalogoCarousel() {
    const carousel = document.getElementById('catalogo-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const prevBtn = document.getElementById('catalogo-prev');
    const nextBtn = document.getElementById('catalogo-next');
    const carouselContainer = carousel.querySelector('.carousel-container');

    if (!track || !prevBtn || !nextBtn) return;


    const CAROUSEL_PRODUCT_COUNT = 8;
    const shuffledProducts = [...products].sort(() => Math.random() - 0.5).slice(0, CAROUSEL_PRODUCT_COUNT);

    track.innerHTML = shuffledProducts.map(product => {
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
                    <span class="product-category">${product.category || 'Reloj de lujo'}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="price-old">€${product.oldPrice?.toFixed(2) || '25.00'}</span>
                        <span class="price">€${product.price?.toFixed(2) || '19.90'}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    const originalCards = Array.from(track.querySelectorAll('.product-card'));
    if (originalCards.length === 0) return;

    const cardWidth = 280 + 24;
    const totalCards = originalCards.length;




    originalCards.forEach(card => {
        const cloneEnd = card.cloneNode(true);
        cloneEnd.classList.add('carousel-clone');

        const img = cloneEnd.querySelector('img');
        if (img) img.loading = 'eager';
        track.appendChild(cloneEnd);
    });


    [...originalCards].reverse().forEach(card => {
        const cloneStart = card.cloneNode(true);
        cloneStart.classList.add('carousel-clone');

        const img = cloneStart.querySelector('img');
        if (img) img.loading = 'eager';
        track.insertBefore(cloneStart, track.firstChild);
    });

    let currentPosition = totalCards * cardWidth;
    let isJumping = false;
    let animationId = null;
    let isPaused = false;

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
            void track.offsetHeight;
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


    setPosition(currentPosition, false);
    track.offsetHeight;


    startAutoScroll();


    let isDragging = false;
    let startPos = 0;
    let lastPos = 0;
    let lastTime = 0;
    let velocity = 0;
    let inertiaId = null;


    track.style.touchAction = 'pan-y';
    track.style.userSelect = 'none';
    track.style.webkitUserSelect = 'none';

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


        track.style.transform = `translate3d(${-currentPosition}px, 0, 0)`;


        if (currentPosition >= totalCards * 2 * cardWidth) {
            currentPosition -= totalCards * cardWidth;
            track.style.transform = `translate3d(${-currentPosition}px, 0, 0)`;
        } else if (currentPosition < totalCards * cardWidth) {
            currentPosition += totalCards * cardWidth;
            track.style.transform = `translate3d(${-currentPosition}px, 0, 0)`;
        }
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
                if (!animationId) {
                    animationId = requestAnimationFrame(smoothScroll);
                }
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
                    if (!animationId) {
                        animationId = requestAnimationFrame(smoothScroll);
                    }
                }, PAUSE_DURATION);
                return;
            }

            currentPosition -= velocity;
            velocity *= friction;


            if (currentPosition >= totalCards * 2 * cardWidth) {
                currentPosition -= totalCards * cardWidth;
            } else if (currentPosition < totalCards * cardWidth) {
                currentPosition += totalCards * cardWidth;
            }

            track.style.transform = `translate3d(${-currentPosition}px, 0, 0)`;

            inertiaId = requestAnimationFrame(inertiaStep);
        }

        inertiaId = requestAnimationFrame(inertiaStep);
    }

    track.addEventListener('touchstart', touchStart, { passive: true });
    track.addEventListener('touchmove', touchMove, { passive: false });
    track.addEventListener('touchend', touchEnd, { passive: true });


    const addScrolledClass = () => {
        carouselContainer.classList.add('scrolled');
        carousel.classList.add('scrolled');
    };

    track.addEventListener('touchstart', addScrolledClass, { once: true, passive: true });
    carouselContainer.addEventListener('scroll', addScrolledClass, { once: true });

    if (carouselContainer) {
        carouselContainer.addEventListener('scroll', () => {
            handleUserInteraction();
        }, { passive: true });
    }

}
let catalogoCardsInitialized = false;

function initCatalogoCards() {
    if (catalogoCardsInitialized) return;
    catalogoCardsInitialized = true;


    document.querySelectorAll('.catalogo-card.has-dropdown').forEach(card => {
        let closeTimeout;

        card.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => {
                card.classList.remove('dropdown-open');
            }, 150);
        });

        card.addEventListener('mouseenter', () => {
            if (closeTimeout) clearTimeout(closeTimeout);
        });
    });

    document.addEventListener('click', (e) => {
        const dropdownBtn = e.target.closest('.dropdown-btn');
        if (dropdownBtn) {
            e.stopPropagation();
            e.preventDefault();
            const card = dropdownBtn.closest('.catalogo-card');
            document.querySelectorAll('.catalogo-card.dropdown-open').forEach(openCard => {
                if (openCard !== card) openCard.classList.remove('dropdown-open');
            });
            card.classList.toggle('dropdown-open');
            return;
        }
        const dropdownLink = e.target.closest('.dropdown-menu a');
        if (dropdownLink) {
            e.stopPropagation();
            return;
        }
        const catalogoBtn = e.target.closest('.catalogo-btn:not(.dropdown-btn)');
        if (catalogoBtn) {
            e.stopPropagation();
            return;
        }
        const clickableCard = e.target.closest('.catalogo-card-clickable');
        if (clickableCard) {
            if (e.target.closest('.dropdown-menu') || e.target.closest('.dropdown-btn') || e.target.closest('.catalogo-btn')) {
                return;
            }

            const link = clickableCard.dataset.link;
            if (link) window.location.href = link;
            return;
        }
        if (!e.target.closest('.catalogo-card')) {
            document.querySelectorAll('.catalogo-card.dropdown-open').forEach(card => {
                card.classList.remove('dropdown-open');
            });
        }
    });
}
function applySpecialPricing() {

    products.forEach(product => {
        if (product.price && product.oldPrice) {
            product.sale = true;
            return;
        }
        if (!product.price) {
            product.price = 139.90;
            product.oldPrice = 169.90;
            product.sale = true;
        }
    });
}

function getMiniImagePath(imagePath) {
    return imagePath.replace(/\/(\d+)\.(webp|jpg|png|jpeg)$/i, '/$1_mini.$2');
}


function getSecondaryMiniImage(product) {
    if (product.images && product.images.length > 0) {
        return getMiniImagePath(product.images[0]);
    }
    return null;
}

async function renderBestSellers() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    grid.innerHTML = '<div class="loading-placeholder" style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Cargando productos...</div>';

    try {
        const bestSellerIds = await getGlobalFeaturedProducts();
        const bestSellers = bestSellerIds.map(id => products.find(p => p.id === id)).filter(Boolean);

        if (bestSellers.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No hay productos destacados disponibles.</p>';
            return;
        }

        grid.innerHTML = bestSellers.map((product, index) => {
            const secondaryImg = getSecondaryMiniImage(product);
            return `
            <article class="product-card">
                <div class="product-image">
                    <a href="/pages/producto.html?id=${product.id}">
                        <img src="${getMiniImagePath(product.image)}" alt="${product.name}" class="primary-image" loading="lazy">
                        ${secondaryImg ? `<img src="${secondaryImg}" alt="${product.name} - Vista 2" class="secondary-image" loading="lazy">` : ''}
                    </a>
                    <button class="btn-quick-view"><i class="fas fa-eye"></i></button>
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
        `}).join('');

    } catch (error) {
        console.error('Error loading featured products:', error);
        const fallbackProducts = products.slice(0, FEATURED_CONFIG.PRODUCT_COUNT);
        grid.innerHTML = fallbackProducts.map((product, index) => {
            const secondaryImg = getSecondaryMiniImage(product);
            return `
            <article class="product-card">
                <div class="product-image">
                    <a href="/pages/producto.html?id=${product.id}">
                        <img src="${getMiniImagePath(product.image)}" alt="${product.name}" class="primary-image" loading="lazy">
                        ${secondaryImg ? `<img src="${secondaryImg}" alt="${product.name} - Vista 2" class="secondary-image" loading="lazy">` : ''}
                    </a>
                    <button class="btn-quick-view"><i class="fas fa-eye"></i></button>
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
        `}).join('');
    }
}
async function getGlobalFeaturedProducts() {

    const sessionCached = sessionStorage.getItem('featuredProductsSession');
    if (sessionCached) {
        try {
            const cached = JSON.parse(sessionCached);
            if (cached.products && cached.products.length === FEATURED_CONFIG.PRODUCT_COUNT) {
                return cached.products;
            }
        } catch (e) { }
    }

    const randomProducts = getRandomFeaturedProducts();
    saveToSessionStorage(randomProducts);
    return randomProducts;
}

function saveToSessionStorage(productIds) {
    try {
        sessionStorage.setItem('featuredProductsSession', JSON.stringify({
            products: productIds,
            timestamp: Date.now()
        }));
    } catch (e) { }
}

function getRandomFeaturedProducts() {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, FEATURED_CONFIG.PRODUCT_COUNT).map(p => p.id);
}
