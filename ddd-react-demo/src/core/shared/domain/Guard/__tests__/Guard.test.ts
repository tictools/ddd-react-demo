import { describe, expect, it } from "vitest";
import { Result } from "../../Result/Result";
import { Guard } from "../Guard";

describe("Guard", () => {
  describe("againstNullOrUndefined", () => {
    it("should return success when all checks pass", () => {
      const checks = [
        { field: "name", result: Result.ok("John Doe") },
        { field: "age", result: Result.ok(30) },
      ];

      const result = Guard.againstNullOrUndefined(checks);

      expect(result.isSuccess).toBe(true);
      expect(result.isFail).toBe(false);
      expect(result.errors).toHaveLength(0);
    });

    it("should return failure when any check fails", () => {
      const checks = [
        { field: "name", result: Result.ok("John Doe") },
        {
          field: "age",
          result: Result.fail(["Age cannot be null or undefined"]),
        },
      ];

      const result = Guard.againstNullOrUndefined(checks);

      expect(result.isSuccess).toBe(false);
      expect(result.isFail).toBe(true);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toBe("age: Age cannot be null or undefined");
    });

    it("should return multiple errors when multiple checks fail", () => {
      const checks = [
        {
          field: "name",
          result: Result.fail(["Name cannot be null or undefined"]),
        },
        {
          field: "age",
          result: Result.fail(["Age cannot be null or undefined"]),
        },
      ];

      const result = Guard.againstNullOrUndefined(checks);

      expect(result.isSuccess).toBe(false);
      expect(result.isFail).toBe(true);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain("name: Name cannot be null or undefined");
      expect(result.errors).toContain("age: Age cannot be null or undefined");
    });
  });
});
