import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = null;

    // --- Referencias UI ---
    const addressModal = document.getElementById('address-modal');
    const openModalBtn = document.getElementById('btn-new-address');
    const closeModalBtn = document.getElementById('close-address-modal');
    const addressForm = document.getElementById('address-form');
    const addressesList = document.querySelector('.address-list');

    // Referencias navegación y usuario
    const profileEmail = document.getElementById('profile-email');
    const logoutBtn = document.getElementById('logout-btn');
    const navItems = document.querySelectorAll('.nav-item:not(.logout)');
    const sections = document.querySelectorAll('.content-section');

    // --- Auth Listener ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user;
            if (profileEmail) profileEmail.textContent = user.email;
            loadAddresses(user.uid);
        } else {
            currentUser = null;
            window.location.href = '/pages/login.html';
        }
    });

    // --- Logout ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = '/pages/login.html';
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
            }
        });
    }

    // --- Navegación Pestañas ---
    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update UI Pestañas
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');

                // Show Content
                const targetId = item.dataset.target;
                sections.forEach(s => s.classList.remove('active'));
                const target = document.getElementById(targetId);
                if (target) target.classList.add('active');
            });
        });
    }

    // --- Modal Logic ---
    if (openModalBtn && addressModal) {
        openModalBtn.addEventListener('click', () => {
            addressModal.style.display = 'flex';
        });
    }

    if (closeModalBtn && addressModal) {
        closeModalBtn.addEventListener('click', () => {
            addressModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === addressModal) {
            addressModal.style.display = 'none';
        }
    });

    // --- Guardar Dirección ---
    if (addressForm) {
        addressForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentUser) return alert('Debes iniciar sesión');

            const btn = addressForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Guardando...';
            btn.disabled = true;

            const formData = new FormData(addressForm);
            // Generar alias automático usando la calle
            const autoAlias = formData.get('street').split(',')[0] || 'Dirección';

            const addressData = {
                name: formData.get('name'),
                alias: autoAlias, // Usamos la calle como identificador interno
                street: formData.get('street'),
                city: formData.get('city'),
                zip: formData.get('zip'),
                province: formData.get('province'),
                country: formData.get('country'),
                phone: formData.get('phone'),
                createdAt: new Date().toISOString()
            };

            try {
                // Guardar en RTDB: users/{uid}/addresses
                const addressesRef = ref(db, 'users/' + currentUser.uid + '/addresses');
                const newAddressRef = push(addressesRef);
                await set(newAddressRef, addressData);

                // Reset y cerrar
                addressForm.reset();
                addressModal.style.display = 'none';
                // alert('Dirección guardada'); 

            } catch (error) {
                console.error("Error saving address:", error);
                alert('Error al guardar: ' + error.message);
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }

    // --- Cargar Direcciones ---
    function loadAddresses(uid) {
        const addressesRef = ref(db, 'users/' + uid + '/addresses');
        onValue(addressesRef, (snapshot) => {
            addressesList.innerHTML = ''; // Limpiar lista
            const data = snapshot.val();

            if (data) {
                // Convertir objeto a array [key, value]
                Object.entries(data).forEach(([key, addr]) => {
                    const card = createAddressCard(key, addr);
                    addressesList.appendChild(card);
                });
            } else {
                addressesList.innerHTML = `
                    <div style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem;">
                        <p>No tienes direcciones guardadas.</p>
                    </div>
                `;
            }
        });
    }

    function createAddressCard(key, addr) {
        const div = document.createElement('div');
        div.className = 'address-card';
        div.innerHTML = `
            <h4 style="font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">${addr.alias} <small style="font-weight:400; color:var(--text-muted)">(${addr.name})</small></h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">
                ${addr.street}<br>
                ${addr.city}, ${addr.province} (${addr.zip})<br>
                ${addr.country}<br>
                Tlf: ${addr.phone}
            </p>
            <div style="margin-top: 1rem; display: flex; gap: 1rem; font-size: 0.85rem;">
                <button class="btn-text btn-delete-addr" data-key="${key}" style="padding: 0; color: #ef4444;">Eliminar</button>
            </div>
        `;

        // Listener eliminar
        const deleteBtn = div.querySelector('.btn-delete-addr');
        deleteBtn.addEventListener('click', () => deleteAddress(key));

        return div;
    }

    async function deleteAddress(key) {
        if (!confirm('¿Seguro que quieres eliminar esta dirección?')) return;
        if (!currentUser) return;

        try {
            const addrRef = ref(db, 'users/' + currentUser.uid + '/addresses/' + key);
            await remove(addrRef);
        } catch (error) {
            console.error(error);
            alert('Error al eliminar');
        }
    }
});
