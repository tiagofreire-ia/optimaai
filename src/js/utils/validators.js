/**
 * Validators Module
 * Provides form validation functions
 * @module utils/validators
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validate Brazilian phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean}
 */
export const isRequired = (value) => {
    return value?.trim().length > 0;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} min - Minimum length
 * @returns {boolean}
 */
export const minLength = (value, min) => {
    return value?.length >= min;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} max - Maximum length
 * @returns {boolean}
 */
export const maxLength = (value, max) => {
    return value?.length <= max;
};
