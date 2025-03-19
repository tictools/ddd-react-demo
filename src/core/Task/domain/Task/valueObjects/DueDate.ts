import {
  type OperationResult,
  Result,
} from "../../../../shared/domain/Result/Result";
// import { type OperationResult, Result } from "core/shared/Result";
import type { ValueObject } from "../../../../shared/domain/valueObjects/types";

//TODO :: fix test
const ERROR = {
  RANGE: "value cannot be set before the creation date",
  TYPE: "value must be a timestamp",
};

function create(dueDateInMilliseconds: number): OperationResult<number> {
  const errors: string[] = [];

  const isValidRange = isInRange(dueDateInMilliseconds);
  const isValidType = isNumber(dueDateInMilliseconds);

  if (!isValidType) {
    errors.push(ERROR.TYPE);
  }

  if (!isValidRange) {
    errors.push(ERROR.RANGE);
  }

  if (errors.length !== 0) {
    return Result.fail<string>(errors);
  }

  return Result.ok(dueDateInMilliseconds);
}

function isInRange(dueDateInMilliseconds: number): boolean {
  const currentDateInMiliseconds = Date.now();

  return dueDateInMilliseconds >= currentDateInMiliseconds;
}

function isNumber(dueDateInMilliseconds: unknown) {
  return typeof dueDateInMilliseconds === "number";
}

export const DueDate: ValueObject<number> = {
  create,
};
