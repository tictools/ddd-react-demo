import {
  type OperationResult,
  Result,
} from "../../../../shared/domain/Result/Result";
// import { type OperationResult, Result } from "core/shared/Result";
import type { ValueObject } from "../../../../shared/domain/valueObjects/types";

function create(dueDateInMilliseconds: number): OperationResult<number> {
  const isValidType = isNumber(dueDateInMilliseconds);

  if (!isValidType) return Result.fail(["value must be a timestamp"]);

  return Result.ok(dueDateInMilliseconds);
}

function isNumber(dueDateInMilliseconds: unknown) {
  return typeof dueDateInMilliseconds === "number";
}

export const TimestampDate: ValueObject<number> = {
  create,
};
