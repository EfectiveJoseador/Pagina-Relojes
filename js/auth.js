import { auth } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {


    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Usuario logueado:", user.email);


            if (window.location.pathname.includes('/pages/login.html')) {
                window.location.href = '/pages/perfil.html';
            }
        } else {
            console.log("No hay usuario logueado");
        }
    });


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

        if (code.includes('auth/invalid-email')) return 'El correo electrónico no es válido.';
        if (code.includes('auth/user-disabled')) return 'Este usuario ha sido deshabilitado.';
        if (code.includes('auth/user-not-found')) return 'No existe una cuenta con este correo.';
        if (code.includes('auth/wrong-password')) return 'La contraseña es incorrecta.';
        if (code.includes('auth/email-already-in-use')) return 'Ya existe una cuenta con este correo.';
        if (code.includes('auth/weak-password')) return 'La contraseña debe tener al menos 6 caracteres.';
        if (code.includes('auth/missing-password')) return 'Por favor ingresa una contraseña.';


        return code.includes('auth/') ? 'Error de autenticación: ' + code : code;
    }


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

            } catch (error) {
                console.error("Login error:", error);
                showError('login-error', error.code || error.message);
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }


    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            const name = registerForm.querySelector('input[type="text"]').value;
            const btn = registerForm.querySelector('button[type="submit"]');

            clearError('register-error');
            const originalText = btn.textContent;
            btn.textContent = 'Creando cuenta...';
            btn.disabled = true;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);


                console.log("Usuario registrado:", userCredential.user);

            } catch (error) {
                console.error("Register error:", error);
                showError('register-error', error.code || error.message);
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }


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
