/**
 * Controla la aparición del logo flotante cuando el hero no es visible
 */

function initFloatingLogo() {
    // Crear el elemento del logo flotante
    createFloatingLogo();
    
    // Configurar el observador de intersección
    setupIntersectionObserver();
    
    // Añadir funcionalidad de scroll al logo
    setupLogoClickHandler();
}

function createFloatingLogo() {
    // Verificar si ya existe
    if (document.querySelector('.floating-logo')) return;
    
    // Crear el contenedor del logo
    const floatingLogo = document.createElement('div');
    floatingLogo.className = 'floating-logo';
    
    // Crear la imagen
    const logoImg = document.createElement('img');
    logoImg.src = './images/Safety.png';
    logoImg.alt = 'Safety West Logo';
    
    // Añadir la imagen al contenedor
    floatingLogo.appendChild(logoImg);
    
    // Añadir el logo al body
    document.body.appendChild(floatingLogo);
}

function setupIntersectionObserver() {
    // Seleccionar las secciones donde el logo no debe mostrarse
    const heroSection = document.querySelector('.hero');
    const empresaInfoSection = document.querySelector('.empresa-info');
    const footerSection = document.querySelector('footer');
    
    if (!heroSection) return;
    
    // Crear opciones para el observador
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Cuando al menos 15% de la sección es visible
    };
    
    // Estado de visibilidad de cada sección
    const sectionVisibility = {
        hero: false,
        empresa: false,
        footer: false
    };
    
    // Función para actualizar la visibilidad del logo
    const updateLogoVisibility = () => {
        const floatingLogo = document.querySelector('.floating-logo');
        if (!floatingLogo) return;
        
        // Si alguna sección está visible, ocultar el logo
        if (sectionVisibility.hero || sectionVisibility.empresa || sectionVisibility.footer) {
            floatingLogo.classList.remove('visible');
        } else {
            floatingLogo.classList.add('visible');
        }
    };
    
    // Crear observador para el hero
    const heroObserver = new IntersectionObserver((entries) => {
        // Actualizar visibilidad del hero
        entries.forEach(entry => {
            sectionVisibility.hero = entry.isIntersecting;
        });
        updateLogoVisibility();
    }, options);
    
    // Observar hero
    heroObserver.observe(heroSection);
    
    // Observar empresa-info si existe
    if (empresaInfoSection) {
        const empresaObserver = new IntersectionObserver((entries) => {
            // Actualizar visibilidad de empresa-info
            entries.forEach(entry => {
                sectionVisibility.empresa = entry.isIntersecting;
            });
            updateLogoVisibility();
        }, options);
        empresaObserver.observe(empresaInfoSection);
    }
    
    // Observar footer si existe
    if (footerSection) {
        const footerObserver = new IntersectionObserver((entries) => {
            // Actualizar visibilidad del footer
            entries.forEach(entry => {
                sectionVisibility.footer = entry.isIntersecting;
            });
            updateLogoVisibility();
        }, options);
        footerObserver.observe(footerSection);
    }
}

function setupLogoClickHandler() {
    // Seleccionar el logo flotante
    const floatingLogo = document.querySelector('.floating-logo');
    if (!floatingLogo) return;
    
    // Añadir evento de clic
    floatingLogo.addEventListener('click', () => {
        // Hacer scroll suave al inicio de la página
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingLogo);
} else if (typeof document !== 'undefined') {
    initFloatingLogo();
}
