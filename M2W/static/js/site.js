// Enhanced Auth Pages JavaScript

// Direct toggle function for password fields
function togglePassword(inputId, button) {
    console.log('Direct toggle called for:', inputId);
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');

    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
            console.log('Changed to text');
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
            console.log('Changed to password');
        }

        // Add animation
        icon.style.transform = 'scale(0.8)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 150);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive features
    initPasswordToggle();
    initRippleEffects();
    initFormAnimations();
    initFormValidation();
    initLoadingStates();

    // Trigger entrance animations
    triggerEntranceAnimations();
});

// Password Toggle Functionality
function initPasswordToggle() {
    console.log('Initializing password toggle...');

    document.querySelectorAll('.password-toggle').forEach(function (btn) {
        console.log('Found password toggle button:', btn);

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Password toggle clicked, target:', this.dataset.target);

            const targetInput = document.querySelector(this.dataset.target);
            const icon = this.querySelector('i');

            console.log('Target input:', targetInput);
            console.log('Icon:', icon);

            if (!targetInput || !icon) {
                console.log('Missing target input or icon');
                return;
            }

            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
                console.log('Changed to text input');
            } else {
                targetInput.type = 'password';
                icon.className = 'fas fa-eye';
                console.log('Changed to password input');
            }

            // Add a little animation to the icon
            icon.style.transform = 'scale(0.8)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Ripple Effect for Buttons
function initRippleEffects() {
    document.querySelectorAll('.ripple-effect').forEach(function (button) {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Form Input Animations
function initFormAnimations() {
    const inputs = document.querySelectorAll('.auth-input');

    inputs.forEach(function (input) {
        // Focus animation
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
            animateLabel(this, 'focus');
        });

        // Blur animation
        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
            if (!this.value) {
                animateLabel(this, 'blur');
            }
        });

        // Real-time validation styling
        input.addEventListener('input', function () {
            validateInputRealTime(this);
        });
    });
}

// Label Animation Helper
function animateLabel(input, type) {
    const label = input.parentElement.querySelector('.form-label');
    if (!label) return;

    if (type === 'focus') {
        label.style.transform = 'translateY(-5px) scale(0.9)';
        label.style.color = '#667eea';
    } else {
        label.style.transform = 'translateY(0) scale(1)';
        label.style.color = '#555';
    }
}

// Real-time Input Validation
function validateInputRealTime(input) {
    const isValid = input.checkValidity();
    const inputGroup = input.closest('.form-group');

    // Remove existing validation classes
    input.classList.remove('is-valid', 'is-invalid');

    if (input.value.length > 0) {
        if (isValid) {
            input.classList.add('is-valid');
            showValidationFeedback(inputGroup, 'valid');
        } else {
            input.classList.add('is-invalid');
            showValidationFeedback(inputGroup, 'invalid');
        }
    } else {
        hideValidationFeedback(inputGroup);
    }
}

// Validation Feedback
function showValidationFeedback(inputGroup, type) {
    let feedback = inputGroup.querySelector('.validation-feedback');

    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'validation-feedback';
        inputGroup.appendChild(feedback);
    }

    if (type === 'valid') {
        feedback.className = 'validation-feedback valid-feedback';
        feedback.innerHTML = '<i class="fas fa-check-circle me-1"></i>Looks good!';
    } else {
        feedback.className = 'validation-feedback invalid-feedback';
        feedback.innerHTML = '<i class="fas fa-exclamation-circle me-1"></i>Please provide a valid value.';
    }

    feedback.style.display = 'block';
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 50);
}

function hideValidationFeedback(inputGroup) {
    const feedback = inputGroup.querySelector('.validation-feedback');
    if (feedback) {
        feedback.style.opacity = '0';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 200);
    }
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('.auth-form');

    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();

                // Highlight invalid fields
                const invalidInputs = form.querySelectorAll(':invalid');
                invalidInputs.forEach(function (input) {
                    input.classList.add('is-invalid');
                    validateInputRealTime(input);
                });

                // Focus first invalid input
                if (invalidInputs.length > 0) {
                    invalidInputs[0].focus();
                }

                showFormError('Please correct the highlighted fields.');
            } else {
                showLoadingState(form);
            }

            form.classList.add('was-validated');
        });
    });
}

// Loading States
function initLoadingStates() {
    const submitButtons = document.querySelectorAll('.auth-btn[type="submit"]');

    submitButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const form = this.closest('form');
            if (form && form.checkValidity()) {
                showLoadingState(form);
            }
        });
    });
}

function showLoadingState(form) {
    const btn = form.querySelector('.auth-btn[type="submit"]');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    if (btnText && btnLoader) {
        btnText.style.opacity = '0';
        btnLoader.classList.remove('d-none');
        btn.disabled = true;

        // Re-enable after a timeout (for demo purposes)
        setTimeout(() => {
            hideLoadingState(form);
        }, 3000);
    }
}

function hideLoadingState(form) {
    const btn = form.querySelector('.auth-btn[type="submit"]');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    if (btnText && btnLoader) {
        btnText.style.opacity = '1';
        btnLoader.classList.add('d-none');
        btn.disabled = false;
    }
}

// Form Error Display
function showFormError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger form-error-message slide-down';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${message}`;

    // Insert before form
    const form = document.querySelector('.auth-form');
    if (form) {
        form.parentNode.insertBefore(errorDiv, form);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.opacity = '0';
                setTimeout(() => {
                    errorDiv.remove();
                }, 300);
            }
        }, 5000);
    }
}

// Entrance Animations
function triggerEntranceAnimations() {
    // Trigger animations with staggered delays
    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right');

    animatedElements.forEach(function (element, index) {
        element.style.animationDelay = (index * 0.2) + 's';
    });

    // Add scroll animations for mobile
    if (window.innerWidth <= 992) {
        initScrollAnimations();
    }
}

// Scroll Animations for Mobile
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe form elements on mobile
    const formElements = document.querySelectorAll('.auth-form-container');
    formElements.forEach(function (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced CSS for validation feedback
const validationCSS = `
.validation-feedback {
    font-size: 0.875rem;
    margin-top: 0.25rem;
    transition: all 0.3s ease;
}

.valid-feedback {
    color: #198754;
}

.invalid-feedback {
    color: #dc3545;
}

.auth-input.is-valid {
    border-color: #198754;
}

.auth-input.is-invalid {
    border-color: #dc3545;
}

.form-error-message {
    margin-bottom: 1rem;
    border-radius: 10px;
}
`;

// Inject validation CSS
const style = document.createElement('style');
style.textContent = validationCSS;
document.head.appendChild(style);
