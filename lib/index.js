/* eslint no-path-concat: 1 */
/**
 * @fileoverview An extensible linter for Swagger/OpenAPI specifications.
 * @author Greg Swindle
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const path = require("path");
const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// Import all rules in lib/rules
module.exports.rules = requireIndex(path.join(__dirname, "/rules"));



// Import processors
module.exports.processors = requireIndex(path.join(__dirname, "/processors"));

// Configs
module.exports.configs = {
    recommended: {
        rules: {
            "swaggger-tools/require-plural-paths": 2
        }
    }
};
