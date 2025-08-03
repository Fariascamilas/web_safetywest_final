/**
 * Controla el cambio entre modos claro y oscuro
 */

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.error('No se encontró el botón de cambio de tema');
        return;
    }
    
    const body = document.body;
    const darkIcon = document.querySelector('.theme-icon-dark');
    const lightIcon = document.querySelector('.theme-icon-light');
    
    // Verificar si hay una preferencia guardada
    const storedTheme = localStorage.getItem('theme');
    
    // Aplicar tema según preferencia guardada o usar oscuro por defecto
    if (storedTheme === 'light') {
        body.classList.add('light-theme');
        if (darkIcon) darkIcon.style.display = 'none';
        if (lightIcon) lightIcon.style.display = 'block';
    } else {
        if (darkIcon) darkIcon.style.display = 'block';
        if (lightIcon) lightIcon.style.display = 'none';
    }
    
    // Evento de clic para cambiar tema
    themeToggle.addEventListener('click', () => {
        // Alternar clase para cambiar tema
        body.classList.toggle('light-theme');
        
        // Actualizar visibilidad de iconos
        const isLightTheme = body.classList.contains('light-theme');
        if (darkIcon) darkIcon.style.display = isLightTheme ? 'none' : 'block';
        if (lightIcon) lightIcon.style.display = isLightTheme ? 'block' : 'none';
        
        // Guardar preferencia en localStorage
        const currentTheme = isLightTheme ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
    
    // Detectar preferencia del sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Detectar cambios en la preferencia del sistema
    prefersDarkScheme.addEventListener('change', (event) => {
        // Solo aplicar si el usuario no ha establecido una preferencia manual
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                body.classList.remove('light-theme');
                if (darkIcon) darkIcon.style.display = 'block';
                if (lightIcon) lightIcon.style.display = 'none';
            } else {
                body.classList.add('light-theme');
                if (darkIcon) darkIcon.style.display = 'none';
                if (lightIcon) lightIcon.style.display = 'block';
            }
        }
    });
}

// Inicializar cuando el DOM esté listo
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else if (typeof document !== 'undefined') {
    initThemeToggle();
}
    
    // Evento de clic para cambiar tema
    themeToggle.addEventListener('click', () => {
        // Alternar clase para cambiar tema
        body.classList.toggle('light-theme');
        
        // Actualizar visibilidad de iconos
        const isLightTheme = body.classList.contains('light-theme');
        if (darkIcon) darkIcon.style.display = isLightTheme ? 'none' : 'block';
        if (lightIcon) lightIcon.style.display = isLightTheme ? 'block' : 'none';
        
        // Guardar preferencia en localStorage
        const currentTheme = isLightTheme ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        
        // Forzar estilos en info-security
        forceInfoSecurityStyles(isLightTheme);
        
        // Forzar estilos específicos para info-security
        if (body.classList.contains('light-theme')) {
            const slides = document.querySelectorAll('.info-slide');
            const slideTitles = document.querySelectorAll('.slide-title, .slide-title-1');
            const slideInfos = document.querySelectorAll('.slide-info, .slide-info-1');
            
            slides.forEach(slide => {
                slide.style.background = 'linear-gradient(90deg, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.5) 100%)';
            });
            
            slideTitles.forEach(title => {
                title.style.color = '#ffffff';
                title.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.6)';
            });
            
            slideInfos.forEach(info => {
                info.style.color = '#f0f0f0';
                info.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.5)';
            });
        }
    });
    
    // Aplicar estilos de info-security al cargar la página
    const isLightTheme = body.classList.contains('light-theme');
    forceInfoSecurityStyles(isLightTheme);
    
    // Función para forzar estilos en info-security
    function forceInfoSecurityStyles(isLightTheme) {
        const infoSection = document.querySelector('.info-security');
        if (!infoSection) return;
        
        if (isLightTheme) {
            infoSection.style.backgroundColor = '#ffffff';
            infoSection.style.background = '#ffffff';
            
            // Aplicar a elementos hijos
            const slides = infoSection.querySelectorAll('.info-slide');
            slides.forEach(slide => {
                slide.style.background = 'transparent';
            });
            
            const contents = infoSection.querySelectorAll('.info-slide-content');
            contents.forEach(content => {
                content.style.background = 'transparent';
            });
            
            const titles = infoSection.querySelectorAll('.slide-title, .slide-title-1');
            titles.forEach(title => {
                title.style.color = '#2d1e16';
                title.style.textShadow = 'none';
            });
            
            const infos = infoSection.querySelectorAll('.slide-info, .slide-info-1');
            infos.forEach(info => {
                info.style.color = '#5a4030';
                info.style.textShadow = 'none';
            });
        } else {
            // Restaurar estilos originales
            infoSection.style.backgroundColor = '';
            infoSection.style.background = '';
            
            // Restaurar elementos hijos
            const slides = infoSection.querySelectorAll('.info-slide');
            slides.forEach(slide => {
                slide.style.background = '';
            });
            
            const contents = infoSection.querySelectorAll('.info-slide-content');
            contents.forEach(content => {
                content.style.background = '';
            });
            
            const titles = infoSection.querySelectorAll('.slide-title, .slide-title-1');
            titles.forEach(title => {
                title.style.color = '';
                title.style.textShadow = '';
            });
            
            const infos = infoSection.querySelectorAll('.slide-info, .slide-info-1');
            infos.forEach(info => {
                info.style.color = '';
                info.style.textShadow = '';
            });
        }
    }
    
    // También ejecutar al cargar la página
    forceBackgroundColors();
    
    // Detectar preferencia del sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Detectar cambios en la preferencia del sistema
    prefersDarkScheme.addEventListener('change', (event) => {
        // Solo aplicar si el usuario no ha establecido una preferencia manual
        if (!localStorage.getItem('theme')) {
            if (event.matches) {
                body.classList.remove('light-theme');
                if (darkIcon) darkIcon.style.display = 'block';
                if (lightIcon) lightIcon.style.display = 'none';
            } else {
                body.classList.add('light-theme');
                if (darkIcon) darkIcon.style.display = 'none';
                if (lightIcon) lightIcon.style.display = 'block';
            }
        }
    });


// Si el script se carga directamente
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else if (typeof document !== 'undefined') {
    initThemeToggle();
}
