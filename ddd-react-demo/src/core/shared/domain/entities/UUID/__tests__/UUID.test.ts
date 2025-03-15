import { v4 as uuidv4 } from "uuid";
import { describe, expect, it } from "vitest";
import { Result } from "../../../../../shared/domain/Result/Result";
import { UUID } from "../UUID";

describe("UUID ValueObject", () => {
  const ERRORS_LIST = ["value has invalid format"];

  it("should validate a given valid UUID", () => {
    const validUUID = uuidv4();

    const result = UUID.create(validUUID);
    console.log("🚀 ~ it ~ result:", result);

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe(validUUID);
  });

  it("should fail for an invalid UUID", () => {
    const invalidUUID = "invalid-uuid";

    const result = UUID.create(invalidUUID);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(ERRORS_LIST);
  });
});
