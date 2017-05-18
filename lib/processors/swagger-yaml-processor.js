"use strict";

const yaml = require("yamljs");

function preProcessYaml(text, filename) {
    const json = yaml.load(filename);
    return [JSON.stringify(json)];
}

module.exports = {
    ".yml": {
        preprocess: preProcessYaml
    },
    ".yaml": {
        preprocess: preProcessYaml
    }
};
