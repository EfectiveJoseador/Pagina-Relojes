import Cart from './carrito.js';
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    Cart.load();

    const checkoutItemsContainer = document.getElementById('checkout-items-summary');
    const orderDetailsInput = document.getElementById('order-details');
    // Campo oculto nuevo
    const shippingInfoInput = document.getElementById('shipping-info-blob');
    const form = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('confirm-order-btn');
    const addressSection = document.querySelector('.checkout-section:nth-of-type(2)'); // Sección de dirección

    // --- Renderizado inicial ---
    renderCheckoutSummary();

    // --- Integración Firebase Auth & Direcciones ---
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("Usuario en checkout:", user.email);
            // Pre-llenar email si está vacío
            const emailInput = document.getElementById('email');
            if (emailInput && !emailInput.value) emailInput.value = user.email;

            // Buscar direcciones guardadas
            try {
                const addressesRef = ref(db, 'users/' + user.uid + '/addresses');
                const snapshot = await get(addressesRef);
                const addresses = snapshot.val();

                if (addresses) {
                    renderAddressSelector(addresses);
                }
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        }
    });

    function renderAddressSelector(addresses) {
        // Crear contenedor para seleccionar dirección
        if (!addressSection) return;

        const container = document.createElement('div');
        container.className = 'saved-addresses-container';
        container.style.marginBottom = '1.5rem';
        container.innerHTML = `<h3 style="font-size:1rem; margin-bottom:0.5rem; color:var(--text-muted)">Usar dirección guardada:</h3>`;

        const select = document.createElement('select');
        select.className = 'select-input'; // Usar estilos de input existentes si aplica o styles genéricos
        select.style.width = '100%';
        select.style.padding = '0.75rem';
        select.style.marginBottom = '1rem';
        select.style.border = '1px solid var(--border)';
        select.style.borderRadius = 'var(--radius-sm)';
        select.style.background = 'var(--bg-body)';
        select.style.color = 'var(--text-main)';

        select.innerHTML = `<option value="">-- Selecciona una dirección --</option>`;

        Object.entries(addresses).forEach(([key, addr]) => {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = `${addr.alias} - ${addr.street}`;
            select.appendChild(opt);
        });

        // Evento cambio
        select.addEventListener('change', () => {
            const key = select.value;
            if (key && addresses[key]) {
                const addr = addresses[key];
                fillAddressForm(addr);
            } else {
                // Limpiar o dejar como está? 
                // form.reset() borraría todo, solo limpiamos address fields?
                // Mejor no borrar por si el usuario estaba escribiendo
            }
        });

        container.appendChild(select);

        // Insertar antes de los campos de input
        const firstGroup = addressSection.querySelector('.form-group');
        if (firstGroup) {
            addressSection.insertBefore(container, firstGroup);
        }
    }

    function fillAddressForm(addr) {
        setVal('contact-name', addr.name);
        setVal('address', addr.street);
        setVal('city', addr.city);
        setVal('zip', addr.zip);
        setVal('province', addr.province);
        setVal('country', addr.country);
        setVal('phone', addr.phone);
    }

    function setVal(id, val) {
        const el = document.getElementById(id);
        if (el) {
            el.value = val || '';
            // Disparar evento input por si hay validaciones
            el.dispatchEvent(new Event('input'));
        }
    }


    // --- Lógica de Envío (existente + ajustes) ---
    if (!checkoutItemsContainer || !form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Regenerar string antes de enviar por si cambió algo
        // Nota: generateOrderString síncrono depende de lógica global o recalculada.
        // Simulamos la lógica para asegurar que el input oculto tenga datos.
        // Mejor: re-construir el valor. 
        // Como no tenemos productos en variable síncrona fácil, confiamos en lo que hay o 
        // lo hacemos de nuevo si es crítico. 
        // Para MVP, confiaremos en que el usuario no hackea el DOM.

        // Importante: asegurarte de que order-details tenga algo
        if (!orderDetailsInput.value) {
            orderDetailsInput.value = "Detalles del pedido no generados correctamente. Contactar soporte.";
        }

        // --- Generar bloque de dirección formateado ---
        if (shippingInfoInput) {
            const contactName = document.getElementById('contact-name').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const state = document.getElementById('province').value;
            const country = document.getElementById('country').value;
            const zip = document.getElementById('zip').value;
            const phone = document.getElementById('phone').value;

            // Formato copia-pegable para el proveedor
            const shippingBlock = `Contact Name: ${contactName}
Address Line: ${address}
City: ${city}
State: ${state}
Country: ${country}
Postal Code: ${zip}
Phone Number: ${phone}`;

            shippingInfoInput.value = shippingBlock;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Procesando pedido...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.removeItem('cart');
                window.location.href = "/pages/mensaje-enviado.html";
            } else {
                alert("Error al enviar el pedido: " + data.message);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error(error);
            alert("Hubo un problema al conectar con el servidor.");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    function renderCheckoutSummary() {
        // ... (misma lógica de antes, mantenida simplificada aquí) ...
        // Re-implementando brevemente la carga dinámica para no perder funcionalidad visual
        import('./products-data.js').then(module => {
            const products = module.default;
            checkoutItemsContainer.innerHTML = '';
            let subtotal = 0;
            let orderStr = "=== NUEVO PEDIDO ===\n\n";

            Cart.items.forEach((item, index) => {
                const product = products.find(p => p.id === item.id);
                if (!product) return;

                const qty = item.quantity || item.qty || 1;
                const price = product.price || 0;
                const itemTotal = price * qty;
                subtotal += itemTotal;

                const custom = item.customization || {};
                let detailsStr = '';
                if (custom.strap) detailsStr += `Correa: ${custom.strap}, `;
                if (custom.box && custom.box !== 'none') detailsStr += `Caja: ${custom.box}, `;

                detailsStr = detailsStr.replace(/, $/, '');

                const el = document.createElement('div');
                el.className = 'checkout-item-mini';
                el.innerHTML = `
                    <div style="flex:1">
                        <h4>${product.name} <span style="font-size:0.8em; color:var(--text-muted)">x${qty}</span></h4>
                        <p style="font-size:0.8rem; color:var(--text-muted)">${detailsStr}</p>
                    </div>
                    <span style="font-weight:600">€${itemTotal.toFixed(2)}</span>
                `;
                checkoutItemsContainer.appendChild(el);

                // Construir string para email
                orderStr += `#${index + 1} - ${product.name}\n`;
                orderStr += `   Cant: ${qty} | Precio: €${price}\n`;
                if (detailsStr) orderStr += `   ${detailsStr}\n`;
                orderStr += "--------------------------------\n";
            });

            orderStr += `\nTOTAL: €${subtotal.toFixed(2)}`;
            orderDetailsInput.value = orderStr;

            document.getElementById('checkout-subtotal').textContent = `€${subtotal.toFixed(2)}`;
            document.getElementById('checkout-total').textContent = `€${subtotal.toFixed(2)}`;
        });
    }
});
