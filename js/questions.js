/**
 * Controla el acordeón de preguntas frecuentes
 */

function initQuestionsAccordion() {
    const titleQuestions = [...document.querySelectorAll('.questions__title')];
    if (!titleQuestions.length) return;

    titleQuestions.forEach(question => {
        question.addEventListener('click', toggleQuestion);
    });
    
    // Opcional: abrir la primera pregunta por defecto
    // if (titleQuestions.length > 0) {
    //     setTimeout(() => toggleQuestion.call(titleQuestions[0]), 500);
    // }
}

function toggleQuestion() {
    const answer = this.nextElementSibling;
    const container = this.parentElement.parentElement;
    const arrow = this.querySelector('.questions__arrow');
    
    // Opcionalmente cerrar otras preguntas abiertas
    const allQuestions = document.querySelectorAll('.questions__padding');
    allQuestions.forEach(item => {
        if (item !== container && item.classList.contains('questions__padding--add')) {
            const itemTitle = item.querySelector('.questions__title');
            const itemAnswer = itemTitle.nextElementSibling;
            const itemArrow = itemTitle.querySelector('.questions__arrow');
            
            item.classList.remove('questions__padding--add');
            itemArrow.classList.remove('questions__arrow--rotate');
            itemAnswer.style.height = '0px';
        }
    });
    
    // Alternar estado actual
    container.classList.toggle('questions__padding--add');
    arrow.classList.toggle('questions__arrow--rotate');
    
    // Calcular altura con margen extra para mejor visualización
    if (answer.style.height === '0px' || !answer.style.height) {
        // Ajustar temporalmente estilos para un cálculo preciso
        answer.style.height = 'auto';
        answer.style.opacity = '0';
        answer.style.position = 'absolute';
        answer.style.visibility = 'hidden';
        answer.style.display = 'block';
        
        // Obtener altura real
        const realHeight = answer.scrollHeight;
        
        // Restaurar estilos originales
        answer.style.height = '0px';
        answer.style.opacity = '';
        answer.style.position = '';
        answer.style.visibility = '';
        answer.style.display = '';
        
        // Establecer nueva altura con margen extra
        // Más margen para dispositivos pequeños
        const extraPadding = window.innerWidth < 576 ? 40 : 30;
        
        // Aplicar después de un pequeño retraso para permitir la transición
        setTimeout(() => {
            answer.style.height = `${realHeight + extraPadding}px`;
        }, 10);
    } else {
        answer.style.height = '0px';
    }
}

// Si el script se carga directamente
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuestionsAccordion);
} else if (typeof document !== 'undefined') {
    initQuestionsAccordion();
}