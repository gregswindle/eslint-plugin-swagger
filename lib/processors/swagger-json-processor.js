"use strict";

const {
    trimEnd
} = require("lodash");

module.exports = {
    ".json": {
        preprocess: function(text) {
            return [trimEnd(text, ":")];
        }
    }
};
