/**
 * @fileoverview Require API paths to use plural nouns for all resources
 * @author Greg Swindle
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var { map } = require("lodash"),
    rule = require("../../../lib/rules/require-plural-paths"),
    fs = require("fs"),
    spec = fs.readFileSync("tests/lib/fixtures/pet-store.swagger.json", "utf8"),
    RuleTester = require("eslint").RuleTester;
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

function createExpectedErrorMessages() {
    const msg = "Style violation: API paths should have plural resources. Change resource \"INVALID_VAL\" to \"VALID_VAL\" (or run eslint with the --fix flag) to automatically ensure style compliance.";
    const paths = [{
        "invalid": "/pet",
        "valid": "/pets"
    }, {
        "invalid": "/pet/findByStatus",
        "valid": "/pets/findByStatuses"
    }, {
        "invalid": "/pet/findByTags",
        "valid": "/pets/findByTags"
    }, {
        "invalid": "/pet/{petId}",
        "valid": "/pets/{petId}"
    }, {
        "invalid": "/pet/{petId}/uploadImage",
        "valid": "/pets/{petId}/uploadImages"
    }, {
        "invalid": "/store/inventory",
        "valid": "/stores/inventories"
    }, {
        "invalid": "/store/order",
        "valid": "/stores/orders"
    }, {
        "invalid": "/store/order/{orderId}",
        "valid": "/stores/orders/{orderId}"
    }, {
        "invalid": "/user",
        "valid": "/users"
    }, {
        "invalid": "/user/createWithArray",
        "valid": "/users/createWithArrays"
    }, {
        "invalid": "/user/createWithList",
        "valid": "/users/createWithLists"
    }, {
        "invalid": "/user/login",
        "valid": "/users/logins"
    }, {
        "invalid": "/user/logout",
        "valid": "/users/logouts"
    }, {
        "invalid": "/user/{username}",
        "valid": "/users/{username}"
    }];
    return map(paths, (path) => {
        return {
            message: msg.replace("INVALID_VAL", path.invalid).replace("VALID_VAL", path.valid)
        };
    });
}

const ruleTester = new RuleTester();
ruleTester.run("require-plural-paths", rule, {

    valid: [{
        code: "module.exports = {\"swagger\":\"2.0\",\"paths\":{\"/pets\":null}};"
    }, {
        code: "var spec = {\"swagger\":\"2.0\",\"paths\":{\"/pets/{chipId}\":null}};"
    }],

    invalid: [{
        code: "module.exports = {\"swagger\":\"2.0\",\"paths\":{\"/pet\":null}};",
        errors: [{
            code: "module.exports = {\"swagger\":\"2.0\",\"paths\":{\"/pets\":null}};"
        }]
    },
    {
        code: "var spec = {\"swagger\":\"2.0\",\"paths\":{\"/pet/{chipId}\":null}};",
        errors: [{
            code: "var spec = {\"swagger\":\"2.0\",\"paths\":{\"/pets/{chipId}\":null}};"
        }]
    },
    {
        code: `var spec = ${spec.toString()}`,
        errors: createExpectedErrorMessages()
    }]
});
