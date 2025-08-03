/**
 * Controla la visibilidad y efectos del encabezado al hacer scroll
 */

let lastScrollTop = 0;
let scrollTimer = null;
let scrollThreshold = 100; // Umbral para activar efectos

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // Marcar enlace activo según la sección
    highlightActiveNavItem();
    
    // Implementación con debounce para mejor rendimiento
    window.addEventListener('scroll', () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Añadir clase cuando hay scroll
            if (currentScroll > 10) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            // Definir un umbral mínimo para activar el comportamiento
            if (Math.abs(currentScroll - lastScrollTop) < 10) return;
            
            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Scroll hacia abajo y no estamos en la parte superior
                header.classList.add('header--hidden');
            } else {
                // Scroll hacia arriba o estamos cerca de la parte superior
                header.classList.remove('header--hidden');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, 10); // Pequeño retraso para mejorar rendimiento
    }, { passive: true }); // La opción passive mejora el rendimiento
    
    // Actualizar estado al cambiar de sección
    window.addEventListener('scroll', highlightActiveNavItem, { passive: true });
}

// Función para marcar el elemento activo del menú
function highlightActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Obtener la posición actual de scroll
    const scrollY = window.pageYOffset;
    
    // Iterar por cada sección para verificar si está en el viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Quitar clase activa de todos los elementos
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Añadir clase activa al elemento correspondiente
            const activeNavItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    });
}

// Si el script se carga directamente
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderScroll);
} else if (typeof document !== 'undefined') {
    initHeaderScroll();
}