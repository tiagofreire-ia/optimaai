/**
 * Cookie Consent Module
 * Manages LGPD cookie consent with Google Analytics integration
 * @module features/cookies
 */

import { byId } from '../core/dom.js';
import { on } from '../core/events.js';
import { storage } from '../core/storage.js';

const STORAGE_KEY = 'cookiePreferences';
const GA_ID = 'G-11RH8STBFW';

/**
 * Cookie Consent Manager
 */
export class CookieConsent {
  constructor(config = {}) {
    this.config = {
      delay: 1500,
      ...config
    };

    this.elements = {
      banner: byId('cookie-banner'),
      modal: byId('cookie-modal'),
      acceptBtn: byId('cookie-accept'),
      rejectBtn: byId('cookie-reject'),
      customizeBtn: byId('cookie-customize'),
      saveBtn: byId('cookie-save-preferences'),
      closeBtn: byId('cookie-modal-close'),
      checkboxes: {
        analytics: byId('cookie-analytics'),
        marketing: byId('cookie-marketing'),
        functional: byId('cookie-functional')
      }
    };

    this.init();
  }

  init() {
    const preferences = this.getPreferences();

    if (preferences) {
      this.applyPreferences(preferences);
    } else {
      setTimeout(() => this.showBanner(), this.config.delay);
    }

    this.attachEvents();
  }

  attachEvents() {
    const { acceptBtn, rejectBtn, customizeBtn, saveBtn, closeBtn, modal } =
      this.elements;

    on(acceptBtn, 'click', () => this.acceptAll());
    on(rejectBtn, 'click', () => this.rejectAll());
    on(customizeBtn, 'click', () => this.openModal());
    on(saveBtn, 'click', () => this.savePreferences());
    on(closeBtn, 'click', () => this.closeModal());
    on(modal, 'click', (e) => {
      if (e.target === modal) {
        this.closeModal();
        if (!this.getPreferences()) this.showBanner();
      }
    });
  }

  getPreferences() {
    return storage.get(STORAGE_KEY);
  }

  savePreferencesData(preferences) {
    const data = {
      ...preferences,
      timestamp: new Date().toISOString()
    };

    storage.set(STORAGE_KEY, data);
    this.applyPreferences(data);
  }

  applyPreferences(preferences) {
    // Disable Google Analytics if not consented
    window[`ga-disable-${GA_ID}`] = !preferences.analytics;
  }

  acceptAll() {
    this.savePreferencesData({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    });
    this.hideBanner();
    this.closeModal();
  }

  rejectAll() {
    this.savePreferencesData({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    });
    this.hideBanner();
    this.closeModal();
  }

  savePreferences() {
    const { checkboxes } = this.elements;
    this.savePreferencesData({
      essential: true,
      analytics: checkboxes.analytics?.checked || false,
      marketing: checkboxes.marketing?.checked || false,
      functional: checkboxes.functional?.checked || false
    });
    this.closeModal();
  }

  openModal() {
    const preferences = this.getPreferences();
    const { checkboxes, modal } = this.elements;

    // Set checkbox states
    if (preferences) {
      if (checkboxes.analytics)
        checkboxes.analytics.checked = preferences.analytics;
      if (checkboxes.marketing)
        checkboxes.marketing.checked = preferences.marketing;
      if (checkboxes.functional)
        checkboxes.functional.checked = preferences.functional;
    }

    modal?.classList.add('show');
    document.body.style.overflow = 'hidden';
    this.hideBanner();
  }

  closeModal() {
    this.elements.modal?.classList.remove('show');
    document.body.style.overflow = '';
  }

  showBanner() {
    this.elements.banner?.classList.add('show');
  }

  hideBanner() {
    this.elements.banner?.classList.remove('show');
  }

  /**
   * Check if specific cookie type is consented
   * @param {string} type - Cookie type (analytics, marketing, functional)
   * @returns {boolean}
   */
  static checkConsent(type) {
    const preferences = storage.get(STORAGE_KEY);
    return preferences?.[type] || false;
  }
}

// Export helper function
export const checkCookieConsent = CookieConsent.checkConsent;
