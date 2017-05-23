"use strict";

module.exports = {
    ".json": {
        preprocess(text) {
            return [JSON.stringify(text)];
        }
    }
};
