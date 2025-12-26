/**
 * Main Entry Point
 * Initializes all application features
 * @module main
 */

import { ThemeManager } from './features/theme.js';
import { CookieConsent } from './features/cookies.js';
import { byId, $$, toggleClass } from './core/dom.js';
import { on, debounce } from './core/events.js';
import { formatPhone } from './utils/formatters.js';
import { isValidEmail, isValidPhone, isRequired } from './utils/validators.js';

/**
 * Initialize application
 */
class App {
  constructor() {
    this.init();
  }

  init() {
    // Initialize features
    this.theme = new ThemeManager();
    this.cookies = new CookieConsent();

    // Initialize UI components
    this.initMobileMenu();
    this.initTypewriter();
    this.initScrollAnimations();
    this.initCounters();
    this.initFAQ();
    this.initScrollToTop();
    this.initParallax();
    this.initForm();
    this.initPhoneMask();
    this.initCTATracking();

    // Refresh Lucide icons
    this.refreshIcons();
  }

  initMobileMenu() {
    const menuBtn = byId('mobile-menu-button');
    const menu = byId('mobile-menu');

    if (!menuBtn || !menu) return;

    const closeMenu = () => menu.classList.remove('open');

    on(menuBtn, 'click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    $$('#mobile-menu a').forEach((link) => on(link, 'click', closeMenu));
    on(document, 'click', (e) => {
      if (
        menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });
    on(document, 'keydown', (e) => e.key === 'Escape' && closeMenu());
  }

  initTypewriter() {
    const element = byId('typewriter');
    if (!element) return;

    const phrases = [
      'Estratégias personalizadas para aumentar suas vendas.',
      'Gestão de redes sociais e tráfego pago com resultados.',
      'Transformamos cliques em clientes fiéis.'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        element.textContent = currentPhrase.slice(0, --charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      } else {
        element.textContent = currentPhrase.slice(0, ++charIndex);
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
        }
      }

      const delay =
        charIndex === currentPhrase.length
          ? 2000
          : charIndex === 0
            ? 500
            : isDeleting
              ? 30
              : 50;

      setTimeout(type, delay);
    };

    type();
  }

  initScrollAnimations() {
    const observe = (selector, className, options = {}) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(className);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, ...options }
      );

      $$(selector).forEach((el) => observer.observe(el));
    };

    observe('.animate-on-scroll', 'is-visible');
    observe('.stagger-item', 'is-visible', { rootMargin: '-50px' });
    observe('.text-reveal, .text-slide, .text-reveal-letter', 'revealed', {
      threshold: 0.3
    });
  }

  initCounters() {
    const easeOutExpo = (t) => 1 - Math.pow(2, -10 * t);
    const formatNumber = (n) => n.toLocaleString('pt-BR');

    $$('.counter').forEach((counter) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          const target = +counter.dataset.target;
          const suffix = counter.dataset.suffix || '';
          const startTime = performance.now();
          const duration = 2500;

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(target * easeOutExpo(progress));

            counter.textContent = formatNumber(value) + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        },
        { threshold: 0.5 }
      );

      observer.observe(counter);
    });
  }

  initFAQ() {
    on(document, 'click', '.faq-question', (e) => {
      const faqItem = e.target.closest('.faq-item');
      const isOpen = faqItem.classList.contains('open');

      $$('.faq-item.open').forEach((item) => item.classList.remove('open'));

      if (!isOpen) {
        faqItem.classList.add('open');
      }
    });
  }

  initScrollToTop() {
    const btn = byId('back-to-top-btn');
    if (!btn) return;

    on(
      window,
      'scroll',
      debounce(() => {
        toggleClass(btn, 'show', window.scrollY > 300);
      }, 100)
    );

    on(btn, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  initParallax() {
    const hero = document.querySelector('.section-background');
    if (!hero) return;

    on(
      window,
      'scroll',
      debounce(() => {
        hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
      }, 10)
    );
  }

  initForm() {
    const form = byId('contact-form');
    if (!form) return;

    on(form, 'submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Validate
      if (
        !isRequired(data.name) ||
        !isValidEmail(data.email) ||
        !isValidPhone(data.whatsapp)
      ) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }

      // Add metadata
      data.timestamp = new Date().toISOString();
      data.page_url = window.location.href;

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Mensagem enviada com sucesso!');
          form.reset();
        } else {
          throw new Error('Erro no envio');
        }
      } catch (error) {
        alert('Erro ao enviar mensagem. Tente novamente.');
        console.error('Form submission error:', error);
      }
    });
  }

  initPhoneMask() {
    on(document, 'input', '#whatsapp', (e) => {
      e.target.value = formatPhone(e.target.value);
    });
  }

  initCTATracking() {
    $$('a[href="#contact"]').forEach((btn) => {
      on(btn, 'click', () => {
        if (typeof trackEvent === 'function') {
          trackEvent('cta_click', {
            event_category: 'engagement',
            event_label: btn.textContent.trim()
          });
        }
      });
    });
  }

  refreshIcons() {
    try {
      window.lucide?.createIcons?.({ icons: window.lucide?.icons });
    } catch (error) {
      console.warn('Lucide icons initialization failed:', error);
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
