import { describe, expect, it } from "vitest";
import { Result } from "../../../../shared/domain/Result/Result";
// import { Result } from "core/shared/Result";
import { Title } from "../Title";

describe("Title", () => {
  const ERRORS_LIST = ["Title cannot be empty"];

  it("should return success when title has content", () => {
    const result = Title.create("Valid Title");

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe("Valid Title");
  });

  it("should return failure when title is empty", () => {
    const result = Title.create("");

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(ERRORS_LIST);
  });

  it("should return failure when title is only whitespace", () => {
    const result = Title.create("   ");

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(ERRORS_LIST);
  });
});
