/**
 * @fileoverview Require API paths to use plural resources for all resources
 * @author Greg Swindle
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const _ = require("lodash");
const pluralize = require("pluralize");

module.exports = {
    meta: {
        docs: {
            description: "Require API paths to use plural nouns for all resources",
            category: "Best Practices",
            recommended: false
        },
        fixable: "code", // or "code" or "whitespace"
        schema: []
    },

    create: function(context) {

        // variables should be defined here

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
         * Detect parameters in an API path
         *
         * @param {string} resource A path resource or parameter
         *
         * @returns {boolean} `true` if parameter; otherwise, `false`
         */
        function isPathParameter(resource) {
            return _.startsWith(resource, "{") && _.endsWith(resource, "}");
        }

        /**
         * Determines whether an API path entry is valid
         *
         * @param {string} resource A resource or parameter in an API path
         *
         * @returns {type} `false` if parameter or plural resource; otherwise, `true`.
         */
        function isInvalidPathEntry(resource) {
            return isSingular(resource) && !isPathParameter(resource);
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
                if (!isPathParameter(resource)) {
                    return pluralize.plural(resource);
                }
                return resource;
            });
            return validResources.join("/");
        }

        /**
         * Generate an error message with instructions to ammeliorate
         * @private
         * @param {ASTNode} node The ASTNode where the style violation occurred
         *
         * @returns {string} An error message with instructions to fix.
         */
        function toErrorMsg(node) {
            const invalidValue = node.key.value;
            const validValue = fixPathResources(node.key.value.split("/"));
            return `Style violation: API paths should have plural resources. Change resource "${invalidValue}" to "${validValue}" (or run eslint with the --fix flag) to automatically ensure style compliance.`;
        }

        /**
         * Determines whether any resources within an API path are singular,
         * and returns all invalid cases.
         * @private
         * @param {ASTNode} pathsNode The "paths" property of a Swagger specification
         *
         * @returns {array<report>} An array of invalid paths
         */
        function validatePathResources(pathsNode) {
            let invalidResources = _.chain(pathsNode.value.properties)
                .map((path) => {
                    const resources = _.drop(path.key.value.split("/"));
                    if (_.some(resources, isInvalidPathEntry)) {
                        context.report({
                            loc: path.key.loc,
                            message: toErrorMsg(path),
                            data: {
                                resources: resources,
                                identifier: path.key.value
                            },
                            fix: function(fixer) {
                                const validPath = fixPathResources(resources);
                                return fixer.replaceText(path.key.value, validPath);
                            }
                        });
                    }
                }).value();
            return invalidResources;
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            Property: (propertyNode) => {
                validatePathResources(propertyNode);
            }
        };
    }
};
