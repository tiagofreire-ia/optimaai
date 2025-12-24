document.addEventListener("DOMContentLoaded", function () {
    // --- SAFE EVENT LISTENER HELPER ---
    const safeAddListener = (element, event, callback) => {
        if (element) {
            element.addEventListener(event, (e) => {
                try {
                    callback(e);
                } catch (error) {
                    console.error(`[Óptima] Error in ${event} handler:`, error);
                }
            });
        }
    };

    // --- INICIALIZAÇÃO ---
    try {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            lucide.createIcons();
        }
    } catch (e) {
        console.warn('[Óptima] Lucide icons not available:', e);
    }

    // --- LÓGICA DO TEMA CLARO/ESCURO ---
    const themeToggle = document.getElementById("theme-toggle"); // Floating button
    const themeToggleHeader = document.getElementById("theme-toggle-header"); // Header button
    const body = document.body;

    const updateThemeIcons = (isLight) => {
        const iconName = isLight ? 'moon' : 'sun';
        const ariaLabel = isLight ? "Alternar para modo escuro" : "Alternar para modo claro";

        // Update floating toggle
        if (themeToggle) {
            themeToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
            themeToggle.setAttribute("aria-label", ariaLabel);
        }

        // Update header toggle
        if (themeToggleHeader) {
            themeToggleHeader.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4"></i>`;
            themeToggleHeader.setAttribute("aria-label", ariaLabel);
        }

        try {
            if (window.lucide) lucide.createIcons();
        } catch (e) { /* silent */ }
    };

    const applyTheme = (theme) => {
        const isLight = theme === "light-mode";
        body.classList.toggle("light-mode", isLight);
        document.documentElement.classList.toggle("light-mode", isLight);
        updateThemeIcons(isLight);
    };

    const toggleTheme = () => {
        const newTheme = body.classList.contains("light-mode") ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    // Add click listeners to both toggles
    safeAddListener(themeToggle, "click", toggleTheme);
    safeAddListener(themeToggleHeader, "click", toggleTheme);

    const savedTheme = localStorage.getItem("theme") || "dark-mode"; // Padrão é escuro
    applyTheme(savedTheme);


    // --- LÓGICA DO MENU MOBILE ---
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const closeMobileMenu = () => {
        if (mobileMenu) mobileMenu.classList.remove("open");
    };

    const toggleMobileMenu = () => {
        if (mobileMenu) mobileMenu.classList.toggle("open");
    };

    // Toggle menu on button click
    safeAddListener(mobileMenuButton, "click", (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        safeAddListener(link, 'click', closeMobileMenu);
    });

    // Close menu when clicking outside
    safeAddListener(document, 'click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // Close menu on Escape key
    safeAddListener(document, 'keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });


    // --- TYPEWRITER EFFECT (Efeito Máquina de Escrever) ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const phrases = [
            "Estratégias personalizadas para aumentar suas vendas.",
            "Gestão de redes sociais e tráfego pago com resultados.",
            "Transformamos cliques em clientes fiéis."
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 50;      // Velocidade de digitação (ms)
        const deleteSpeed = 30;    // Velocidade de apagar (ms)
        const pauseEnd = 2000;     // Pausa no final da frase (ms)
        const pauseStart = 500;    // Pausa antes de começar nova frase (ms)

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Apagando caracteres
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeWriter, pauseStart);
                    return;
                }
            } else {
                // Digitando caracteres
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, pauseEnd);
                    return;
                }
            }

            setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
        }

        // Inicia o efeito typewriter
        typeWriter();
    }

    // --- GA4 EVENT TRACKING ---
    // Track CTA button clicks
    document.querySelectorAll('a[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (typeof trackEvent === 'function') {
                trackEvent('cta_click', {
                    event_category: 'engagement',
                    event_label: btn.textContent.trim()
                });
            }
        });
    });

    // --- LÓGICA DAS ANIMAÇÕES AO ROLAR ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".animate-on-scroll").forEach(el => scrollObserver.observe(el));


    // --- LÓGICA DO ACORDEÃO DO FAQ ---
    document.querySelectorAll(".faq-question").forEach((button) => {
        button.addEventListener("click", () => {
            const faqItem = button.closest(".faq-item");
            const wasOpen = faqItem.classList.contains('open');
            document.querySelectorAll(".faq-item.open").forEach(openItem => openItem.classList.remove("open"));
            if (!wasOpen) faqItem.classList.add("open");
        });
    });

    // --- LÓGICA DO BOTÃO "VOLTAR AO TOPO" ---
    const backToTopBtn = document.getElementById("back-to-top-btn");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            backToTopBtn.classList.toggle("show", window.scrollY > 300);
        });
        backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    // --- EFEITO PARALLAX NO HERO ---
    const heroSection = document.querySelector('.section-background');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // --- COUNTER ANIMATION ENHANCED (Números que sobem com efeitos) ---
    const counters = document.querySelectorAll('.counter');

    // Easing function - easeOutExpo for smooth deceleration
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    // Format number with thousand separators
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                const suffix = target.getAttribute('data-suffix') || '';
                const duration = 2500; // Slightly longer for more dramatic effect
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutExpo(progress);
                    const currentValue = Math.floor(finalValue * easedProgress);

                    target.textContent = formatNumber(currentValue) + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        target.textContent = formatNumber(finalValue) + suffix;
                        // Add pulse effect when complete
                        target.classList.add('counter-complete');
                        setTimeout(() => target.classList.remove('counter-complete'), 300);
                    }
                };
                requestAnimationFrame(animate);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // --- STAGGER ANIMATION (Cards aparecem em sequência) ---
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });
    document.querySelectorAll('.stagger-item').forEach(el => staggerObserver.observe(el));

    // --- TEXT REVEAL ANIMATION ---
    const textRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                textRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.text-reveal, .text-slide, .text-reveal-letter').forEach(el => {
        textRevealObserver.observe(el);
    });

    // --- COOKIE CONSENT MANAGER ---
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieModal = document.getElementById('cookie-modal');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    const cookieCustomize = document.getElementById('cookie-customize');
    const cookieModalClose = document.getElementById('cookie-modal-close');
    const cookieSavePreferences = document.getElementById('cookie-save-preferences');

    // Cookie preference checkboxes
    const cookieAnalytics = document.getElementById('cookie-analytics');
    const cookieMarketing = document.getElementById('cookie-marketing');
    const cookieFunctional = document.getElementById('cookie-functional');

    // Cookie consent object structure
    const defaultConsent = {
        essential: true, // Always true, can't be disabled
        analytics: false,
        marketing: false,
        functional: false,
        timestamp: null
    };

    // Get saved consent or use defaults
    const getSavedConsent = () => {
        const saved = localStorage.getItem('cookiePreferences');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    // Save consent preferences
    const saveConsent = (preferences) => {
        preferences.timestamp = new Date().toISOString();
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        localStorage.setItem('cookieConsent', 'customized');

        // Apply consent (enable/disable tracking scripts)
        applyConsent(preferences);

        // Dispatch custom event for other scripts to listen
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: preferences }));
    };

    // Apply consent settings (enable/disable services)
    const applyConsent = (preferences) => {
        // Google Analytics
        if (preferences.analytics) {
            window['ga-disable-G-XXXXXXXXXX'] = false; // Replace with your GA ID
            console.log('[Cookie Consent] Analytics enabled');
        } else {
            window['ga-disable-G-XXXXXXXXXX'] = true;
            console.log('[Cookie Consent] Analytics disabled');
        }

        // Marketing pixels (Meta, Google Ads)
        if (preferences.marketing) {
            window.cookieConsentMarketing = true;
            console.log('[Cookie Consent] Marketing enabled');
        } else {
            window.cookieConsentMarketing = false;
            console.log('[Cookie Consent] Marketing disabled');
        }

        // Functional cookies
        if (preferences.functional) {
            window.cookieConsentFunctional = true;
            console.log('[Cookie Consent] Functional enabled');
        } else {
            window.cookieConsentFunctional = false;
            console.log('[Cookie Consent] Functional disabled');
        }
    };

    // Load saved preferences into modal checkboxes
    const loadPreferencesToModal = () => {
        const saved = getSavedConsent();
        if (saved) {
            cookieAnalytics.checked = saved.analytics;
            cookieMarketing.checked = saved.marketing;
            cookieFunctional.checked = saved.functional;
        } else {
            // Default all to unchecked
            cookieAnalytics.checked = false;
            cookieMarketing.checked = false;
            cookieFunctional.checked = false;
        }
    };

    // Show/hide banner
    const showBanner = () => cookieBanner.classList.add('show');
    const hideBanner = () => cookieBanner.classList.remove('show');

    // Show/hide modal
    const showModal = () => {
        loadPreferencesToModal();
        cookieModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    const hideModal = () => {
        cookieModal.classList.remove('show');
        document.body.style.overflow = '';
    };

    // Check if consent exists
    const savedConsent = getSavedConsent();
    if (!savedConsent) {
        // Show banner after 1.5 seconds
        setTimeout(showBanner, 1500);
    } else {
        // Apply saved preferences
        applyConsent(savedConsent);
    }

    // Accept All
    cookieAccept.addEventListener('click', () => {
        const allAccepted = {
            essential: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        saveConsent(allAccepted);
        hideBanner();
        hideModal();
    });

    // Reject All (only essential)
    cookieReject.addEventListener('click', () => {
        const rejected = { ...defaultConsent };
        saveConsent(rejected);
        hideBanner();
        hideModal();
    });

    // Open customize modal
    cookieCustomize.addEventListener('click', () => {
        hideBanner();
        showModal();
    });

    // Close modal
    cookieModalClose.addEventListener('click', hideModal);

    // Close modal on backdrop click
    cookieModal.addEventListener('click', (e) => {
        if (e.target === cookieModal) {
            hideModal();
            // Re-show banner if no consent saved
            if (!getSavedConsent()) {
                showBanner();
            }
        }
    });

    // Save preferences
    cookieSavePreferences.addEventListener('click', () => {
        const preferences = {
            essential: true,
            analytics: cookieAnalytics.checked,
            marketing: cookieMarketing.checked,
            functional: cookieFunctional.checked
        };
        saveConsent(preferences);
        hideModal();
    });

    // Expose consent checker globally for other scripts
    window.checkCookieConsent = (type) => {
        const consent = getSavedConsent();
        if (!consent) return false;
        return consent[type] || false;
    };


    // --- FORM SUBMISSION HANDLER ---
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const formToast = document.getElementById('form-toast');
    const toastMessage = document.getElementById('toast-message');

    const showToast = (message, type = 'success') => {
        toastMessage.textContent = message;
        formToast.className = `fixed bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`;
        formToast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');

        setTimeout(() => {
            formToast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        }, 5000);
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showToast('✅ Mensagem enviada! Responderemos em breve.', 'success');
                contactForm.reset();
                // Track form conversion in GA4
                if (typeof trackEvent === 'function') {
                    trackEvent('form_submission', {
                        event_category: 'conversion',
                        event_label: 'contact_form'
                    });
                }
            } else {
                showToast('❌ Erro ao enviar. Tente novamente.', 'error');
            }
        } catch (error) {
            showToast('❌ Erro de conexão. Verifique sua internet.', 'error');
        }

        // Reset button state
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
    });
});