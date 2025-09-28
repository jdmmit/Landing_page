/**
 * ============================================
 * SCRIPTS PARA PORTAFOLIO PERSONAL
 * ============================================
 * 
 * Funcionalidades:
 * - Smooth scrolling para navegación
 * - Animaciones de scroll para elementos
 * - Modo oscuro/claro funcional
 * - Formulario de contacto seguro
 * - Optimización de rendimiento
 * - Responsive animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    
    // Inicializar todas las funcionalidades
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initPerformanceOptimizations();
    initThemeManager();
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    
    function initSmoothScrolling() {
        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ============================================
    // ANIMACIONES DE SCROLL
    // ============================================
    
    function initScrollAnimations() {
        // Intersection Observer para animaciones de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos que deben animarse
        const animateElements = document.querySelectorAll(
            '.project-card, .social-card, .profile-image, .profile-info, .summary-card, .education-card, .skills-card, .certifications-card, .contact-info, .contact-form-container, .contact-method, .education-item, .certification-item, .info-item, .soft-skill, .skill-icon-svg'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // Efecto parallax sutil para el header
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.header');
            
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // ============================================
    // GESTIÓN DE TEMA OSCURO/CLARO
    // ============================================
    
    function initThemeManager() {
        // Cargar tema guardado o usar preferencia del sistema
        const savedTheme = localStorage.getItem('theme-preference');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        let isDark = false;
        
        // Determinar tema inicial
        if (savedTheme === 'dark') {
            isDark = true;
        } else if (savedTheme === 'light') {
            isDark = false;
        } else {
            isDark = prefersDarkScheme.matches;
        }
        
        // Aplicar tema inicial
        // Crear botón de toggle
        const themeToggle = createThemeToggle();
        document.body.prepend(themeToggle);

        // Aplicar tema inicial
        applyTheme(isDark);
        updateThemeIcon(isDark);
        
        // Event listener para toggle
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            applyTheme(isDark);
            updateThemeIcon(isDark);
            localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
        });
        
        // Event listener para preferencia del sistema
        prefersDarkScheme.addEventListener('change', (e) => {
            if (savedTheme === null) {
                isDark = e.matches;
                applyTheme(isDark);
                updateThemeIcon(isDark);
                localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
            }
        });
    }
    
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.title = 'Cambiar tema';
        // No llamar a updateThemeIcon aquí, se hará en initThemeManager con el tema correcto
        return themeToggle;
    }
    
    function applyTheme(isDark) {
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add('dark-theme');
        } else {
            htmlElement.classList.remove('dark-theme');
        }
    }
    
    function updateThemeIcon(isDark) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        }
    }
    
    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmission);
        }
        
        function handleFormSubmission(e) {
            e.preventDefault();
            
            // Rate limiting simple
            const now = Date.now();
            const lastSubmission = localStorage.getItem('last-form-submission');
            const cooldownPeriod = 60000; // 1 minuto
            
            if (lastSubmission && (now - lastSubmission) < cooldownPeriod) {
                const remainingTime = Math.ceil((cooldownPeriod - (now - lastSubmission)) / 1000);
                showFormMessage(`Espera ${remainingTime} segundos antes de enviar otro mensaje.`, 'error');
                return;
            }
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const company = document.getElementById('company').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Validar campos requeridos
            if (!name || !email || !subject || !message) {
                showFormMessage('Por favor completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Por favor ingresa un email válido.', 'error');
                return;
            }
            
            // Deshabilitar botón mientras se "envía"
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg> Enviando...';
            
            // Simular envío exitoso
            setTimeout(() => {
                // Guardar timestamp
                localStorage.setItem('last-form-submission', Date.now());
                
                // Mostrar mensaje de éxito
                showFormMessage('¡Mensaje enviado exitosamente! Me pondré en contacto contigo pronto.', 'success');
                
                // Resetear formulario
                contactForm.reset();
                
                // Rehabilitar botón
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Limpiar mensaje después de 5 segundos
                setTimeout(() => {
                    hideFormMessage();
                }, 5000);
                
            }, 2000); // Simular delay de 2 segundos
        }
        
        function showFormMessage(text, type) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Scroll al mensaje
            formMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        
        function hideFormMessage() {
            formMessage.style.display = 'none';
        }
    }
    
    // ============================================
    // OPTIMIZACIONES DE RENDIMIENTO
    // ============================================
    
    function initPerformanceOptimizations() {
        // Preload de recursos críticos
        preloadCriticalResources();
        
        function preloadCriticalResources() {
            // Preload de la fuente de Google Fonts
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
            fontLink.as = 'style';
            document.head.appendChild(fontLink);
        }
    }
    
    // ============================================
    // UTILIDADES
    // ============================================
    
    // Función para debounce
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
    
    // Funcionalidades del portafolio inicializadas
    console.log('✅ Portafolio iniciado correctamente');
});
