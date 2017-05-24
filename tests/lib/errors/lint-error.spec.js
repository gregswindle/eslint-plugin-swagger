"use strict";

const { expect } = require("chai");
const LintError = require("../../../lib/errors/lint-error");

describe("LintError is a custom Error object that", () => {

    const ruleMock = {
        meta: {
            docs: {
                category: "Best Practices",
                description: "a mock rule for this spec"
            }
        }
    };

    it("extends the Error object", () => {
        const lintError = new LintError("Oops! Not good...");
        expect(lintError.name).to.equal("LintError");
        expect(lintError.message).to.equal("Oops! Not good...");
    });

    it("provides a standard error message for context reports", () => {
        expect(LintError.getContextMessage(ruleMock)).to.equal("Best Practices: a mock rule for this spec.");
    });

});
