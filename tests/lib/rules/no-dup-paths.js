/**
 * @fileoverview each API path should be unique
 * @author Greg Swindle
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-dup-paths"),
    LintError = require("../../../lib/errors/lint-error"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const message = LintError.getContextMessage(rule);
const ruleTester = new RuleTester();
ruleTester.run("no-dup-paths", rule, {

    valid: [{

        code: " var swagger = {\"paths\":{\"/pets/{id}\":null,\"/pets/{id}/registeredIds\":null}}"

    }],

    invalid: [
        {
            code: " var swagger = {\"paths\":{\"/pets/{id}\":null,\"/pets/{id}\":null}}",
            errors: [{
                message,
                type: "Property"
            }]
        },
        {
            code: " var swagger = {\"paths\":{\"/pets/{id}\":null,\"/pets/{uuid}\":null}}",
            errors: [{
                message,
                type: "Property"
            }]
        },
        {
            code: " var swagger = {\"paths\":{\"/pets/{id}/vaccinations/{vaccineId}\":null,\"/pets/{uuid}/vaccinations/{iupacId}\":null}}",
            errors: [{
                message,
                type: "Property"
            }]
        }
    ]
});
