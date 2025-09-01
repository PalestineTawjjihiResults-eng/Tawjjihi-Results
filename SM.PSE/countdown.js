/**
 * Tawjihi Results Countdown Timer
 * Counts down to the results announcement date
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        targetDate: new Date('2025-09-02T09:00:00+03:00').getTime(),
        updateInterval: 1000, // Update every second
        elements: {
            timer: 'countdown-timer',
            message: 'countdown-message',
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds',
            // Search form elements
            searchForm: 'search-form',
            searchBox: 'search-box',
            searchInput: 'student-id',
            searchButton: 'search-btn',
            yearDropdown: 'year-dropdown',
            periodDropdown: 'period-dropdown'
        }
    };

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeCountdown();
    });

    /**
     * Initialize the countdown timer
     */
    function initializeCountdown() {
        // Verify all required elements exist
        if (!validateElements()) {
            console.warn('Countdown: Required elements not found');
            return;
        }

        // Initialize search form state
        updateSearchFormState();

        // Start the countdown
        updateCountdown();
        setInterval(updateCountdown, CONFIG.updateInterval);
    }

    /**
     * Validate that all required DOM elements exist
     * @returns {boolean} True if all elements exist
     */
    function validateElements() {
        const requiredElements = [
            CONFIG.elements.timer,
            CONFIG.elements.message,
            CONFIG.elements.days,
            CONFIG.elements.hours,
            CONFIG.elements.minutes,
            CONFIG.elements.seconds
        ];
        
        for (const elementId of requiredElements) {
            if (!document.getElementById(elementId)) {
                console.warn(`Countdown: Element with ID '${elementId}' not found`);
                return false;
            }
        }
        
        return true;
    }

    /**
     * Update the countdown display and search form state
     */
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = CONFIG.targetDate - now;
        
        if (distance < 0) {
            showResultsAvailable();
            enableSearchForm();
            return;
        }
        
        const timeComponents = calculateTimeComponents(distance);
        updateDisplay(timeComponents);
        disableSearchForm();
    }

    /**
     * Calculate time components from distance
     * @param {number} distance - Time distance in milliseconds
     * @returns {Object} Object containing days, hours, minutes, seconds
     */
    function calculateTimeComponents(distance) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }

    /**
     * Update the countdown display with new values
     * @param {Object} timeComponents - Object containing time values
     */
    function updateDisplay(timeComponents) {
        const elements = CONFIG.elements;
        
        // Update each time component with zero-padding
        document.getElementById(elements.days).textContent = 
            padNumber(timeComponents.days);
        document.getElementById(elements.hours).textContent = 
            padNumber(timeComponents.hours);
        document.getElementById(elements.minutes).textContent = 
            padNumber(timeComponents.minutes);
        document.getElementById(elements.seconds).textContent = 
            padNumber(timeComponents.seconds);
    }

    /**
     * Show the results available message
     */
    function showResultsAvailable() {
        const timerElement = document.getElementById(CONFIG.elements.timer);
        const messageElement = document.getElementById(CONFIG.elements.message);
        
        if (timerElement && messageElement) {
            timerElement.style.display = 'none';
            messageElement.style.display = 'block';
        }
    }

    /**
     * Disable the search form during countdown
     */
    function disableSearchForm() {
        const searchBox = document.getElementById(CONFIG.elements.searchBox) || 
                         document.querySelector('.search-box');
        const searchInput = document.getElementById(CONFIG.elements.searchInput);
        const searchButton = document.getElementById(CONFIG.elements.searchButton) || 
                            document.querySelector('.search-btn');
        const yearDropdown = document.getElementById(CONFIG.elements.yearDropdown) || 
                            document.querySelector('.year-dropdown');
        const periodDropdown = document.getElementById(CONFIG.elements.periodDropdown) || 
                              document.querySelector('.period-dropdown');

        // Add disabled classes and attributes
        if (searchBox) {
            searchBox.classList.add('disabled');
        }

        if (searchInput) {
            searchInput.disabled = true;
            searchInput.placeholder = 'البحث متاح بعد انتهاء العد التنازلي';
        }

        if (searchButton) {
            searchButton.disabled = true;
            searchButton.classList.add('countdown-active');
            searchButton.textContent = 'مقفل حتى إعلان النتائج';
        }

        if (yearDropdown) {
            yearDropdown.classList.add('disabled');
            // Disable the details element
            if (yearDropdown.tagName === 'DETAILS') {
                yearDropdown.removeAttribute('open');
                yearDropdown.style.pointerEvents = 'none';
            }
        }

        if (periodDropdown) {
            periodDropdown.classList.add('disabled');
            // Disable the details element
            if (periodDropdown.tagName === 'DETAILS') {
                periodDropdown.removeAttribute('open');
                periodDropdown.style.pointerEvents = 'none';
            }
        }

        // Prevent form submission
        const form = document.getElementById(CONFIG.elements.searchForm) || 
                    document.querySelector('form');
        if (form) {
            form.addEventListener('submit', preventFormSubmission);
        }
    }

    /**
     * Enable the search form when countdown finishes
     */
    function enableSearchForm() {
        const searchBox = document.getElementById(CONFIG.elements.searchBox) || 
                         document.querySelector('.search-box');
        const searchInput = document.getElementById(CONFIG.elements.searchInput);
        const searchButton = document.getElementById(CONFIG.elements.searchButton) || 
                            document.querySelector('.search-btn');
        const yearDropdown = document.getElementById(CONFIG.elements.yearDropdown) || 
                            document.querySelector('.year-dropdown');
        const periodDropdown = document.getElementById(CONFIG.elements.periodDropdown) || 
                              document.querySelector('.period-dropdown');

        // Remove disabled classes and attributes
        if (searchBox) {
            searchBox.classList.remove('disabled');
        }

        if (searchInput) {
            searchInput.disabled = false;
            searchInput.placeholder = 'ادخل رقم الجلوس المكون من 6 أو 8 أرقام فقط';
        }

        if (searchButton) {
            searchButton.disabled = false;
            searchButton.classList.remove('countdown-active');
            searchButton.textContent = 'بحث';
        }

        if (yearDropdown) {
            yearDropdown.classList.remove('disabled');
            if (yearDropdown.tagName === 'DETAILS') {
                yearDropdown.style.pointerEvents = 'auto';
            }
        }

        if (periodDropdown) {
            periodDropdown.classList.remove('disabled');
            if (periodDropdown.tagName === 'DETAILS') {
                periodDropdown.style.pointerEvents = 'auto';
            }
        }

        // Allow form submission
        const form = document.getElementById(CONFIG.elements.searchForm) || 
                    document.querySelector('form');
        if (form) {
            form.removeEventListener('submit', preventFormSubmission);
        }
    }

    /**
     * Update search form state based on current time
     */
    function updateSearchFormState() {
        const now = new Date().getTime();
        const distance = CONFIG.targetDate - now;
        
        if (distance < 0) {
            enableSearchForm();
        } else {
            disableSearchForm();
        }
    }

    /**
     * Prevent form submission during countdown
     * @param {Event} event - Form submit event
     */
    function preventFormSubmission(event) {
        event.preventDefault();
        
        // Show a message to the user
        const searchButton = document.querySelector('.search-btn');
        if (searchButton) {
            const originalText = searchButton.textContent;
            searchButton.textContent = '';
            
            setTimeout(() => {
                searchButton.textContent = originalText;
            }, 2000);
        }
        
        return false;
    }

    /**
     * Add leading zero to numbers less than 10
     * @param {number} num - Number to pad
     * @returns {string} Zero-padded string
     */
    function padNumber(num) {
        return num.toString().padStart(2, '0');
    }

    /**
     * Public API for external access (if needed)
     */
    window.TawjihiCountdown = {
        /**
         * Get remaining time until target date
         * @returns {Object|null} Time components or null if expired
         */
        getRemainingTime: function() {
            const now = new Date().getTime();
            const distance = CONFIG.targetDate - now;
            
            if (distance < 0) {
                return null;
            }
            
            return calculateTimeComponents(distance);
        },

        /**
         * Check if results are available
         * @returns {boolean} True if results should be available
         */
        areResultsAvailable: function() {
            const now = new Date().getTime();
            return CONFIG.targetDate <= now;
        },

        /**
         * Get target date
         * @returns {Date} Target date object
         */
        getTargetDate: function() {
            return new Date(CONFIG.targetDate);
        },

        /**
         * Manually enable search form (for testing)
         */
        enableSearch: function() {
            enableSearchForm();
        },

        /**
         * Manually disable search form (for testing)
         */
        disableSearch: function() {
            disableSearchForm();
        }
    };

})();