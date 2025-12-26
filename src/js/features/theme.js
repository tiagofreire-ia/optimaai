/**
 * Theme Module
 * Manages dark/light mode with localStorage persistence
 * @module features/theme
 */

import { byId, toggleClass } from '../core/dom.js';
import { on } from '../core/events.js';
import { storage } from '../core/storage.js';

const STORAGE_KEY = 'theme';
const LIGHT_MODE_CLASS = 'light-mode';
const THEME_ICONS = {
    light: 'moon',
    dark: 'sun'
};

/**
 * Theme Manager
 */
export class ThemeManager {
    constructor(config = {}) {
        this.config = {
            toggleIds: ['theme-toggle', 'theme-toggle-header'],
            defaultTheme: 'dark',
            ...config
        };

        this.elements = {
            toggles: this.config.toggleIds.map(byId).filter(Boolean),
            body: document.body,
            html: document.documentElement
        };

        this.init();
    }

    init() {
        const savedTheme = storage.get(STORAGE_KEY, this.config.defaultTheme);
        this.setTheme(savedTheme);
        this.attachEvents();
    }

    attachEvents() {
        this.elements.toggles.forEach(toggle => {
            on(toggle, 'click', () => this.toggle());
        });
    }

    getCurrentTheme() {
        return this.elements.body.classList.contains(LIGHT_MODE_CLASS) ? 'light' : 'dark';
    }

    setTheme(theme) {
        const isLight = theme === 'light';

        // Update DOM
        [this.elements.body, this.elements.html].forEach(el => {
            toggleClass(el, LIGHT_MODE_CLASS, isLight);
        });

        // Update toggle buttons
        this.updateToggleButtons(theme);

        // Save preference
        storage.set(STORAGE_KEY, theme);

        // Reinitialize Lucide icons if available
        this.refreshIcons();
    }

    toggle() {
        const newTheme = this.getCurrentTheme() === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateToggleButtons(theme) {
        const icon = THEME_ICONS[theme];
        const label = theme === 'light' ? 'Modo escuro' : 'Modo claro';

        this.elements.toggles.forEach((toggle, index) => {
            const isHeader = index > 0;
            toggle.innerHTML = `<i data-lucide="${icon}"${isHeader ? ' class="w-4 h-4"' : ''}></i>`;
            toggle.setAttribute('aria-label', label);
        });
    }

    refreshIcons() {
        try {
            window.lucide?.createIcons?.({ icons: window.lucide?.icons });
        } catch (error) {
            console.warn('Lucide icons refresh failed:', error);
        }
    }
}
