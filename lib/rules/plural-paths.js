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
        let reports = [];
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        /**
         * Identifies the "paths" property so we can access its collection
         * @private
         * @param {ASTNode} node The node to evaluate
         *
         * @returns {boolean} `true` if "paths"; otherwise `false`
         */
        function isPathsNode(node) {
            return node.key.type === "Identifier" &&
                node.key.name === "paths";
        }

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
         * @param {string} resource A resource or parameter in an API path
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
         * @returns {type} `true` if parameter or plural resource; otherwise, `false`
         */
        function isValidPathEntry(resource) {
            return !isSingular(resource) || isPathParameter(resource);
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
            return _.chain(resources)
                .map(resource, pluralize.plural)
                .value()
                .join('/');
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
            let invalidResources = _
                .chain(pathsNode.value.properties)
                .map((path) => {
                    const resources = _.drop(path.key.value.split('/'));
                    if (_.some(resources, isValidPathEntry)) {
                        return {
                            node: path,
                            message: "API paths should have plural resources",
                            data: {
                                resources: resources,
                                identifier: path.key.value
                            },
                            fix: function(fixer) {
                                const validPath = fixPathResources(resources);
                                return fixer.replaceText(path.key.value, validPath);
                            }
                        };
                    }
                }).value();
            console.log(invalidResources);
            return invalidResources;
        }

        function reportInvalidPaths(reports) {
            _.forEach(reports, context.report);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            Property: (propertyNode) => {
                reports = validatePathResources(propertyNode);
                reportInvalidPaths(reports);
            }

        };
    }
};
