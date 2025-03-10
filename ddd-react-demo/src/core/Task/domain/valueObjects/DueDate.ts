import {
  type OperationResult,
  Result,
} from "../../../shared/domain/Result/Result";
// import { type OperationResult, Result } from "core/shared/Result";
import type { ValueObject } from "../../../shared/domain/valueObjects/types";

function create(dueDateInMilliseconds: number): OperationResult<number> {
  const isValid = isInRange(dueDateInMilliseconds);

  if (!isValid)
    return Result.fail(["Due date cannot be before the creation date"]);

  return Result.ok(dueDateInMilliseconds);
}

function isInRange(dueDateInMilliseconds: number): boolean {
  const currentDateInMiliseconds = Date.now();

  return dueDateInMilliseconds >= currentDateInMiliseconds;
}

export const DueDate: ValueObject<number> = {
  create,
};
