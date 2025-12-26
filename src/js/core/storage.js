/**
 * Storage Module
 * Provides type-safe localStorage wrapper with error handling
 * @module core/storage
 */

/**
 * Storage class with automatic JSON serialization
 */
export class Storage {
  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  /**
   * Get item from storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Stored value or default
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Storage get error for key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Set item in storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean} Success status
   */
  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Storage set error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove item from storage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error(`Storage remove error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all items with prefix
   * @returns {boolean} Success status
   */
  clear() {
    try {
      const keys = Object.keys(localStorage).filter((k) =>
        k.startsWith(this.prefix)
      );
      keys.forEach((key) => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * Check if key exists
   * @param {string} key - Storage key
   * @returns {boolean}
   */
  has(key) {
    return localStorage.getItem(this.prefix + key) !== null;
  }
}

// Default instance
export const storage = new Storage();
