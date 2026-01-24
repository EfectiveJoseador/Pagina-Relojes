document.addEventListener('DOMContentLoaded', () => {
    // Manejo del modal de Tipos de Cajas
    const openBtns = document.querySelectorAll('.btn-view-boxes');
    const modal = document.getElementById('boxes-modal');
    const closeBtn = document.getElementById('boxes-modal-close');
    const overlay = document.querySelector('#boxes-modal .boxes-modal-overlay');

    if (!modal) return;

    function openModal(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    if (openBtns.length > 0) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', openModal);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
