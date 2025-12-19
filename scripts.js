document.addEventListener("DOMContentLoaded", function () {
    // --- INICIALIZAÇÃO ---
    lucide.createIcons();

    // --- LÓGICA DO TEMA CLARO/ESCURO ---
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    const applyTheme = (theme) => {
        body.classList.toggle("light-mode", theme === "light-mode");
        const isLight = theme === "light-mode";
        themeToggle.innerHTML = isLight ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
        themeToggle.setAttribute("aria-label", isLight ? "Alternar para modo escuro" : "Alternar para modo claro");
        lucide.createIcons(); // Recria o ícone após a troca
    };

    themeToggle.addEventListener("click", () => {
        const newTheme = body.classList.contains("light-mode") ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem("theme") || "dark-mode"; // Padrão é escuro
    applyTheme(savedTheme);


    // --- LÓGICA DO MENU MOBILE ---
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", () => mobileMenu.classList.toggle("open"));

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove("open"));
    });


    // --- LÓGICA DO TEXTO ANIMADO (TYPED.JS) ---
    if (document.getElementById("typed-subtitle")) {
        new Typed("#typed-subtitle", {
            strings: ["Estratégias personalizadas para aumentar suas vendas.", "Gestão de redes sociais e tráfego pago com resultados.", "Transformamos cliques em clientes fiéis."],
            typeSpeed: 50, backSpeed: 25, backDelay: 2000, loop: true,
        });
    }

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

    // --- COUNTER ANIMATION (Números que sobem) ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    target.textContent = Math.floor(finalValue * easeOut);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        target.textContent = finalValue;
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

    // --- COOKIE BANNER LGPD ---
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');

    // Verificar se já deu consentimento
    if (!localStorage.getItem('cookieConsent')) {
        // Mostrar banner após 1.5 segundos
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1500);
    }

    const hideCookieBanner = (consent) => {
        localStorage.setItem('cookieConsent', consent);
        cookieBanner.classList.remove('show');
    };

    cookieAccept.addEventListener('click', () => hideCookieBanner('accepted'));
    cookieReject.addEventListener('click', () => hideCookieBanner('rejected'));
});