/*eslint arrow-body-style: 1*/
/*eslint no-confusing-arrow: 1*/
/**
 * @fileoverview Require plural nouns in API paths
 * @author Greg Swindle
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const LintError = require("../errors/lint-error");
const PathEvaluator = require("../evaluators/path-evaluator");
const { drop, isUndefined, map, some } = require("lodash");
const pluralize = require("pluralize");

module.exports = {
    meta: {
        docs: {
            description: "require plural nouns in API paths",
            category: "Stylistic Issues",
            recommended: true
        },
        fixable: "code", // Or "code" or "whitespace"
        schema: []
    },

    create(context) {

        // Variables should be defined here
        const pathEvaluator = new PathEvaluator();

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // Any helper functions should go here or else delete this section

        /**
         * Determine whether a resource is singular
         * @private
         * @param {string} resource A resource in an API path
         *
         * @returns {boolean} `true` if singular, or `false` if plural
         */
        const isSingular = function(resource) {
            return !isUndefined(resource) &&
                resource === pluralize.singular(resource) &&
                resource !== pluralize.plural(resource);
        };

        /**
         * Determines whether an API path entry is valid
         *
         * @param {string} resource A resource or parameter in an API path
         *
         * @returns {type} `false` if parameter or plural resource; otherwise, `true`.
         */
        const isInvalidPathEntry = function(resource) {
            return isSingular(resource) && !pathEvaluator.isParameter(resource);
        };

        /**
         * Replace all singular resources with plural resources in an API path
         * property.
         * @private
         * @param {array<string>} resources All resources in an API path
         *
         * @returns {string} A valid API path with plural resources
         */
        const fixPathResources = function(resources) {
            const mapValidResources = function(resource) {
                return (!pathEvaluator.isParameter(resource) ?
                    pluralize.plural(resource) : resource);
            };
            const validResources = map(resources, mapValidResources);
            return  `/${validResources.join("/")}`;
        };

        /**
         * Determines whether any resources within an API path are singular,
         * and returns all invalid cases.
         * @private
         * @param {ASTNode} node A "paths" property of a Swagger specification
         *
         * @returns {void}
         */
        const validatePathResources = function(node, rule) {
            if (pathEvaluator.isPath(node)) {
                const path = pathEvaluator.getPathValue(node);
                const resources = drop(path.split("/"));
                if (some(resources, isInvalidPathEntry)) {
                    context.report({
                        node,
                        message: LintError.getContextMessage(rule),
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
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            /**
           * Check API paths' resources for singular nouns
           *
           * @param {ASTNode<Property>} propertyNode A node to be evaluated
           *
           * @returns {void}
           */
            "Property[key.type=Literal]:exit": (propertyNode) => {
                validatePathResources(propertyNode, this);
            }
        };
    }
};
