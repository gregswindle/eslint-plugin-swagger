/**
 * @fileoverview each API path should be unique
 * @author Greg Swindle
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const LintError = require("../../../lib/errors/lint-error");
const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-dup-paths");


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
