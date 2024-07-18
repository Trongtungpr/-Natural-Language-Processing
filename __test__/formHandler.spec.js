import {
  handleSubmit,
  analyzeTextByMeaningCloudAPI,
  updateUI,
} from "../src/client/js/formHandler";

describe("Form Handler Test Suite", () => {
  it("should have handleSubmit function defined", () => {
    expect(typeof handleSubmit).toBe("function");
  });

  it("should have analyzeTextByMeaningCloudAPI function defined", () => {
    expect(typeof analyzeTextByMeaningCloudAPI).toBe("function");
  });

  it("should have updateUI function defined", () => {
    expect(typeof updateUI).toBe("function");
  });
});
