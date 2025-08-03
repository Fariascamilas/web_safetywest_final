/**
 * Controla el slider de información de seguridad
 */

let sliderInterval = null;
let slides = [];
let currentIndex = 0;

function initInfoSlider() {
    const securitySection = document.querySelector('.info-security');
    if (!securitySection) return;

    slides = Array.from(securitySection.querySelectorAll('.info-slide'));
    if (slides.length === 0) return;

    // Añadir etiqueta de seguridad
    addSafetyLabel(securitySection);
    
    // Añadir indicadores de slide
    addSlideIndicators(securitySection);

    // Inicializa: prepara los slides con clases adecuadas
    setupSlides();
    
    // Inicia el intervalo para la rotación automática
    startSliderInterval();
    
    // Pausar al pasar el mouse
    securitySection.addEventListener('mouseenter', pauseSlider);
    securitySection.addEventListener('mouseleave', startSliderInterval);
    
    // Agregar controles de navegación
    addNavigationControls(securitySection);
    
    // Actualizar indicadores
    updateIndicators();
}

function setupSlides() {
    slides.forEach((slide, index) => {
        // Usar clases para controlar la posición en vez de style.left
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.add('next');
        }
        
        // Añadir botón CTA si no existe
        if (!slide.querySelector('.slide-cta')) {
            const cta = document.createElement('button');
            cta.className = 'slide-cta';
            cta.textContent = 'Contáctanos para prevenir';
            cta.addEventListener('click', () => {
                // Redireccionar a la sección de contacto
                document.querySelector('#contacto').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
            slide.querySelector('.info-slide-content').appendChild(cta);
        }
    });
}

function addSafetyLabel(container) {
    const label = document.createElement('div');
    label.className = 'safety-label';
    label.textContent = 'Seguridad';
    container.querySelector('.info-container').appendChild(label);
}

function addSlideIndicators(container) {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slide-indicators';
    
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'slide-indicator';
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    container.querySelector('.info-container').appendChild(indicatorsContainer);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.slide-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function startSliderInterval() {
    if (sliderInterval) clearInterval(sliderInterval);
    
    sliderInterval = setInterval(() => {
        goToNextSlide();
    }, 6000);
}

function pauseSlider() {
    if (sliderInterval) clearInterval(sliderInterval);
}

function goToNextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
}

function goToPrevSlide() {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
}

function goToSlide(index) {
    // No hacer nada si ya estamos en este slide
    if (index === currentIndex) return;
    
    const currentSlide = slides[currentIndex];
    const targetSlide = slides[index];
    const direction = index > currentIndex ? 'next' : 'prev';
    
    // Resetear clases
    slides.forEach(slide => {
        slide.classList.remove('active', 'next', 'prev');
        if (slide !== currentSlide && slide !== targetSlide) {
            slide.classList.add(index > currentIndex ? 'next' : 'prev');
        }
    });
    
    // Configurar transición
    currentSlide.classList.add(direction === 'next' ? 'prev' : 'next');
    targetSlide.classList.add('active');
    
    // Actualizar índice currentIndex
    currentIndex = index;
    
    // Actualizar indicadores
    updateIndicators();
}

function addNavigationControls(container) {
    // Crear contenedor de controles de navegación
    const navControls = document.createElement('div');
    navControls.classList.add('slider-controls');
    
    // Botón anterior - sin innerHTML para usar pseudo-elementos
    const prevButton = document.createElement('button');
    prevButton.classList.add('slider-control', 'prev-slide');
    prevButton.setAttribute('aria-label', 'Slide anterior');
    prevButton.addEventListener('click', () => {
        pauseSlider();
        goToPrevSlide();
        setTimeout(startSliderInterval, 2000);
    });
    
    // Botón siguiente - sin innerHTML para usar pseudo-elementos
    const nextButton = document.createElement('button');
    nextButton.classList.add('slider-control', 'next-slide');
    nextButton.setAttribute('aria-label', 'Slide siguiente');
    nextButton.addEventListener('click', () => {
        pauseSlider();
        goToNextSlide();
        setTimeout(startSliderInterval, 2000);
    });
    
    // Añadir a la sección
    navControls.appendChild(prevButton);
    navControls.appendChild(nextButton);
    container.querySelector('.info-container').appendChild(navControls);
}

// Si el script se carga directamente
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInfoSlider);
} else if (typeof document !== 'undefined') {
    initInfoSlider();
}