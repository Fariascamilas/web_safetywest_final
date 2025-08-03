/**
 * Mejora la experiencia de usuario en la sección de productos
 */

function initProductsSection() {
    // Añadir botones de compra a las tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Crear botón de compra
        const buyButton = document.createElement('button');
        buyButton.className = 'product-buy-button';
        buyButton.textContent = 'Comprar';
        buyButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el click afecte a la tarjeta
            // Redireccionar a la tienda (o abrir modal, etc.)
            window.location.href = 'https://www.safety-west.com.ar/';
        });
        
        // Añadir botón a la tarjeta
        card.appendChild(buyButton);
        
        // Hacer que toda la tarjeta sea clickeable
        card.addEventListener('click', () => {
            window.location.href = 'https://www.safety-west.com.ar/';
        });
        
    });
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsSection);
} else if (typeof document !== 'undefined') {
    initProductsSection();
}
