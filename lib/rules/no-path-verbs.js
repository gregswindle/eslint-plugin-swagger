/**
 * @fileoverview prohibit use of verbs in api paths
 * @author Greg Swindle
 */
"use strict";

const LintError = require("../errors/lint-error");
const PathEvaluator = require("../evaluators/path-evaluator");
const { drop, first, find, forEach, kebabCase, last, some, startsWith } = require("lodash");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "prohibit use of verbs in api paths",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: []
    },

    create(context) {

        // variables should be defined here
        const pathEvaluator = new PathEvaluator();

        const verbPrefixes = [
            "add",
            "append",
            "create",
            "delete",
            "edit",
            "find",
            "get",
            "modify",
            "push",
            "put",
            "read",
            "remove",
            "shift",
            "unshift",
            "update",
            "write"
        ];
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Determine wether a resource's value is a verb
         * @private
         * @param {string} resource A resource within an API path
         *
         * @returns {boolean} `true` if a verb; otherwise, `false`
         */
        function isVerb(resource) {
            if (pathEvaluator.isParameter(resource)) {
                return false;
            }
            return some(verbPrefixes, (verb) => {
                return startsWith(resource, verb);
            });
        }

        /**
         * Determines whether any resources within an API path are verbs
         * @private
         * @param {ASTNode<Property>} node A "paths" property of a Swagger specification
         *
         * @returns {void}
         */
        function validatePathResources(node, rule) {
            if (pathEvaluator.isPath(node)) {
                const path = pathEvaluator.getPathValue(node);
                const resources = drop(path.split("/"));
                if (some(resources, isVerb)) {
                    context.report({
                        node,
                        message: LintError.getContextMessage(rule),
                        data: {
                            resources,
                            identifier: path
                        }
                    });
                }
            }
        }

        /**
         * Split a potentially compound word and return its prefix
         * @private
         * @param {string} value An API path resource
         *
         * @returns {string} The word's prefix
         */
        function getPrefix(value) {
            return first(kebabCase(value).split("-"));
        }

        /**
         * Checks whether the last resource in a path shares a verb with its `operationId`.
         *
         * @param {ASTNode<Property>} node A "paths" property of a Swagger specification
         *
         * @returns {boolean} `true` whenever the last resource and its operationId start with the same strings.
         */
        function pathContainsOperationId(node, rule) {
            if (pathEvaluator.isPath(node)) {
                const path = pathEvaluator.getPathValue(node);
                const lastPathResource = last(path.split("/"));
                forEach(node.value.properties, (prop) => {
                    const operations = find(prop.value.properties, (prop) => {
                        return prop.key.value === "operationId";
                    });
                    const operationIdPrefix = getPrefix(operations.value.value);
                    const lastPathResourcePrefix =  getPrefix(lastPathResource);
                    if (operationIdPrefix === lastPathResourcePrefix) {
                        context.report({
                            node,
                            message: LintError.getContextMessage(rule),
                            data: {
                                identifier: path
                            }
                        });
                    }
                });
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            "Property[key.type=Literal]:exit": (propertyNode) => {
                validatePathResources(propertyNode, this);
            },

            "Property[key.type=Literal][value.properties.length > 0]": (propertyNode) => {
                pathContainsOperationId(propertyNode, this);
            }

        };
    }
};
