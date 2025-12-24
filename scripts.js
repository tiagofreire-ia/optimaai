document.addEventListener("DOMContentLoaded", () => {
    const $ = s => document.getElementById(s), $$ = s => document.querySelectorAll(s), on = (e, ev, fn) => e && e.addEventListener(ev, fn), toggle = (e, c, f) => e && e.classList.toggle(c, f);

    // Lucide init
    try { window.lucide?.createIcons() } catch { }

    // Theme
    const body = document.body, html = document.documentElement, tt = $("theme-toggle"), tth = $("theme-toggle-header");
    const setTheme = t => { const l = t === "light-mode"; toggle(body, "light-mode", l); toggle(html, "light-mode", l);[tt, tth].forEach(b => { if (b) { b.innerHTML = `<i data-lucide="${l ? "moon" : "sun"}"${b === tth ? ' class="w-4 h-4"' : ''}></i>`; b.setAttribute("aria-label", l ? "Modo escuro" : "Modo claro") } }); try { lucide.createIcons() } catch { } };
    const flipTheme = () => { const t = body.classList.contains("light-mode") ? "dark-mode" : "light-mode"; localStorage.setItem("theme", t); setTheme(t) };
    on(tt, "click", flipTheme); on(tth, "click", flipTheme); setTheme(localStorage.getItem("theme") || "dark-mode");

    // Mobile Menu
    const mb = $("mobile-menu-button"), mm = $("mobile-menu"), closeMenu = () => mm?.classList.remove("open");
    on(mb, "click", e => { e.stopPropagation(); mm?.classList.toggle("open") });
    $$('#mobile-menu a').forEach(a => on(a, "click", closeMenu));
    on(document, "click", e => mm?.classList.contains("open") && !mm.contains(e.target) && !mb.contains(e.target) && closeMenu());
    on(document, "keydown", e => e.key === "Escape" && closeMenu());

    // Typewriter
    const tw = $("typewriter");
    if (tw) { const p = ["Estratégias personalizadas para aumentar suas vendas.", "Gestão de redes sociais e tráfego pago com resultados.", "Transformamos cliques em clientes fiéis."]; let i = 0, c = 0, d = 0; (function t() { const s = p[i]; d ? (tw.textContent = s.slice(0, --c), c === 0 && (d = 0, i = (i + 1) % p.length, setTimeout(t, 500))) : (tw.textContent = s.slice(0, ++c), c === s.length ? (d = 1, setTimeout(t, 2e3)) : setTimeout(t, 50)); if (c > 0 && c < s.length) setTimeout(t, d ? 30 : 50) })() }

    // GA4
    $$('a[href="#contact"]').forEach(b => on(b, "click", () => typeof trackEvent === "function" && trackEvent("cta_click", { event_category: "engagement", event_label: b.textContent.trim() })));

    // Observers
    const obs = (sel, cls, opt) => { const o = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add(cls); o.unobserve(x.target) } }), opt); $$(sel).forEach(e => o.observe(e)) };
    obs(".animate-on-scroll", "is-visible", { threshold: .1 });
    obs(".stagger-item", "is-visible", { threshold: .1, rootMargin: "-50px" });
    obs(".text-reveal,.text-slide,.text-reveal-letter", "revealed", { threshold: .3 });

    // Counters
    const ease = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), fmt = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const cobs = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { const t = +x.target.dataset.target, s = x.target.dataset.suffix || "", st = performance.now(); (function a(n) { const p = Math.min((n - st) / 2500, 1); x.target.textContent = fmt(Math.floor(t * ease(p))) + s; p < 1 ? requestAnimationFrame(a) : (x.target.textContent = fmt(t) + s, x.target.classList.add("counter-complete"), setTimeout(() => x.target.classList.remove("counter-complete"), 300)) })(st); cobs.unobserve(x.target) } }), { threshold: .5 });
    $$(".counter").forEach(e => cobs.observe(e));

    // FAQ
    $$(".faq-question").forEach(b => on(b, "click", () => { const f = b.closest(".faq-item"), o = f.classList.contains("open"); $$(".faq-item.open").forEach(x => x.classList.remove("open")); o || f.classList.add("open") }));

    // Back to Top
    const btt = $("back-to-top-btn");
    btt && (on(window, "scroll", () => toggle(btt, "show", scrollY > 300)), on(btt, "click", () => scrollTo({ top: 0, behavior: "smooth" })));

    // Parallax
    const hero = document.querySelector(".section-background");
    hero && on(window, "scroll", () => hero.style.backgroundPositionY = scrollY * .5 + "px");

    // Cookie Consent
    const cb = $("cookie-banner"), cm = $("cookie-modal"), ca = $("cookie-accept"), cr = $("cookie-reject"), cc = $("cookie-customize"), cmc = $("cookie-modal-close"), csp = $("cookie-save-preferences");
    const ck = { a: $("cookie-analytics"), m: $("cookie-marketing"), f: $("cookie-functional") };
    const getC = () => { try { return JSON.parse(localStorage.getItem("cookiePreferences")) } catch { return null } };
    const setC = p => { p.timestamp = new Date().toISOString(); localStorage.setItem("cookiePreferences", JSON.stringify(p)); localStorage.setItem("cookieConsent", "customized"); window["ga-disable-G-XXXXXXXXXX"] = !p.analytics; window.cookieConsentMarketing = p.marketing; window.cookieConsentFunctional = p.functional };
    const showB = () => cb?.classList.add("show"), hideB = () => cb?.classList.remove("show");
    const showM = () => { const s = getC(); if (ck.a) ck.a.checked = s?.analytics || 0; if (ck.m) ck.m.checked = s?.marketing || 0; if (ck.f) ck.f.checked = s?.functional || 0; cm?.classList.add("show"); body.style.overflow = "hidden" };
    const hideM = () => { cm?.classList.remove("show"); body.style.overflow = "" };
    const sc = getC(); sc ? setC(sc) : setTimeout(showB, 1500);
    on(ca, "click", () => { setC({ essential: 1, analytics: 1, marketing: 1, functional: 1 }); hideB(); hideM() });
    on(cr, "click", () => { setC({ essential: 1, analytics: 0, marketing: 0, functional: 0 }); hideB(); hideM() });
    on(cc, "click", () => { hideB(); showM() }); on(cmc, "click", hideM);
    on(cm, "click", e => e.target === cm && (hideM(), getC() || showB()));
    on(csp, "click", () => { setC({ essential: 1, analytics: ck.a?.checked || 0, marketing: ck.m?.checked || 0, functional: ck.f?.checked || 0 }); hideM() });
    window.checkCookieConsent = t => getC()?.[t] || !1;

    // Form
    const cf = $("contact-form"), sb = $("submit-btn"), bt = $("btn-text"), bl = $("btn-loading"), ft = $("form-toast"), tm = $("toast-message");
    const toast = (m, t) => { tm.textContent = m; ft.className = `fixed bottom-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${t === "success" ? "bg-green-600" : "bg-red-600"} text-white`; ft.classList.remove("opacity-0", "translate-y-4", "pointer-events-none"); setTimeout(() => ft.classList.add("opacity-0", "translate-y-4", "pointer-events-none"), 5e3) };
    on(cf, "submit", async e => { e.preventDefault(); sb.disabled = 1; bt.classList.add("hidden"); bl.classList.remove("hidden"); try { const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(cf) }), d = await r.json(); d.success ? (toast("✅ Mensagem enviada!", "success"), cf.reset(), typeof trackEvent === "function" && trackEvent("form_submission", { event_category: "conversion", event_label: "contact_form" })) : toast("❌ Erro ao enviar.", "error") } catch { toast("❌ Erro de conexão.", "error") } sb.disabled = 0; bt.classList.remove("hidden"); bl.classList.add("hidden") });
});