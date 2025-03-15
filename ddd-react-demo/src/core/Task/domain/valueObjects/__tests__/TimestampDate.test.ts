import { describe, expect, it } from "vitest";
import { Result } from "../../../../shared/domain/Result/Result";
import { TimestampDate } from "../TimestampDate";

describe("TimestampDate.create", () => {
  const ERRORS = {
    TYPE: "value must be a timestamp",
  };

  it("should return success when the value is a valid timestamp", () => {
    const validTimestamp = 1672531200000; // "2023-01-01"
    const result = TimestampDate.create(validTimestamp);

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe(validTimestamp);
  });

  it("should return failure when the value is not a number", () => {
    const invalidValue = "invalid";
    const result = TimestampDate.create(invalidValue as unknown as never);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([ERRORS.TYPE]);
  });

  it("should return failure when the value is null", () => {
    const invalidValue = null;
    const result = TimestampDate.create(invalidValue as unknown as never);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([ERRORS.TYPE]);
  });

  it("should return failure when the value is undefined", () => {
    const invalidValue = undefined;
    const result = TimestampDate.create(invalidValue as unknown as never);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([ERRORS.TYPE]);
  });

  it("should return failure when the value is an object", () => {
    const invalidValue = {};
    const result = TimestampDate.create(invalidValue as unknown as never);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([ERRORS.TYPE]);
  });
});
