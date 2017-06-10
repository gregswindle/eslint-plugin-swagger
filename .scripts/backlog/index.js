const semanticValidations = require("./semantic-validations");
const { assign, map, reduce, sortBy, truncate } = require("lodash");
const { bugs } = require("../../package");

/**
 * Sorts rules by their { name } property.
 * @private
 * @param {array<object>} defs Collection of definitions
 *
 * @returns {array<object>} Sorted collection of rules.
 */
const sortRulesByName = function(defs) {
    return sortBy(defs, ["name"]);
};

/**
 * Automatically add issue labels to new Issues
 * @private
 * @param {array<object>} defs Collection of definitions.
 *
 * @returns {array<object>} Sorted collection of rules.
 */
const addProps = function(defs) {
    const props = {
        "status": "Status: Review Needed",
        "type": "Type: Feature",
        "pluginElement": "ESLint: Rule"
    };
    const assignProps = function(def) {
        return assign(def, props);
    };
    const rules = map(defs, assignProps);
    return sortRulesByName(rules);
};

/**
 * Update all definitions.
 * @private
 * @returns {string} JSON of definitions.
 */
const updateDefs = function() {
    const defs = JSON.stringify(addProps(semanticValidations), null, 2);
    return defs;
};

/**
 * Generate a hyperlink with query string params for auto-populating a new GitHub issue.
 * @private
 * @param {object} def Definition
 *
 * @returns {string} Markdown link.
 */
const createNewIssueLink = function(def) {
    const desc = truncate(`${def.description}`, 35).toLowerCase();
    const title = escape(`feat(${def.name}): ${desc}`);
    const labels = [
        "ESLint: Rule",
        "Status: Review Needed",
        "Type: Feature"
    ];
    const qslabels = reduce(labels, (result, val) => {
        result = result + `&labels\[\]=${escape(val)}`;
        return result;
    }, "");
    return `[\`${def.name}\`](${bugs}/new?title=${title}${qslabels})`;
};

/**
 * Create a Markdown table of definitions.
 * @private
 * @param {array<object>} defs Collection of definitions.
 *
 * @returns {string} Markdown table.
 */
const defsToTableMd = function(defs) {
    const rules = sortRulesByName(defs);
    const trs = map(rules, (def) => {
        const link = createNewIssueLink(def);
        return `|  | ${link} | ${def.description} | ${def.status.replace("Status: ", "")} |`;
    });
    const header = [
        "| `options`        | Rule | Description| Status |",
        "|:----------------:|:-----|:-----------|:------:|\n"
    ];
    return header.join("\n") + trs.join("\n");
};

const backlog = {
    ruleDefinitions: {
        toMarkdownTable: defsToTableMd,
        update: updateDefs
    }
};

module.exports = backlog;
