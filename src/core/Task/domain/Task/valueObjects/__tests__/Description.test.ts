import { describe, expect, it } from "vitest";
import { Result } from "../../../../../shared/domain/Result/Result";
// import { Result } from "core/shared/Result";
import { Description } from "../Description";

describe.only("createDescription", () => {
  const ERRORS_LIST = ["value cannot be empty"];

  it("should return success when description has content", () => {
    const description = "This is a valid description";
    const result = Description.create(description);

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe(description);
  });

  it("should return failure when description is empty", () => {
    const description = "";
    const result = Description.create(description);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(ERRORS_LIST);
  });

  it("should return failure when description is only whitespace", () => {
    const description = "   ";
    const result = Description.create(description);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(ERRORS_LIST);
  });
});
