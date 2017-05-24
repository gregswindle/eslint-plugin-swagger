/**
 * @fileoverview Require plural nouns in API paths
 * @author Greg Swindle
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const PathEvaluator = require("../evaluators/path-evaluator");
const _ = require("lodash");
const pluralize = require("pluralize");

module.exports = {
    meta: {
        docs: {
            description: "require plural nouns in API paths",
            category: "Stylistic Issues",
            recommended: true
        },
        fixable: "code", // or "code" or "whitespace"
        schema: []
    },

    create(context) {

        // variables should be defined here
        const pathEvaluator = new PathEvaluator();

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        /**
         * Determine whether a resource is singular
         * @private
         * @param {string} resource A resource in an API path
         *
         * @returns {boolean} `true` if singular, or `false` if plural
         */
        function isSingular(resource) {
            return !_.isUndefined(resource) &&
                resource === pluralize.singular(resource) &&
                resource !== pluralize.plural(resource);
        }

        /**
         * Determines whether an API path entry is valid
         *
         * @param {string} resource A resource or parameter in an API path
         *
         * @returns {type} `false` if parameter or plural resource; otherwise, `true`.
         */
        function isInvalidPathEntry(resource) {
            return isSingular(resource) && !pathEvaluator.isParameter(resource);
        }

        /**
         * Replace all singular resources with plural resources in an API path
         * property.
         * @private
         * @param {array<string>} resources All resources in an API path
         *
         * @returns {string} A valid API path with plural resources
         */
        function fixPathResources(resources) {
            const validResources = _.map(resources, (resource) => {
                return !pathEvaluator.isParameter(resource) ?
                  pluralize.plural(resource) : resource;
            });
            return  `/${validResources.join("/")}`;
        }

        /**
         * Generate an error message with instructions to ammeliorate
         * @private
         * @param {ASTNode} node The ASTNode where the style violation occurred
         *
         * @returns {string} An error message with instructions to fix.
         */
        function toErrorMsg(node, resources) {
            const invalidValue = node.key.value;
            const validValue = fixPathResources(resources);
            return `Style violation: API paths should have plural resources. Change resource "${invalidValue}" to "${validValue}" (or run eslint with the --fix flag) to automatically ensure style compliance.`;
        }

        /**
         * Determines whether any resources within an API path are singular,
         * and returns all invalid cases.
         * @private
         * @param {ASTNode} node A "paths" property of a Swagger specification
         *
         * @returns {void}
         */
        function validatePathResources(node) {
            if (pathEvaluator.isPath(node)) {
                const path = node.key.value;
                const resources = _.drop(path.split("/"));
                if (_.some(resources, isInvalidPathEntry)) {
                    context.report({
                        node,
                        message: toErrorMsg(node, resources),
                        data: {
                            resources,
                            identifier: path
                        },
                        fix(fixer) {
                            const validPath = fixPathResources(resources);
                            return fixer.replaceText(node, validPath);
                        }
                    });
                }
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            "Property[key.type=Literal]:exit": (propertyNode) => {
                validatePathResources(propertyNode);
            }
        };
    }
};
