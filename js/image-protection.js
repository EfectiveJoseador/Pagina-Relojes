(function () {
    'use strict';
    // Simplified Image Protection
    // Prevents context menu and dragging without complex overlays, avoiding "NotFoundError"

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyProtection);
        } else {
            applyProtection();
        }
    }

    function applyProtection() {
        // Prevent right-click on all images
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG' || e.target.closest('img')) {
                e.preventDefault();
                return false;
            }
        }, true);

        // Prevent dragging on all images
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG' || e.target.closest('img')) {
                e.preventDefault();
                return false;
            }
        }, true);

        // Optional: Disable selection on images via CSS injection
        if (!document.getElementById('image-protection-css')) {
            const style = document.createElement('style');
            style.id = 'image-protection-css';
            style.textContent = `
                img {
                    -webkit-user-drag: none;
                    -khtml-user-drag: none;
                    -moz-user-drag: none;
                    -o-user-drag: none;
                    user-drag: none;
                    user-select: none;
                    -webkit-touch-callout: none;
                }
            `;
            document.head.appendChild(style);
        }
    }

    init();

})();
