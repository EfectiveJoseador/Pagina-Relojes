/**
 * Global Anti-Bot Protection System
 * Provides multi-layer bot detection with zero friction for real users
 * 
 * Features:
 * - Honeypot field detection
 * - Timestamp validation (minimum time on page)
 * - User interaction tracking (clicks, keyboard, mouse, touch)
 * - Automatic form protection
 */

class AntiBotProtection {
    constructor() {
        this.pageLoadTime = Date.now();
        this.hasInteracted = false;
        this.minTimeOnPage = 3000; // 3 seconds minimum
        this.init();
    }

    init() {
        // Track user interactions
        this.trackInteractions();
    }

    /**
     * Track human-like interactions
     */
    trackInteractions() {
        const trackEvent = () => {
            if (!this.hasInteracted) {
                this.hasInteracted = true;
            }
        };

        // Listen for various interaction types
        document.addEventListener('click', trackEvent, { once: true });
        document.addEventListener('keydown', trackEvent, { once: true });
        document.addEventListener('mousemove', trackEvent, { once: true });
        document.addEventListener('touchstart', trackEvent, { once: true });
        document.addEventListener('scroll', trackEvent, { once: true });
    }

    /**
     * Add timestamp field to a form
     * @param {HTMLFormElement} form - The form to protect
     * @returns {HTMLInputElement} The timestamp field
     */
    addTimestamp(form) {
        let timestampField = form.querySelector('#antibot-timestamp');
        if (timestampField) return timestampField;

        timestampField = document.createElement('input');
        timestampField.type = 'hidden';
        timestampField.name = '_antibot_timestamp';
        timestampField.id = 'antibot-timestamp';
        timestampField.value = this.pageLoadTime.toString();

        form.insertBefore(timestampField, form.firstChild);
        return timestampField;
    }

    /**
     * Add interaction tracking field to a form
     * @param {HTMLFormElement} form - The form to protect
     * @returns {HTMLInputElement} The interaction field
     */
    addInteractionField(form) {
        let interactionField = form.querySelector('#antibot-interaction');
        if (interactionField) {
            // Update value based on current interaction state
            interactionField.value = this.hasInteracted ? '1' : '0';
            return interactionField;
        }

        interactionField = document.createElement('input');
        interactionField.type = 'hidden';
        interactionField.name = '_antibot_interaction';
        interactionField.id = 'antibot-interaction';
        interactionField.value = this.hasInteracted ? '1' : '0';

        form.insertBefore(interactionField, form.firstChild);

        // Keep field updated as user interacts
        const updateField = () => {
            interactionField.value = '1';
        };
        document.addEventListener('click', updateField, { once: true });
        document.addEventListener('keydown', updateField, { once: true });
        document.addEventListener('mousemove', updateField, { once: true });
        document.addEventListener('touchstart', updateField, { once: true });

        return interactionField;
    }

    /**
     * Protect a form with anti-bot measures
     * @param {HTMLFormElement|string} formSelector - Form element or selector
     * @param {Object} options - Configuration options
     */
    protectForm(formSelector, options = {}) {
        const form = typeof formSelector === 'string'
            ? document.querySelector(formSelector)
            : formSelector;

        if (!form) return;

        // Add protection fields
        this.addTimestamp(form);
        this.addInteractionField(form);

        // Add submit event listener for validation
        form.addEventListener('submit', (e) => {
            if (!this.validateSubmission(form, options)) {
                e.preventDefault();
            }
        }, { capture: true }); // Use capture to run before other handlers
    }

    /**
     * Validate form submission against bot detection rules
     * @param {HTMLFormElement} form - The form being submitted
     * @param {Object} options - Validation options
     * @returns {boolean} True if validation passes, false otherwise
     */
    validateSubmission(form, options = {}) {
        const {
            silentFail = true,
            minTime = this.minTimeOnPage,
            requireInteraction = true,
            onBotDetected = null
        } = options;

        // 1. Timestamp check
        const timestampField = form.querySelector('#antibot-timestamp');
        if (timestampField && timestampField.value) {
            const timeOnPage = Date.now() - parseInt(timestampField.value);
            if (timeOnPage < minTime) {
                console.warn('[Anti-Bot] Bot detected: submission too fast');
                if (onBotDetected) onBotDetected('too_fast');
                alert('Por favor, revise sus datos antes de continuar.');
                return false;
            }
        }

        // 2. Interaction check (formerly 3)
        if (requireInteraction) {
            const interactionField = form.querySelector('#antibot-interaction');
            if (interactionField && interactionField.value === '0') {
                console.warn('[Anti-Bot] Bot detected: no user interaction');
                if (onBotDetected) onBotDetected('no_interaction');
                alert('Por favor, complete todos los campos del formulario.');
                return false;
            }
        }

        console.log('[Anti-Bot] Validation passed ✓');
        return true;
    }

    /**
     * Auto-protect all forms on the page
     * @param {Object} options - Protection options
     */
    protectAllForms(options = {}) {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Skip forms with data-no-antibot attribute
            if (form.hasAttribute('data-no-antibot')) return;
            this.protectForm(form, options);
        });
    }
}

// Create global instance
const antiBot = new AntiBotProtection();

// Auto-protect forms on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        antiBot.protectAllForms();
    });
} else {
    antiBot.protectAllForms();
}

// Export for manual use
window.AntiBot = antiBot;
