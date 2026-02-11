(function () {
    'use strict';

    const CONFIG = {
        logoPath: '/assets/logo/logo_transparente.png',
        selectors: [
            '.product-image img',
            '.product-card img',
            '.main-image img',
            '.primary-image',
            '.secondary-image',
            '.thumbnails img',
            '.thumb img',
            '.gallery-image img',
            '.lightbox-image-wrapper img',
            '.lightbox-thumbnails img',
            '.lightbox-thumb img',
            '.lightbox-content img',
            '#main-img',
            '#lightbox-image',
            '.image-lightbox img',
            '.modal-thumb img',
            '.modal-gallery img',
            '.zoom-modal img',
            '.client-card img',
            '.client-image img',
            '.testimonial-image img',
            '.carousel-slide img',
            '.swiper-slide img',
            '.slider-image img'
        ],
        watermark: {
            default: { widthPct: 0.30, xPct: 0.60, yPct: 0.70, opacity: 0.55 },
            lightbox: { widthPct: 0.25, xPct: 0.539, yPct: 0.658, opacity: 0.55 },
            thumbnail: { widthPct: 0.50, xPct: 0.50, yPct: 0.50, opacity: 0.40 }
        }
    };

    let logoCache = null;
    const protectedImagesMap = new WeakMap(); // Track protected status and overlays

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startProtection);
        } else {
            startProtection();
        }
        observeDynamicContent();
    }

    function startProtection() {
        injectProtectionCSS();
        loadLogo().then(() => {
            protectImages();
            startAntiTamperLoop();
        }).catch(err => console.error('Watermark logo load failed', err));
    }

    function loadLogo() {
        if (logoCache) return Promise.resolve(logoCache);
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                logoCache = img;
                resolve(img);
            };
            img.onerror = reject;
            img.src = CONFIG.logoPath;
        });
    }

    function getWatermarkSettings(img) {
        // Lightbox
        if (img.closest('#lightbox-wrapper') || img.closest('.lightbox-content') || img.closest('.image-lightbox')) {
            return CONFIG.watermark.lightbox;
        }
        // Thumbnails / Minis
        if (img.closest('.thumbnails') || img.closest('.thumb') || img.closest('.lightbox-thumbnails') || img.closest('.carousel-slide') || img.closest('.slider-image') || img.closest('.modal-thumb')) {
            return CONFIG.watermark.thumbnail;
        }
        // Default (Product Cards, Main Image)
        return CONFIG.watermark.default;
    }

    function generateWatermarkedBlob(sourceImg) {
        return new Promise((resolve) => {
            if (!sourceImg.complete || sourceImg.naturalWidth === 0) {
                sourceImg.onload = () => resolve(generateWatermarkedBlob(sourceImg));
                return;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const w = sourceImg.naturalWidth;
            const h = sourceImg.naturalHeight;

            canvas.width = w;
            canvas.height = h;

            // Draw original
            ctx.drawImage(sourceImg, 0, 0, w, h);

            if (logoCache) {
                const settings = getWatermarkSettings(sourceImg);

                const logoW = w * settings.widthPct;
                const aspectRatio = logoCache.naturalHeight / logoCache.naturalWidth;
                const logoH = logoW * aspectRatio;

                const cX = w * settings.xPct;
                const cY = h * settings.yPct;

                const x = cX - (logoW / 2);
                const y = cY - (logoH / 2);

                ctx.globalAlpha = settings.opacity;
                ctx.drawImage(logoCache, x, y, logoW, logoH);
            }

            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            }, 'image/jpeg', 0.9);
        });
    }

    async function protectImages() {
        const allSelectors = CONFIG.selectors.join(', ');
        const images = document.querySelectorAll(allSelectors);

        for (const img of images) {
            if (protectedImagesMap.has(img)) continue;

            // Mark as processing
            protectedImagesMap.set(img, { status: 'processing' });

            try {
                const blobUrl = await generateWatermarkedBlob(img);
                addOverlay(img, blobUrl);
            } catch (e) {
                console.error('Failed to protect image', img, e);
                protectedImagesMap.delete(img);
            }
        }
    }

    function addOverlay(img, blobUrl) {
        const container = img.closest(
            '.product-image, .product-card, .main-image, .client-card, ' +
            '.thumbnails, .thumb, .lightbox-content, .lightbox-thumbnails, ' +
            '.image-lightbox, .client-image, .testimonial-image, .carousel-slide'
        ) || img.parentElement;

        if (!container) return;

        // Check if overlay already exists in this container
        const existingOverlay = container.querySelector('.product-image-overlay');
        if (existingOverlay) {
            protectedImagesMap.set(img, { status: 'protected', overlay: existingOverlay, url: blobUrl });
            return;
        }

        const computedStyle = window.getComputedStyle(container);
        if (computedStyle.position === 'static') {
            container.style.position = 'relative';
        }

        const overlay = document.createElement('img');
        overlay.className = 'product-image-overlay';
        overlay.src = blobUrl;
        overlay.alt = img.alt || 'Protected Image';

        // Disable drag on overlay itself (so they can't just drag the watermark easily to desktop if we want to be strict,
        // BUT user wanted "save" to work. Usually drag saves. So we might want to ALLOW drag on overlay)
        // User said: "que si la guarda tambien" -> Dragging usually saves. So we allow drag.

        // Insert overlay
        if (img.nextSibling) {
            container.insertBefore(overlay, img.nextSibling);
        } else {
            container.appendChild(overlay);
        }

        protectedImagesMap.set(img, { status: 'protected', overlay: overlay, url: blobUrl });
    }

    function injectProtectionCSS() {
        if (document.getElementById('image-protection-css')) return;

        const css = `
            .product-image-overlay {
                position: absolute !important;
                inset: 0 !important;
                width: 100% !important;
                height: 100% !important;
                z-index: 50 !important;
                opacity: 0.001 !important;
                cursor: pointer !important;
                object-fit: cover !important;
                pointer-events: auto !important;
                display: block !important;
                visibility: visible !important;
            }

            /* Disable interaction on the original images */
            ${CONFIG.selectors.join(', ')} {
                -webkit-user-drag: none;
                user-drag: none;
                pointer-events: none; /* Make original unclickable so events pass to generic container or are caught by overlay if stacked right */
                /* Note: pointer-events: none on original might make it harder to detect "contextmenu" on it 
                   BUT the overlay is ON TOP. So the user clicks the OVERLAY. 
                   The original image is just a visual background now. */
            }
        `;

        const style = document.createElement('style');
        style.id = 'image-protection-css';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function observeDynamicContent() {
        const observer = new MutationObserver((mutations) => {
            let shouldReprotect = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && (node.tagName === 'IMG' || node.querySelector('img'))) {
                            shouldReprotect = true;
                        }
                    });
                }
            });
            if (shouldReprotect) {
                clearTimeout(window._protectTimeout);
                window._protectTimeout = setTimeout(protectImages, 200);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Sophisticated Hardening: Anti-Tamper Loop
    function startAntiTamperLoop() {
        setInterval(() => {
            // Check all known protected images
            // Since we can't easily iterate WeakMap, we iterate DOM selectors again or rely on the fact 
            // that we want to ensure overlays exist where they should.

            // Simpler approach: Re-scan DOM for missing overlays on eligible containers
            const inputs = document.querySelectorAll(CONFIG.selectors.join(', '));
            inputs.forEach(img => {
                // Find container
                const container = img.closest(
                    '.product-image, .product-card, .main-image, .client-card, ' +
                    '.thumbnails, .thumb, .lightbox-content, .lightbox-thumbnails, ' +
                    '.image-lightbox, .client-image, .testimonial-image, .carousel-slide'
                ) || img.parentElement;

                if (!container) return;

                const overlay = container.querySelector('.product-image-overlay');

                // 1. Check if overlay is missing
                if (!overlay) {
                    // Tamper detected! Or just not initialized.
                    // If it was supposed to be protected (we can check class or dataset), re-protect.
                    if (img.dataset.protected === 'true') {
                        // Force re-protection
                        img.dataset.protected = ''; // Clear flag
                        // Trigger protect immediately tracking this specific image
                        protectImages();
                    }
                } else {
                    // 2. Check for CSS tampering on overlay
                    const style = window.getComputedStyle(overlay);
                    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' || style.zIndex === '-1') {
                        // Reset inline styles that might be hiding it
                        overlay.style.display = 'block';
                        overlay.style.visibility = 'visible';
                        overlay.style.opacity = '0.001';
                        overlay.style.zIndex = '50';
                        overlay.style.width = '100%';
                        overlay.style.height = '100%';
                        overlay.style.inset = '0';
                        overlay.style.position = 'absolute';
                    }
                }
            });
        }, 2000); // Check every 2 seconds
    }

    init();

})();
