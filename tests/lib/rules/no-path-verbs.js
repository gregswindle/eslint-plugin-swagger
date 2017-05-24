/**
 * @fileoverview prohibit use of verbs in api paths
 * @author Greg Swindle
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-path-verbs"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-path-verbs", rule, {

    valid: [{
        code: "var spec = {\"swagger\":\"2.0\",\"paths\":{\"/pets\":null}}"
    }, {
        code: "var spec = {\"swagger\":\"2.0\",\"paths\":{\"/users/{id}/sessions\":{\"get\":{\"operationId\":\"logoutUser\"}}}}"
    }],

    invalid: [
        {
            code: "var spec = {\"swagger\":\"2.0\",\"paths\":{\"/users/{id}/logout\":{\"get\":{\"operationId\":\"logoutUser\"}}}}",
            errors: [{
                message: "Best Practices: no verbs in API paths"
            }]
        },
        {
            code: "var spec = {\"swagger\":\"2.0\",\"paths\":{\"/pets/addPet\":null}}",
            errors: [{
                message: "Best Practices: no verbs in API paths"
            }]
        }
    ]
});
