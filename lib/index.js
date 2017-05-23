/**
 * @fileoverview An extensible linter for Swagger/OpenAPI specifications.
 * @author Greg Swindle
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



// import processors
module.exports.processors = requireIndex(__dirname + "/processors");

// configs
module.exports.configs = {
    recommended: {
        rules: {
            "swaggger-tools/require-plural-paths": 2
        }
    }
};
