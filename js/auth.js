import { auth } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {

    // --- Monitor de Estado de Autenticación ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuario logueado:", user.email);
            // Si estamos en la página de login, redirigir al home o perfil
            // (Verificamos si estamos en login.html para evitar bucles en otras páginas)
            if (window.location.pathname.includes('/pages/login.html')) {
                window.location.href = '/pages/perfil.html';
            }
        } else {
            console.log("No hay usuario logueado");
        }
    });

    // --- Manejo de Pestañas (UI) ---
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                forms.forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                const targetId = tab.dataset.target;
                const targetForm = document.getElementById(targetId);
                if (targetForm) targetForm.classList.add('active');
            });
        });
    }

    // --- Links de Olvidé Contraseña ---
    const forgotLinks = document.querySelectorAll('.forgot-password');
    const backToLoginBtn = document.getElementById('back-to-login');
    const resetForm = document.getElementById('reset-form');

    if (forgotLinks.length > 0 && resetForm) {
        forgotLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.auth-tabs').style.display = 'none';
                forms.forEach(f => f.classList.remove('active'));
                resetForm.classList.add('active');
            });
        });
    }

    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', () => {
            document.querySelector('.auth-tabs').style.display = 'flex';
            resetForm.classList.remove('active');
            const loginTab = document.querySelector('.auth-tab[data-target="login-form"]');
            if (loginTab) loginTab.click();
        });
    }

    // --- Funciones de Ayuda para Errores ---
    function showError(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = traducirError(message);
            el.style.display = 'block';
        }
    }

    function clearError(elementId) {
        const el = document.getElementById(elementId);
        if (el) el.style.display = 'none';
    }

    function traducirError(code) {
        // Mapeo básico de errores de Firebase a español
        if (code.includes('auth/invalid-email')) return 'El correo electrónico no es válido.';
        if (code.includes('auth/user-disabled')) return 'Este usuario ha sido deshabilitado.';
        if (code.includes('auth/user-not-found')) return 'No existe una cuenta con este correo.';
        if (code.includes('auth/wrong-password')) return 'La contraseña es incorrecta.';
        if (code.includes('auth/email-already-in-use')) return 'Ya existe una cuenta con este correo.';
        if (code.includes('auth/weak-password')) return 'La contraseña debe tener al menos 6 caracteres.';
        if (code.includes('auth/missing-password')) return 'Por favor ingresa una contraseña.';

        // Mensaje default si no es código de firebase o es desconocido
        return code.includes('auth/') ? 'Error de autenticación: ' + code : code;
    }

    // --- Manejo de Login ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            const btn = loginForm.querySelector('button[type="submit"]');

            clearError('login-error');
            const originalText = btn.textContent;
            btn.textContent = 'Iniciando sesión...';
            btn.disabled = true;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                // La redirección la maneja onAuthStateChanged
            } catch (error) {
                console.error("Login error:", error);
                showError('login-error', error.code || error.message);
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // --- Manejo de Registro ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            const name = registerForm.querySelector('input[type="text"]').value; // Nombre, podemos guardarlo luego en el perfil
            const btn = registerForm.querySelector('button[type="submit"]');

            clearError('register-error');
            const originalText = btn.textContent;
            btn.textContent = 'Creando cuenta...';
            btn.disabled = true;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Aquí se podría actualizar el perfil del usuario con `updateProfile` para guardar el nombre
                // pero por brevedad solo logueamos.
                console.log("Usuario registrado:", userCredential.user);
                // La redirección la maneja onAuthStateChanged
            } catch (error) {
                console.error("Register error:", error);
                showError('register-error', error.code || error.message);
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // --- Manejo de Reset Password ---
    const resetFormEl = document.getElementById('reset-form');
    if (resetFormEl) {
        resetFormEl.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = resetFormEl.querySelector('input[type="email"]').value;
            const btn = resetFormEl.querySelector('button[type="submit"]');

            clearError('reset-error');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;

            try {
                await sendPasswordResetEmail(auth, email);
                alert('Correo de recuperación enviado. Revisa tu bandeja de entrada.');
                // Volver a login opcionalmente
                document.getElementById('back-to-login').click();
            } catch (error) {
                console.error("Reset error:", error);
                showError('reset-error', error.code || error.message);
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }
});
