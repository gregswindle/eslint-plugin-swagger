"use strict";

module.exports = {
    ".json": {

      /**
       * Ensure that JSON strings are properly esscaped
       *
       * @param {string} sourceCode JSON source code
       *
       * @returns {string} Escaped JSON
       */
        preprocess(sourceCode) {
            return [JSON.stringify(sourceCode)];
        }
    }
};
