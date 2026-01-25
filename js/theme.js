
(function () {
    const SW_VERSION = 'v2';
    const CLEANUP_KEY = 'sw_cleanup_' + SW_VERSION;
    if (localStorage.getItem(CLEANUP_KEY)) return;

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            registrations.forEach(function (registration) {
                registration.unregister().then(function (success) {
                    if (success) {

                    }
                });
            });
        });
        if ('caches' in window) {
            caches.keys().then(function (names) {
                names.forEach(function (name) {
                    caches.delete(name);
                });
            });
        }
        localStorage.setItem(CLEANUP_KEY, Date.now().toString());
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        }).catch(function (error) {
        });
    }
})();



window.ThemeManager = {
    init() {
        // Forzar siempre tema oscuro
        this.applyTheme('dark');

        // Eliminar botón si existe (doble seguridad)
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.style.display = 'none';
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.ThemeManager.init();
});
