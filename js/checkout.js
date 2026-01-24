import Cart from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carrito (cargar desde localStorage)
    Cart.load(); // Aseguramos que Cart tiene los items

    const checkoutItemsContainer = document.getElementById('checkout-items-summary');
    const orderDetailsInput = document.getElementById('order-details');
    const form = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('confirm-order-btn');

    if (!checkoutItemsContainer || !form) return;

    // 1. Renderizar resumen visual y preparar texto para el email
    renderCheckoutSummary();

    // 2. Manejar el envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Actualizar el campo oculto con los detalles más recientes antes de enviar
        const orderSummaryText = generateOrderString();
        orderDetailsInput.value = orderSummaryText;

        // Feedback visual
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
                // Éxito: vaciar carrito y redirigir
                localStorage.removeItem('cart');
                window.location.href = "/pages/mensaje-enviado.html";
            } else {
                alert("Error al enviar el pedido: " + data.message);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error(error);
            alert("Hubo un problema al conectar con el servidor. Por favor intenta de nuevo.");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    function renderCheckoutSummary() {
        checkoutItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (Cart.items.length === 0) {
            checkoutItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            if (submitBtn) submitBtn.disabled = true;
            return;
        }

        Cart.items.forEach(item => {
            // Importar productos si es necesario o asumir que ya están cacheados
            // Nota: Al usar module, products-data.js se carga en carrito.js.
            // Necesitamos acceso a los detalles del producto visual (nombre, imagen).
            // Cart.items solo guarda ID. En una app real, traeríamos la info de `products`.
            // Para simplificar y dado que carrito.js ya hace el match, intentaremos reusar lógica 
            // o hacer un fetch rápido de productos si no están expuestos.
            // Solución pragmática: Leer del carrito.js si expone productos o buscar en DOM?
            // Mejor: importar products-data directamente aquí también.
        });

        // Como Cart.items solo tiene {id, qty, customization}, necesitamos la referencia 'products'.
        // Importamos products dinamicamente para renderizar.
        import('./products-data.js').then(module => {
            const products = module.default;

            checkoutItemsContainer.innerHTML = ''; // Limpiar loading
            subtotal = 0;

            Cart.items.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (!product) return;

                const qty = item.quantity || item.qty || 1;
                const price = product.price || 0;
                const itemTotal = price * qty;
                subtotal += itemTotal;

                // Detalles personalizados
                const custom = item.customization || {};
                let detailsStr = '';
                if (custom.strap) detailsStr += `Correa: ${custom.strap}, `;
                if (custom.box && custom.box !== 'none') detailsStr += `Caja: ${custom.box}, `;
                if (custom.size) detailsStr += `Talla: ${custom.size}`;

                // Limpiar coma final
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
            });

            // Actualizar total visual
            document.getElementById('checkout-subtotal').textContent = `€${subtotal.toFixed(2)}`;
            document.getElementById('checkout-total').textContent = `€${subtotal.toFixed(2)}`; // Asumiendo envío gratis

            // Pre-llenar el input oculto
            orderDetailsInput.value = generateOrderString(products);
        });
    }

    function generateOrderString(productsList = []) {
        // Si no pasamos lista, tendríamos que importarla de nuevo, pero 
        // normalmente se llamará tras renderizar o usando la lista global si la guardamos.
        // Haremos un import síncrono simulado via promesa o dependencia? 
        // Mejor: re-importar dentro.

        // Para simplificar, asumimos que renderCheckoutSummary ya corrió o usaremos import() blocking visualmente no problem
        // Pero submit es async.

        // Estructura del string para el email
        let orderStr = "DETALLES DEL PEDIDO:\n\n";
        let total = 0;

        // Necesitamos acceso síncrono a los productos para generar el string al momento del submit
        // Truco: podemos guardar la info en una variable global al cargar la página
        return orderDetailsInput.value; // Ya debería estar poblado por render
    }

    // Mejorar: Poblar el string al cargar productos para que esté listo al enviar
    import('./products-data.js').then(module => {
        const products = module.default;

        const buildString = () => {
            let str = "=== NUEVO PEDIDO ===\n\n";
            let total = 0;

            Cart.items.forEach((item, index) => {
                const product = products.find(p => p.id === item.id);
                if (!product) return;

                const qty = item.quantity || item.qty || 1;
                const price = product.price || 0;
                const sub = price * qty;
                total += sub;

                const custom = item.customization || {};

                str += `#${index + 1} - ${product.name}\n`;
                str += `   Cantidad: ${qty}\n`;
                str += `   Precio unitario: €${price}\n`;
                if (custom.strap) str += `   Correa: ${custom.strap}\n`;
                if (custom.box) str += `   Caja: ${custom.box}\n`;
                if (custom.size) str += `   Talla: ${custom.size}\n`; // Legacy o por si acaso
                if (custom.backName) str += `   Grabado: ${custom.backName}\n`;
                str += `   Subtotal Item: €${sub.toFixed(2)}\n`;
                str += "--------------------------------\n";
            });

            str += `\nTOTAL DEL PEDIDO: €${total.toFixed(2)}\n`;
            return str;
        };

        // Actualizar el valor inicial
        orderDetailsInput.value = buildString();

        // Hookear al submit para regenerar por si acaso (aunque items no cambian en checkout page, idealmente)
        form.addEventListener('submit', () => {
            orderDetailsInput.value = buildString();
        });
    });
});
