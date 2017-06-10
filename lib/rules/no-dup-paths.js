/**
 * @fileoverview each API path should be unique
 * @author Greg Swindle
 */

const LintError = require("../errors/lint-error");
const PathEvaluator = require("../evaluators/path-evaluator");
const { filter, includes } = require("lodash");
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "each API path should be unique",
            category: "Best Practices",
            recommended: false
        },
        fixable: null,  // Or "code" or "whitespace"
        schema: [
            // Fill in your schema
        ]
    },

    create(context) {

        // Variables should be defined here
        const pathEvaluator = new PathEvaluator();
        const duplicatePaths = [];
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // Any helper functions should go here or else delete this section

        /**
         * Return a generic path to identify duplicates
         * @private
         * @param {ASTNode<Property>} node The ASTNode to evaluate
         *
         * @returns {string} An API path with identical parameter values
         */
        const replaceParamWithGeneric = function(node) {
            const path = pathEvaluator.getPathValue(node);
            const paramPtn = /(\{\w+\})/gi;
            return path.replace(paramPtn, "{X}");
        };

        /**
         * Add all API paths to the duplicatePaths array
         * @private
         * @param {ASTNode<Property>} node The ASTNode to evaluate
         *
         * @returns {void}
         */
        const collectPaths = function(node) {
            if (pathEvaluator.isPath(node)) {
                const genericPath = replaceParamWithGeneric(node);
                duplicatePaths.push({
                    genericPath,
                    node,
                    path: pathEvaluator.getPathValue(node)
                });
            }
        };

        /**
         * Determine whether a node's API paths have been defined more than once
         *
         * @param {ASTNode<Property>} node The ASTNode to evaluate
         *
         * @returns {boolean} `true` if duplicates exists; otherwise, `false`
         */
        const isDuplicatePath = function(node) {
            const paths = filter(duplicatePaths, (comparatorObj) => {
                const genericPath = replaceParamWithGeneric(node);
                return includes(comparatorObj.genericPath, genericPath);
            });
            return paths.length > 1;
        };
        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            /**
             * Collect all paths while traversing down the AST
             *
             * @param {ASTNode<Property>} propertyNode A node to be evaluated
             *
             * @returns {void}
             */
            "Property[key.type=Literal]": (propertyNode) => {
                collectPaths(propertyNode);
            },

            /**
             * Compare paths against collection for duplicates while
             * traversing back up the AST
             *
             * @param {type} propertyNode A node with a paths to check for duplicates
             *
             * @returns {void}
             */
            "Property[key.type=Literal]:exit": (propertyNode) => {
                if (isDuplicatePath(propertyNode)) {
                    context.report({
                        node: propertyNode,
                        message: LintError.getContextMessage(this),
                        data: {
                            identifier: pathEvaluator.getPathValue(propertyNode)
                        }
                    });
                }
            }

        };
    }
};
