/**
 * @fileoverview Require API paths to use plural nouns for all resources
 * @author Greg Swindle
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/plural-paths"),

    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const {
    trimEnd
} = require("lodash");
const errors = [{
    message: "API path resources should be plural",
    type: "Property"
}];
const petStoreApi = require("./fixtures/pet-store.swagger");
const ruleTester = new RuleTester();

// console.log(petStoreApi);
console.log(trimEnd(JSON.stringify(petStoreApi), ":"));

ruleTester.run("plural-paths", rule, {

    valid: [
        // "{paths: {'/pets':{}}}",
        // "{paths: {'/pets/{id}':{}}}"
    ],

    invalid: [{
        code: trimEnd(JSON.stringify(petStoreApi), ":"),
        errors: [{
            message: "Resources should be plural in API paths",
            type: "Literal",
            name: "paths"
        }]
    }]
});
