import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from "vitest";
import { Result } from "../../../../../shared/domain/Result/Result";
import { DueDate } from "../DueDate";

describe("DueDate.create", () => {
  const ERRORS = {
    RANGE: "value cannot be set before the creation date",
    TYPE: "value must be a timestamp",
  };

  const VALID_CURRENT_DATE_IN_MILLISECONDS = 1672531200000; // "2023-01-01"
  const INVALID_CURRENT_DATE_IN_MILLISECONDS = 1672704000000; // "2023-01-03"

  let spyOnDateNow: MockInstance<() => number>;

  beforeAll(() => {
    spyOnDateNow = vi.spyOn(Date, "now");
  });

  afterEach(() => {
    spyOnDateNow.mockReset();
  });

  it("should return success when due date is after creation date", () => {
    spyOnDateNow.mockReturnValueOnce(VALID_CURRENT_DATE_IN_MILLISECONDS);
    const dueDate = 1672661736000; // "2023-01-02"

    const result = DueDate.create(dueDate);

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe(dueDate);
  });

  it("should return success when due date is the same as creation date", () => {
    spyOnDateNow.mockReturnValueOnce(VALID_CURRENT_DATE_IN_MILLISECONDS);
    const dueDate = VALID_CURRENT_DATE_IN_MILLISECONDS; // "2023-01-01"

    const result = DueDate.create(dueDate);

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value).toBe(dueDate);
  });

  it("should return failure when due date is before creation date", () => {
    spyOnDateNow.mockReturnValueOnce(INVALID_CURRENT_DATE_IN_MILLISECONDS);
    const dueDate = 1672575336000; // "2023-01-01"

    const result = DueDate.create(dueDate);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([ERRORS.RANGE]);
  });

  it("should return multiple errors when due date is not a number and before the creation date", () => {
    spyOnDateNow.mockReturnValueOnce(INVALID_CURRENT_DATE_IN_MILLISECONDS);
    const invalidDueDate = "invalid";
    const result = DueDate.create(invalidDueDate as unknown as never);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([
      ERRORS.TYPE,
      ERRORS.RANGE,
    ]);
  });
});
