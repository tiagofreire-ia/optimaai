/**
 * DOM Utilities Module
 * Provides clean, reusable DOM manipulation functions
 * @module core/dom
 */

/**
 * Select single element by CSS selector
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element
 * @returns {Element|null}
 */
export const $ = (selector, context = document) =>
  context.querySelector(selector);

/**
 * Select multiple elements by CSS selector
 * @param {string} selector - CSS selector
 * @param {Element} context - Optional context element
 * @returns {NodeList}
 */
export const $$ = (selector, context = document) =>
  context.querySelectorAll(selector);

/**
 * Get element by ID
 * @param {string} id - Element ID
 * @returns {Element|null}
 */
export const byId = (id) => document.getElementById(id);

/**
 * Create element with optional attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - Element attributes
 * @param {Array|string} children - Child elements or text
 * @returns {Element}
 */
export const create = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else el.setAttribute(key, value);
  });

  const childArray = Array.isArray(children) ? children : [children];
  childArray.forEach((child) => {
    if (typeof child === 'string')
      el.appendChild(document.createTextNode(child));
    else if (child instanceof Element) el.appendChild(child);
  });

  return el;
};

/**
 * Toggle class on element
 * @param {Element} el - Target element
 * @param {string} className - Class name
 * @param {boolean} force - Force add/remove
 */
export const toggleClass = (el, className, force) => {
  if (!el) return;
  el.classList.toggle(className, force);
};

/**
 * Add class to element
 * @param {Element} el - Target element
 * @param {...string} classNames - Class names to add
 */
export const addClass = (el, ...classNames) => {
  if (!el) return;
  el.classList.add(...classNames);
};

/**
 * Remove class from element
 * @param {Element} el - Target element
 * @param {...string} classNames - Class names to remove
 */
export const removeClass = (el, ...classNames) => {
  if (!el) return;
  el.classList.remove(...classNames);
};

/**
 * Check if element has class
 * @param {Element} el - Target element
 * @param {string} className - Class name to check
 * @returns {boolean}
 */
export const hasClass = (el, className) =>
  el?.classList.contains(className) ?? false;
