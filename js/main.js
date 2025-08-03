/**
 * Script principal que coordina todos los módulos
 * Safety West - F&F Consultores
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los módulos
    initHeaderScroll();
    initInfoSlider();
    initQuestionsAccordion();
    initContactForm();
    
    // Detectar si el navegador soporta Intersection Observer para animaciones
    if ('IntersectionObserver' in window) {
        initScrollAnimations();
    }
});

/**
 * Inicializa animaciones basadas en scroll
 */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.info-block, .empresa-block, .product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}
