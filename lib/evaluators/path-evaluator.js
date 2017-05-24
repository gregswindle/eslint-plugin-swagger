"use strict";

const { endsWith, startsWith } = require("lodash");

/**
 * Extract common API path evaluations into a reusable object
 */
class PathEvaluator {

   /**
    * Determine whether a Literal Property represents an HTTP path
    *
    * @param {ASTNode<Literal>} node The node to be evaluated
    *
    * @returns {boolean} `true` if the value starts with "`/`"; otherwise,  `false`
    */
    isPath(node) {
        return startsWith(node.key.value, "/");
    }

    /**
     * Detect parameters in an API path
     *
     * @param {string} resource A path resource or parameter
     *
     * @returns {boolean} `true` if parameter; otherwise, `false`
     */
    isParameter(resource) {
        return startsWith(resource, "{") && endsWith(resource, "}");
    }
}

module.exports = PathEvaluator;
