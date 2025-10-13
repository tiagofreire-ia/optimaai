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
    mobileMenuButton.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add("hidden"));
    });


    // --- LÓGICA DO TEXTO ANIMADO (TYPED.JS) ---
    if (document.getElementById("typed-subtitle")){
        new Typed("#typed-subtitle", {
            strings: ["Transformamos processos complexos em operações eficientes.","Reduzimos seus custos e otimizamos seu tempo.","Conectamos tecnologia de ponta à rotina da sua empresa."],
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
});