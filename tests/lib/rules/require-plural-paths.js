/**
 * @fileoverview Require API paths to use plural nouns for all resources
 * @author Greg Swindle
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require("fs");
const rule = require("../../../lib/rules/require-plural-paths");
const spec = fs.readFileSync("tests/lib/fixtures/pet-store.swagger.json", "utf8");
const { RuleTester } = require("eslint");
const { map } = require("lodash");
const ruleTester = new RuleTester();


/**
 * Helper function that creates expected error messages based on invalid paths.
 *
 * @returns {array<object>} A collection of error message objects.
 */
const createExpectedErrorMessages = () => {
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
    const mapErrMsg = function() {
        return {
            message: "Stylistic Issues: require plural nouns in API paths."
        };
    };
    return map(paths, mapErrMsg);
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

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
