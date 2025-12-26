document.addEventListener("DOMContentLoaded", () => {
    const $ = s => document.getElementById(s), $$ = s => document.querySelectorAll(s), on = (e, v, f) => e?.addEventListener(v, f), L = () => { try { window.lucide?.createIcons?.({ icons: window.lucide?.icons }) } catch { } }, B = document.body, H = document.documentElement, T = ["theme-toggle", "theme-toggle-header"].map($);
    const theme = t => { const l = t === "light-mode";[B, H].map(e => e.classList.toggle("light-mode", l)); T.map((b, i) => b && (b.innerHTML = `<i data-lucide="${l ? "moon" : "sun"}"${i ? ' class="w-4 h-4"' : ''}></i>`, b.ariaLabel = l ? "Modo escuro" : "Modo claro")); L() };
    const flip = () => { const t = B.classList.contains("light-mode") ? "dark-mode" : "light-mode"; localStorage.theme = t; theme(t) }; T.map(b => on(b, "click", flip)); theme(localStorage.theme || "dark-mode"); L();
    const mb = $("mobile-menu-button"), mm = $("mobile-menu"), cl = () => mm?.classList.remove("open"); on(mb, "click", e => { e.stopPropagation(); mm?.classList.toggle("open") }); $$('#mobile-menu a').forEach(a => on(a, "click", cl)); on(document, "click", e => mm?.classList.contains("open") && !mm.contains(e.target) && !mb?.contains(e.target) && cl()); on(document, "keydown", e => e.key === "Escape" && cl());
    const tw = $("typewriter"); tw && ((p, i, c, d) => { const t = () => { const s = p[i]; d ? (tw.textContent = s.slice(0, --c), !c && (d = 0, i = (i + 1) % p.length)) : c < s.length ? (tw.textContent = s.slice(0, ++c)) : d = 1; setTimeout(t, c === s.length ? 2e3 : !c ? 500 : d ? 30 : 50) }; t() })(["Estratégias personalizadas para aumentar suas vendas.", "Gestão de redes sociais e tráfego pago com resultados.", "Transformamos cliques em clientes fiéis."], 0, 0, 0);
    $$('a[href="#contact"]').forEach(b => on(b, "click", () => trackEvent?.("cta_click", { event_category: "engagement", event_label: b.textContent.trim() })));
    const obs = (s, c, o) => { const O = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && (x.target.classList.add(c), O.unobserve(x.target))), o); $$(s).forEach(e => O.observe(e)) }; obs(".animate-on-scroll", "is-visible", { threshold: .1 }); obs(".stagger-item", "is-visible", { threshold: .1, rootMargin: "-50px" }); obs(".text-reveal,.text-slide,.text-reveal-letter", "revealed", { threshold: .3 });
    const E = t => 1 - 2 ** (-10 * t), F = n => n.toLocaleString("pt-BR");
    $$(".counter").forEach(e => new IntersectionObserver(([x]) => x.isIntersecting && ((t, s, S) => { (function a(n) { const p = Math.min((n - S) / 2500, 1); e.textContent = F(~~(t * E(p))) + s; p < 1 && requestAnimationFrame(a) })(S) })(+e.dataset.target, e.dataset.suffix || "", performance.now()), { threshold: .5 }).observe(e));
    // FAQ Toggle - Delegação de eventos no document
    document.addEventListener("click", e => {
        const question = e.target.closest(".faq-question");
        if (question) {
            const faqItem = question.closest(".faq-item");
            const isOpen = faqItem.classList.contains("open");
            $$(".faq-item.open").forEach(x => x.classList.remove("open"));
            if (!isOpen) faqItem.classList.add("open");
        }
    });
    const btt = $("back-to-top-btn"); btt && (on(window, "scroll", () => btt.classList.toggle("show", scrollY > 300)), on(btt, "click", () => scrollTo({ top: 0, behavior: "smooth" })));
    const hero = document.querySelector(".section-background"); hero && on(window, "scroll", () => hero.style.backgroundPositionY = scrollY * .5 + "px");
    const cb = $("cookie-banner"), cm = $("cookie-modal"), ck = { a: $("cookie-analytics"), m: $("cookie-marketing"), f: $("cookie-functional") };
    const gC = () => { try { return JSON.parse(localStorage.cookiePreferences) } catch { return null } }, sC = p => { p.timestamp = new Date().toISOString(); localStorage.cookiePreferences = JSON.stringify(p); window["ga-disable-G-11RH8STBFW"] = !p.analytics };
    const sB = () => cb?.classList.add("show"), hB = () => cb?.classList.remove("show"), sM = () => { const s = gC(); Object.keys(ck).map(k => ck[k] && (ck[k].checked = s?.[{ a: "analytics", m: "marketing", f: "functional" }[k]] || 0)); cm?.classList.add("show"); B.style.overflow = "hidden" }, hM = () => { cm?.classList.remove("show"); B.style.overflow = "" };
    gC() ? sC(gC()) : setTimeout(sB, 1500);
    on($("cookie-accept"), "click", () => { sC({ essential: 1, analytics: 1, marketing: 1, functional: 1 }); hB(); hM() });
    on($("cookie-reject"), "click", () => { sC({ essential: 1, analytics: 0, marketing: 0, functional: 0 }); hB(); hM() });
    on($("cookie-customize"), "click", () => { hB(); sM() }); on($("cookie-modal-close"), "click", hM);
    on(cm, "click", e => e.target === cm && (hM(), gC() || sB()));
    on($("cookie-save-preferences"), "click", () => { sC({ essential: 1, analytics: ck.a?.checked || 0, marketing: ck.m?.checked || 0, functional: ck.f?.checked || 0 }); hM() });
    window.checkCookieConsent = t => gC()?.[t] || 0;

    // Phone mask for WhatsApp field - Delegação de eventos
    const phoneMask = v => {
        v = v.replace(/\D/g, "").slice(0, 11);
        if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
        if (v.length > 0) return `(${v}`;
        return "";
    };
    document.addEventListener("input", e => {
        if (e.target.id === "contact-whatsapp") {
            e.target.value = phoneMask(e.target.value);
        }
    });

    const cf = $("contact-form"), sb = $("submit-btn"), bt = $("btn-text"), bl = $("btn-loading"), ft = $("form-toast"), tm = $("toast-message");
    on(cf, "submit", async e => {
        e.preventDefault();

        // Validate phone (DDD + 9 digits)
        const phoneField = $("contact-whatsapp");
        const phone = phoneField?.value.replace(/\D/g, "");
        if (phone && phone.length < 10) {
            tm.textContent = "❌ WhatsApp inválido. Use DDD + número.";
            ft.className = "fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 bg-red-600 text-white";
            ft.classList.remove("opacity-0");
            setTimeout(() => ft.classList.add("opacity-0"), 5e3);
            return;
        }

        sb.disabled = 1; bt.classList.add("hidden"); bl.classList.remove("hidden");

        try {
            const formData = new FormData(cf);
            const jsonData = Object.fromEntries(formData.entries());
            jsonData.timestamp = new Date().toISOString();
            jsonData.page_url = window.location.href;

            const r = await (await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData)
            })).json();

            if (r.success) {
                tm.textContent = "✅ Mensagem enviada!";
                ft.className = "fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 bg-green-600 text-white";
                cf.reset();
                trackEvent?.("form_submission", { event_category: "conversion" });
            } else {
                tm.textContent = "❌ Erro ao enviar.";
                ft.className = "fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 bg-red-600 text-white";
            }
        } catch {
            tm.textContent = "❌ Erro de conexão.";
            ft.className = "fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 bg-red-600 text-white";
        }

        ft.classList.remove("opacity-0");
        setTimeout(() => ft.classList.add("opacity-0"), 5e3);
        sb.disabled = 0; bt.classList.remove("hidden"); bl.classList.add("hidden");
    });
});
