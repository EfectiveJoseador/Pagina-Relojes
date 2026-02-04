import products from './products-data.js';
function applySpecialPricing() {

    products.forEach(product => {
        if (product.price && product.oldPrice) {
            product.sale = true;
            return;
        }
        if (!product.price) {
            product.price = 129.90;
            product.oldPrice = 169.90;
            product.sale = true;
        }
    });
}
applySpecialPricing();
const Cart = {
    items: [],

    init() {
        this.load();
        this.render();
        this.updateHeaderCount();
    },

    load() {
        const stored = localStorage.getItem('cart');
        if (stored) {
            this.items = JSON.parse(stored);
        } else {
            this.items = [];
        }
    },

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateHeaderCount();
    },

    add(id, qty = 1, customizations = {}) {
        const existing = this.items.find(i =>
            i.id === id &&
            JSON.stringify(i.customization) === JSON.stringify(customizations)
        );
        if (existing) {
            existing.qty += qty;
        } else {
            this.items.push({ id, qty, customization: customizations });
        }
        this.save();
        this.render();
        const product = products.find(p => p.id === id);
        if (product && window.Toast) {
            window.Toast.success(`${product.name} añadido al carrito`);
        }
        if (window.CartBadge) {
            window.CartBadge.animate();
        }
        if (product && window.Analytics) {
            window.Analytics.trackAddToCart(product, qty, customizations);
        }
    },

    remove(index) {
        const item = this.items[index];
        const product = item ? products.find(p => p.id === item.id) : null;

        if (item && window.Analytics && product) {
            window.Analytics.trackRemoveFromCart(product, item.qty || 1);
        }

        this.items.splice(index, 1);
        this.save();
        this.render();
        if (window.Toast) {
            window.Toast.info('Producto eliminado del carrito');
        }
    },

    updateQty(index, newQty) {
        if (newQty < 1) return;
        this.items[index].quantity = newQty;
        this.items[index].qty = newQty;
        this.save();
        this.render();
    },

    updateHeaderCount() {
        const count = this.items.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);
        const badge = document.getElementById('cart-count');
        if (badge) badge.textContent = count;
    },

    calculateTotal() {
        let subtotal = 0;
        let totalQty = 0;

        this.items.forEach(item => {
            const product = products.find(p => p.id === item.id);
            const qty = item.quantity || item.qty || 1;
            const itemPrice = item.price || product?.price || 129.90;
            subtotal += itemPrice * qty;
            totalQty += qty;
        });

        if (totalQty === 0) return { subtotal: 0, shipping: 0, total: 0 };


        let shipping = 0;
        const total = subtotal + shipping;

        const shippingEl = document.getElementById('shipping-price');
        if (shippingEl) {
            shippingEl.textContent = 'Gratis';
        }


        return { subtotal, shipping, total };
    },



    render() {
        const cartList = document.getElementById('cart-items-list');
        if (cartList) {
            this.renderCartPage(cartList);
        }
        const checkoutList = document.getElementById('checkout-items');
        if (checkoutList) {
            this.renderCheckoutPage(checkoutList);
        }
    },

    renderCartPage(container) {
        container.innerHTML = '';
        const emptyMsg = document.querySelector('.empty-cart-msg');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (this.items.length === 0) {
            if (emptyMsg) emptyMsg.classList.remove('hidden');
            if (checkoutBtn) checkoutBtn.classList.add('hidden');
            document.getElementById('subtotal-price').textContent = '€0.00';
            document.getElementById('total-price').textContent = '€0.00';
            document.getElementById('shipping-price').textContent = 'Gratis';

            return;
        }

        if (emptyMsg) emptyMsg.classList.add('hidden');
        if (checkoutBtn) checkoutBtn.classList.remove('hidden');

        this.items.forEach((item, index) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            const displayPrice = product.price;
            const custom = item.customization || {};
            const strap = custom.strap;
            const box = custom.box;
            const boxPrice = custom.boxPrice || 0;

            let customDetails = '';


            if (custom.size || item.size) {
                const sizeDisplay = custom.size || item.size;
                if (sizeDisplay && sizeDisplay !== 'N/A') {
                    customDetails += `<div>Tamaño: ${sizeDisplay}</div>`;
                }
            }

            if (strap) {
                customDetails += `<div>Correa: ${strap}</div>`;
            }

            if (box && box !== 'none') {
                const boxNames = {
                    'basic': 'Caja Básica',
                    'black': 'Caja Negra',
                    'brown': 'Caja Negra/Marrón',
                    'seiko': 'Caja Seiko + Tarjetas'
                };
                const boxName = boxNames[box] || box;

                customDetails += `<div>${boxName}</div>`;
            } else if (box === 'none') {


            }




            if (!customDetails && (item.size || custom.size)) {


            }

            const qty = item.quantity || item.qty || 1;

            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <a href="/pages/producto.html?id=${product.id}" class="cart-item-link">
                    <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                </a>
                <div class="cart-item-info">
                    <a href="/pages/producto.html?id=${product.id}" class="cart-item-title-link">
                        <h3 class="cart-item-title">${product.name}</h3>
                    </a>
                    <div class="cart-item-meta">
                        ${customDetails}
                    </div>
                    <div class="cart-item-price">€${(item.price || (product.price + boxPrice)).toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button class="qty-btn-minus" data-index="${index}">-</button>
                        <input type="number" value="${qty}" readonly>
                        <button class="qty-btn-plus" data-index="${index}">+</button>
                    </div>
                    <button class="btn-remove" data-index="${index}">Eliminar</button>
                </div>
            `;
            container.appendChild(el);
        });
        container.querySelectorAll('.qty-btn-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.dataset.index;
                const currentQty = this.items[index].quantity || this.items[index].qty || 1;
                this.updateQty(index, currentQty - 1);
            });
        });
        container.querySelectorAll('.qty-btn-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.dataset.index;
                const currentQty = this.items[index].quantity || this.items[index].qty || 1;
                this.updateQty(index, currentQty + 1);
            });
        });
        container.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', () => this.remove(btn.dataset.index));
        });
        const calculations = this.calculateTotal();
        document.getElementById('subtotal-price').textContent = `€${calculations.subtotal.toFixed(2)}`;
        document.getElementById('total-price').textContent = `€${calculations.total.toFixed(2)}`;
    },

    renderCheckoutPage(container) {
        container.innerHTML = '';
        this.items.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            const basePrice = product.price;
            const qty = item.quantity || item.qty || 1;
            const custom = item.customization || {};
            const size = custom.size || item.size || 'N/A';
            const version = custom.version || item.version || 'aficionado';

            const el = document.createElement('div');
            el.className = 'checkout-item-mini';
            el.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h4>${product.name} x${qty}</h4>
                    <p>
                        ${size !== 'N/A' ? `Tamaño: ${size}<br>` : ''}
                        ${custom.strap ? `Correa: ${custom.strap}` : ''}
                    </p>
                </div>
                <span>€${(basePrice * qty).toFixed(2)}</span>
            `;
            container.appendChild(el);
        });

        const calculations = this.calculateTotal();
        const subtotalEl = document.getElementById('checkout-subtotal');
        const totalEl = document.getElementById('checkout-total');
        if (subtotalEl) subtotalEl.textContent = `€${calculations.subtotal.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `€${calculations.total.toFixed(2)}`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    window.addEventListener('components:ready', () => {
        Cart.updateHeaderCount();
    });
});

export default Cart;

