
const yaml = require("yamljs");

/**
 * Load YAML files as Javascript and stringify
 *
 * @param {string} sourceCode     Source of YAML file
 * @param {string} filename Path to a YAML file
 *
 * @returns {array<string>} Array of JSON
 */
const preProcessYaml = function(sourceCode, filename) {
    const json = yaml.load(filename);
    return [JSON.stringify(json)];
};

module.exports = {
    ".yml": {

        preprocess: preProcessYaml
    },
    ".yaml": {
        preprocess: preProcessYaml
    }
};
