import Cart from './carrito.js';
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    Cart.load();

    const checkoutItemsContainer = document.getElementById('checkout-items-summary');
    const orderDetailsInput = document.getElementById('order-details');

    const shippingInfoInput = document.getElementById('shipping-info-blob');
    const form = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('confirm-order-btn');
    const addressSection = document.querySelector('.checkout-section:nth-of-type(2)');


    renderCheckoutSummary();


    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("Usuario en checkout:", user.email);

            const emailInput = document.getElementById('email');
            if (emailInput && !emailInput.value) emailInput.value = user.email;


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

        if (!addressSection) return;

        const container = document.createElement('div');
        container.className = 'saved-addresses-container';
        container.style.marginBottom = '1.5rem';
        container.innerHTML = `<h3 style="font-size:1rem; margin-bottom:0.5rem; color:var(--text-muted)">Usar dirección guardada:</h3>`;

        const select = document.createElement('select');
        select.className = 'select-input';
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


        select.addEventListener('change', () => {
            const key = select.value;
            if (key && addresses[key]) {
                const addr = addresses[key];
                fillAddressForm(addr);
            } else {



            }
        });

        container.appendChild(select);


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

            el.dispatchEvent(new Event('input'));
        }
    }



    if (!checkoutItemsContainer || !form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();










        if (!orderDetailsInput.value) {
            orderDetailsInput.value = "Detalles del pedido no generados correctamente. Contactar soporte.";
        }


        if (shippingInfoInput) {
            const contactName = document.getElementById('contact-name').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const state = document.getElementById('province').value;
            const country = document.getElementById('country').value;
            const zip = document.getElementById('zip').value;
            const phone = document.getElementById('phone').value;


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
                window.location.href = "/pages/orden-exitosa.html";
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


        import('./products-data.js').then(module => {
            const products = module.default;
            checkoutItemsContainer.innerHTML = '';
            let subtotal = 0;
            let orderStr = "=== NUEVO PEDIDO ===\n\n";

            Cart.items.forEach((item, index) => {
                const product = products.find(p => p.id === item.id);
                if (!product) return;

                const qty = item.quantity || item.qty || 1;
                const custom = item.customization || {};
                const boxPrice = custom.boxPrice || 0;


                const unitPrice = item.price || (product.price + boxPrice);
                const itemTotal = unitPrice * qty;
                subtotal += itemTotal;

                let detailsStr = '';
                if (custom.strap) detailsStr += `Correa: ${custom.strap}, `;

                if (custom.box && custom.box !== 'none') {
                    const boxNames = {
                        'basic': 'Caja Básica',
                        'black': 'Caja Negra',
                        'brown': 'Caja Negra/Marrón',
                        'seiko': 'Caja Seiko + Tarjetas'
                    };
                    const boxName = boxNames[custom.box] || custom.box;
                    detailsStr += `Caja: ${boxName}, `;
                }

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


                orderStr += `#${index + 1} - ${product.name}\n`;
                orderStr += `   Cant: ${qty} | Precio Ud: €${unitPrice.toFixed(2)} | Total: €${itemTotal.toFixed(2)}\n`;
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
