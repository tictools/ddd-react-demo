import { describe, expect, it } from "vitest";
import { Result } from "../../../../shared/domain/Result/Result";
import { Guard } from "../Guard";

describe("Guard", () => {
  describe("againstNullOrUndefined", () => {
    it("should return success when all checks pass", () => {
      const checks = [{ field: "timestamp", result: Result.ok(1672531200000) }];

      const result = Guard.againstNullOrUndefined(checks);

      expect(result.isSuccess).toBe(true);
      expect(result.isFail).toBe(false);
      expect(result.errors).toHaveLength(0);
    });

    it("should return failure when the check fails", () => {
      const checks = [
        {
          field: "timestamp",
          result: Result.fail(["Timestamp must be a number"]),
        },
      ];

      const result = Guard.againstNullOrUndefined(checks);

      expect(result.isSuccess).toBe(false);
      expect(result.isFail).toBe(true);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toBe("timestamp: Timestamp must be a number");
    });

    it("should return multiple errors when multiple checks fail", () => {
      const checks = [
        {
          field: "timestamp",
          result: Result.fail(["Timestamp must be a number"]),
        },
        {
          field: "date",
          result: Result.fail(["Date cannot be null or undefined"]),
        },
      ];

      const result = Guard.againstNullOrUndefined(checks);

      expect(result.isSuccess).toBe(false);
      expect(result.isFail).toBe(true);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain("timestamp: Timestamp must be a number");
      expect(result.errors).toContain("date: Date cannot be null or undefined");
    });
  });
});
