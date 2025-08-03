/**
 * Script dedicado a solucionar el problema de colores de texto
 * en info-security cuando está en modo claro
 */

(function() {
    // Function to forcefully apply correct styles
    function fixInfoSecurityStyles() {
        // Check if light theme is active
        const isLightTheme = document.body.classList.contains('light-theme');
        
        // Get the info-security section and its children
        const infoSecurity = document.querySelector('.info-security');
        if (!infoSecurity) return;
        
        // Apply direct styles for light theme
        if (isLightTheme) {
            // Set background for the section
            infoSecurity.style.cssText = `
                background-color: #ffffff !important;
                background: #ffffff !important;
            `;
            
            // Set dark background for slides to ensure text readability
            const slides = document.querySelectorAll('.info-slide');
            slides.forEach(slide => {
                slide.style.cssText = `
                    background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.5) 100%) !important;
                `;
            });
            
            // Force white text color for titles
            const titles = document.querySelectorAll('.slide-title, .slide-title-1');
            titles.forEach(title => {
                title.style.cssText = `
                    color: #ffffff !important;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6) !important;
                `;
            });
            
            // Force white text color for info text
            const infoTexts = document.querySelectorAll('.slide-info, .slide-info-1');
            infoTexts.forEach(text => {
                text.style.cssText = `
                    color: #f0f0f0 !important;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
                `;
            });
            
            // Darken background images for better contrast
            const bgImages = document.querySelectorAll('.slide-background img');
            bgImages.forEach(img => {
                img.style.cssText = `
                    filter: brightness(0.6) contrast(1.1) !important;
                `;
            });
        } else {
            // Remove inline styles in dark mode to revert to CSS
            infoSecurity.style.cssText = '';
            
            document.querySelectorAll('.info-slide').forEach(slide => {
                slide.style.cssText = '';
            });
            
            document.querySelectorAll('.slide-title, .slide-title-1').forEach(title => {
                title.style.cssText = '';
            });
            
            document.querySelectorAll('.slide-info, .slide-info-1').forEach(text => {
                text.style.cssText = '';
            });
            
            document.querySelectorAll('.slide-background img').forEach(img => {
                img.style.cssText = '';
            });
        }
    }
    
    // Run immediately and after content loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            fixInfoSecurityStyles();
            // Apply multiple times to ensure it works
            setTimeout(fixInfoSecurityStyles, 50);
            setTimeout(fixInfoSecurityStyles, 200);
            setTimeout(fixInfoSecurityStyles, 500);
        });
    } else {
        fixInfoSecurityStyles();
        setTimeout(fixInfoSecurityStyles, 50);
        setTimeout(fixInfoSecurityStyles, 200);
    }
    
    // Add a MutationObserver to detect theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class' && 
                mutation.target === document.body) {
                fixInfoSecurityStyles();
                // Apply multiple times with delays
                setTimeout(fixInfoSecurityStyles, 50);
                setTimeout(fixInfoSecurityStyles, 200);
            }
        });
    });
    
    // Start observing body for class changes
    observer.observe(document.body, { attributes: true });
    
    // Make the function available globally
    window.fixInfoSecurityStyles = fixInfoSecurityStyles;
    
    // Add event listener to theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            setTimeout(fixInfoSecurityStyles, 10);
            setTimeout(fixInfoSecurityStyles, 100);
            setTimeout(fixInfoSecurityStyles, 300);
        });
    }
})();
