/**
 * Maneja el formulario de contacto
 */

function initContactForm() {
    const form = document.querySelector('.contacto__form form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
    
    // Añadir validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrorOnType);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validar todos los campos antes de enviar
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField.call(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showFormMessage('Por favor, completa correctamente todos los campos', 'error');
        return;
    }
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const asunto = document.getElementById('asunto')?.value.trim() || '';
    const mensaje = document.getElementById('mensaje')?.value.trim() || '';
    
    // Generar contenido del correo
    const subject = encodeURIComponent(`Consulta: ${asunto}`);
    const body = encodeURIComponent(
        `Hola, F&F Consultores:\n\n` +
        `Mi nombre es ${nombre}, mi correo es ${email}.\n\n` +
        `Consulta: ${asunto}\n\n` +
        `Mensaje: ${mensaje}\n\n` +
        `Gracias por su atención.`
    );
    
    // Abrir cliente de correo
    window.location.href = `mailto:safetywest22@gmail.com?subject=${subject}&body=${body}`;
    
    // Opcional: mostrar mensaje de éxito y limpiar el formulario
    showFormMessage('¡Tu mensaje ha sido enviado!', 'success');
    this.reset();
}

function validateField() {
    const field = this;
    const value = field.value.trim();
    const fieldName = field.id;
    let isValid = true;
    let errorMessage = '';
    
    // Eliminar mensaje de error previo
    removeErrorMessage(field);
    
    // Validaciones según tipo de campo
    if (value === '') {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    } else if (fieldName === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Por favor, ingresa un email válido';
    } else if (fieldName === 'nombre' && value.length < 3) {
        isValid = false;
        errorMessage = 'El nombre debe tener al menos 3 caracteres';
    }
    
    // Mostrar error si no es válido
    if (!isValid) {
        showErrorMessage(field, errorMessage);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function showErrorMessage(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff3860';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff3860';
}

function removeErrorMessage(field) {
    const errorMessage = field.parentNode.querySelector('.form-error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    field.style.borderColor = '';
}

function clearErrorOnType() {
    removeErrorMessage(this);
}

function showFormMessage(message, type) {
    // Verificar si ya existe un mensaje
    let messageDiv = document.querySelector('.form-message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.style.padding = '0.75rem';
        messageDiv.style.marginTop = '1rem';
        messageDiv.style.borderRadius = '0.25rem';
        messageDiv.style.textAlign = 'center';
        
        const form = document.querySelector('.contacto__form form');
        if (form) {
            form.after(messageDiv);
        }
    }
    
    // Configurar estilo según el tipo
    if (type === 'error') {
        messageDiv.style.backgroundColor = 'rgba(255, 56, 96, 0.1)';
        messageDiv.style.color = '#ff3860';
    } else {
        messageDiv.style.backgroundColor = 'rgba(35, 209, 96, 0.1)';
        messageDiv.style.color = '#23d160';
    }
    
    messageDiv.textContent = message;
    
    // Auto-eliminar después de un tiempo
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Si el script se carga directamente
if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else if (typeof document !== 'undefined') {
    initContactForm();
}