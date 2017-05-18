"use strict";

const {
    trimEnd
} = require("lodash");

module.exports = {
    ".json": {
        preprocess: function(text, filename) {
            return [trimEnd(text, ':')];
        }
    }
};
