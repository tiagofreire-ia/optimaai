/**
 * Event System Module
 * Provides clean event handling with automatic cleanup
 * @module core/events
 */

/**
 * Add event listener with optional delegation
 * @param {Element|Window|Document} target - Event target
 * @param {string} event - Event name
 * @param {Function|string} handlerOrSelector - Event handler or CSS selector for delegation
 * @param {Function} delegatedHandler - Handler for delegated events
 * @returns {Function} Cleanup function
 */
export const on = (target, event, handlerOrSelector, delegatedHandler) => {
    if (!target) return () => { };

    // Delegation pattern
    if (typeof handlerOrSelector === 'string' && delegatedHandler) {
        const selector = handlerOrSelector;
        const handler = (e) => {
            const delegateTarget = e.target.closest(selector);
            if (delegateTarget) {
                delegatedHandler.call(delegateTarget, e);
            }
        };
        target.addEventListener(event, handler);
        return () => target.removeEventListener(event, handler);
    }

    // Direct event
    const handler = handlerOrSelector;
    target.addEventListener(event, handler);
    return () => target.removeEventListener(event, handler);
};

/**
 * Add event listener that fires once
 * @param {Element|Window|Document} target - Event target
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @returns {Function} Cleanup function
 */
export const once = (target, event, handler) => {
    if (!target) return () => { };

    const wrappedHandler = (e) => {
        handler(e);
        target.removeEventListener(event, wrappedHandler);
    };

    target.addEventListener(event, wrappedHandler);
    return () => target.removeEventListener(event, wrappedHandler);
};

/**
 * Debounce function execution
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};

/**
 * Throttle function execution
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (fn, limit = 300) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Event emitter class for custom events
 */
export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, handler) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(handler);
        return () => this.off(event, handler);
    }

    off(event, handler) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(h => h !== handler);
    }

    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(handler => handler(data));
    }

    once(event, handler) {
        const wrappedHandler = (data) => {
            handler(data);
            this.off(event, wrappedHandler);
        };
        this.on(event, wrappedHandler);
    }
}
