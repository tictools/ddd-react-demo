import { describe, expect, it } from "vitest";
import { Result } from "../../../../shared/domain/Result/Result";
// import { Result } from "core/shared/Result";
import { Status } from "../Status";

describe("createStatus", () => {
  const ERRORS_LIST = [
    "Invalid status. Expected status: pending | in-progress | completed",
  ];

  it("should return success for valid status 'pending'", () => {
    const result = Status.create("pending");

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe("pending");
  });

  it("should return success for valid status 'in-progress'", () => {
    const result = Status.create("in-progress");

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe("in-progress");
  });

  it("should return success for valid status 'completed'", () => {
    const result = Status.create("completed");

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe("completed");
  });

  it("should return failure for invalid status 'invalid'", () => {
    const result = Status.create("invalid");

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(ERRORS_LIST);
  });
});
