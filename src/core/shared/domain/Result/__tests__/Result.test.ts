import { describe, expect, it } from "vitest";
import { Result, type OperationResult } from "../Result";

describe("Result", () => {
  it("should return success result", () => {
    const result: OperationResult<string> = Result.ok("Success");

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe("Success");
  });

  it("should return failure result", () => {
    const result: OperationResult<never, string[]> = Result.fail(["Error"]);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(["Error"]);
  });

  it("isOk should return true for success result", () => {
    const result: OperationResult<string> = Result.ok("Success");
    expect(Result.isOk(result)).toBe(true);
  });

  it.skip("isOk should return false for failure result", () => {
    const result: OperationResult<never, string[]> = Result.fail(["Error"]);
    expect(Result.isOk(result)).toBe(false);
  });
});
