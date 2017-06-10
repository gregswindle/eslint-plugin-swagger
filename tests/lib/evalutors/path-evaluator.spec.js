const { expect } = require("chai");
const PathEvaluator = require("../../../lib/evaluators/path-evaluator");

describe("evaluators are \"helper\" objects that provide common evaluation methods.", () => {

    //--------------------------------------------------------------------------
    // PathEvaluator
    //--------------------------------------------------------------------------
    describe("PathEvaluator inspects Property[key.type=Literal] ASTNodes, and", () => {

        const pathEvaluator = new PathEvaluator();
        const mockAstLiteralNode = {
            key: {
                value: "/pets/{id}/findByBreed"
            }
        };

        it("returns the path's value", () => {
            expect(pathEvaluator.getPathValue(mockAstLiteralNode)).to.equal("/pets/{id}/findByBreed");
        });

        it("determines whether the node is a path", () => {

            expect(pathEvaluator.isPath(mockAstLiteralNode)).to.equal(true);

            mockAstLiteralNode.key.value = "paths";

            expect(pathEvaluator.isPath(mockAstLiteralNode)).to.equal(false);
        });

        it("determines whether a resource in an API path is a parameter", () => {
            expect(pathEvaluator.isParameter("{id}")).to.equal(true);
            expect(pathEvaluator.isParameter("id")).to.equal(false);
        });

    });
});
