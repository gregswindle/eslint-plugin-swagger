"use strict";


/**
 * Custom error object for Lint violations
 * @extends Error
 */
class LintError extends Error {

    /**
     * Create a shadow LintError object
     *
     * @param {string} message    The error message
     * @param {string} fileName   The name of the file where the error occurred
     * @param {number} lineNumber The line number where the error was thrown
     *
     * @returns {LintError} A shadow LintError object
     */
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "LintError";
    }

}

/**
 * Provide a consistent, predictable message for context reports
 *
 * @param {Rule} rule An ESLint rule instance
 *
 * @returns {string} A message with rule category and description
 */
LintError.getContextMessage = (rule) => {
    return `${rule.meta.docs.category}: ${rule.meta.docs.description}.`;
};

module.exports = LintError;
