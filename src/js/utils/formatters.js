/**
 * Form Utilities Module
 * Provides form validation and formatting utilities
 * @module utils/formatters
 */

/**
 * Format phone number with Brazilian mask
 * @param {string} value - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length > 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length > 2) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length > 0) {
    return `(${digits}`;
  }
  return '';
};

/**
 * Format number with locale
 * @param {number} value - Number to format
 * @param {string} locale - Locale string
 * @returns {string} Formatted number
 */
export const formatNumber = (value, locale = 'pt-BR') => {
  return value.toLocaleString(locale);
};

/**
 * Format currency
 * @param {number} value - Value to format
 * @param {string} currency - Currency code
 * @param {string} locale - Locale string
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, currency = 'BRL', locale = 'pt-BR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);
};

/**
 * Sanitize HTML string
 * @param {string} html - HTML string
 * @returns {string} Sanitized string
 */
export const sanitizeHTML = (html) => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};
