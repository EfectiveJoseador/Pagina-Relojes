// Lógica de Autenticación y Pestañas
document.addEventListener('DOMContentLoaded', () => {

    // --- Manejo de Pestañas (Login / Registro) ---
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 1. Quitar clase active de todas las pestañas y formularios
                tabs.forEach(t => t.classList.remove('active'));
                forms.forEach(f => f.classList.remove('active'));

                // 2. Activar pestaña clickeada
                tab.classList.add('active');

                // 3. Mostrar el formulario correspondiente
                const targetId = tab.dataset.target; // "login-form" o "register-form"
                const targetForm = document.getElementById(targetId);
                if (targetForm) {
                    targetForm.classList.add('active');
                }
            });
        });
    }

    // --- Manejo de Olvidé mi Contraseña ---
    const forgotLinks = document.querySelectorAll('.forgot-password');
    const backToLoginBtn = document.getElementById('back-to-login');
    const resetForm = document.getElementById('reset-form');

    // Ir a Reset Password
    if (forgotLinks.length > 0 && resetForm) {
        forgotLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Ocultar tabs y otros forms
                document.querySelector('.auth-tabs').style.display = 'none';
                forms.forEach(f => f.classList.remove('active'));

                // Mostrar reset
                resetForm.classList.add('active');
            });
        });
    }

    // Volver a Login
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', () => {
            // Mostrar tabs
            document.querySelector('.auth-tabs').style.display = 'flex';
            resetForm.classList.remove('active');

            // Activar login por defecto
            const loginTab = document.querySelector('.auth-tab[data-target="login-form"]');
            if (loginTab) {
                loginTab.click();
            }
        });
    }

    // --- Manejo de Envíos (Simulación o Firebase Placeholder) ---
    // Aquí iría la lógica real de Firebase si estuviera configurado.
    // Por ahora, manejaremos la UI y simularemos éxito/error.

    const handleAuthSubmit = async (e, type) => {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('button[type="submit"]');
        const errorDiv = form.querySelector('.error-message');

        const originalText = btn.textContent;
        btn.textContent = 'Procesando...';
        btn.disabled = true;
        if (errorDiv) errorDiv.style.display = 'none';

        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1500));

            // TODO: Integrar aquí Firebase Auth real
            console.log(`${type} attempt`, new FormData(form));

            // Simulación básica de éxito
            if (type === 'login' || type === 'register') {
                // Redirigir a cuenta o home
                window.location.href = '/index.html'; // O perfil usuario
            } else if (type === 'reset') {
                alert('Si el correo existe, recibirás instrucciones pronto.');
                btn.textContent = 'Enlace Enviado';
            }

        } catch (error) {
            if (errorDiv) {
                errorDiv.textContent = 'Error: ' + error.message;
                errorDiv.style.display = 'block';
            }
            btn.textContent = originalText;
            btn.disabled = false;
        }
    };

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => handleAuthSubmit(e, 'login'));
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => handleAuthSubmit(e, 'register'));
    }

    const resetFormEl = document.getElementById('reset-form');
    if (resetFormEl) {
        resetFormEl.addEventListener('submit', (e) => handleAuthSubmit(e, 'reset'));
    }
});
