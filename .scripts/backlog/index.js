"use strict";

const semanticValidations = require("./semantic-validations");
const { assign, map, reduce, sortBy, truncate } = require("lodash");
const { bugs } = require("../../package");
// const fs = require("fs");

function addProps(defs) {
    const props = {
        "status": "Status: Review Needed",
        "type": "Type: Feature",
        "pluginElement": "ESLint: Rule"
    };
    const rules = map(defs, (def) => {
        return assign(def, props);
    });
    return sortRulesByName(rules);
}

function updateDefs() {
    const defs = JSON.stringify(addProps(semanticValidations), null, 2);
    return defs;
    // fs.writeFile(__dirname + "/semantic-validations.json", (err) => {
    //     console.error(err);
    // });
}

function sortRulesByName (defs) {
    return sortBy(defs, ["name"]);
}

function createNewIssueLink(def) {
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
}

function defsToTableMd(defs) {
    const rules = sortRulesByName(defs);
    let trs = map(rules, (def) => {
        const link = createNewIssueLink(def);
        // const {type, pluginElement, status} = def;
        // const labels = `* ${type}<br> * ${pluginElement}<br> * ${status}`;
        return `|  | ${link} | ${def.description} | ${def.status.replace("Status: ", "")} |`;
    });
    const header = [
        "| `options`        | Rule | Description| Status |",
        "|:----------------:|:-----|:-----------|:------:|\n"
    ];
    return header.join("\n") + trs.join("\n");
}

// const tableMd = defsToTableMd(semanticValidations);

const backlog = {
    ruleDefinitions: {
        toMarkdownTable: defsToTableMd,
        update: updateDefs
    }
};

// console.log(backlog.ruleDefinitions.toMarkdownTable(semanticValidations));

module.exports = backlog;
