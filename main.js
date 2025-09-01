/**
 * Tawjihi Results Search - Main JavaScript
 * Handles dropdown interactions and form submissions
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeDropdowns();
    });

    /**
     * Initialize all dropdown functionality
     */
    function initializeDropdowns() {
        initializeYearDropdown();
        initializePeriodDropdown();
    }

    /**
     * Initialize year dropdown functionality
     */
    function initializeYearDropdown() {
        const yearItems = document.querySelectorAll('input[name="year-display"]');
        const yearSelectedItem = document.querySelector('.year-dropdown .selected-item');
        const yearHidden = document.querySelector('input[name="year"]');
        const yearDropdown = document.querySelector('.year-dropdown');

        if (!yearItems.length || !yearSelectedItem || !yearHidden || !yearDropdown) {
            console.warn('Year dropdown elements not found');
            return;
        }

        yearItems.forEach(function(item) {
            item.addEventListener('change', function() {
                if (item.checked) {
                    updateDropdownValue(yearSelectedItem, yearHidden, item.value, item.value);
                    closeDropdown(yearDropdown);
                }
            });
        });
    }

    /**
     * Initialize period dropdown functionality
     */
    function initializePeriodDropdown() {
        const periodItems = document.querySelectorAll('input[name="period-display"]');
        const periodSelectedItem = document.querySelector('.period-dropdown .selected-item');
        const periodHidden = document.querySelector('input[name="period"]');
        const periodDropdown = document.querySelector('.period-dropdown');

        const periodNames = {
            '1': 'الدورة الاولى',
            '2': 'الدورة الثانية',
            '3': 'الدورة الثالثة'
        };

        if (!periodItems.length || !periodSelectedItem || !periodHidden || !periodDropdown) {
            console.warn('Period dropdown elements not found');
            return;
        }

        periodItems.forEach(function(item) {
            item.addEventListener('change', function() {
                if (item.checked) {
                    const displayText = periodNames[item.value] || item.value;
                    updateDropdownValue(periodSelectedItem, periodHidden, displayText, item.value);
                    closeDropdown(periodDropdown);
                }
            });
        });
    }

    /**
     * Update dropdown display and hidden input values
     * @param {HTMLElement} displayElement - The element showing selected text
     * @param {HTMLElement} hiddenInput - The hidden input element
     * @param {string} displayText - Text to show in dropdown
     * @param {string} value - Value to store in hidden input
     */
    function updateDropdownValue(displayElement, hiddenInput, displayText, value) {
        if (displayElement && hiddenInput) {
            displayElement.textContent = displayText;
            hiddenInput.value = value;
        }
    }

    /**
     * Close a dropdown menu
     * @param {HTMLElement} dropdown - The dropdown element to close
     */
    function closeDropdown(dropdown) {
        if (dropdown && dropdown.hasAttribute('open')) {
            dropdown.removeAttribute('open');
        }
    }

})();