import { checkEmptyTxt } from "../src/client/js/nameChecker";

describe("Name Checker Test Suite", () => {
  it("should have checkEmptyTxt function defined", () => {
    expect(typeof checkEmptyTxt).toBe("function");
  });

  it("should return 0 for non-empty text", () => {
    expect(checkEmptyTxt("some random text")).toBe(0);
  });

  it("should return 1 for empty text", () => {
    expect(checkEmptyTxt("")).toBe(1);
  });
});