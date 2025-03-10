import {
  type OperationResult,
  Result,
} from "../../../shared/domain/Result/Result";
// import { type OperationResult, Result } from "core/shared/Result";
import type { ValueObject } from "../../../shared/domain/valueObjects/types";

function create(description: string): OperationResult<string> {
  const isValid = hasContent(description);

  if (!isValid) return Result.fail(["Description cannot be empty"]);

  return Result.ok(description);
}

function hasContent(description: string) {
  return description.trim().length > 0;
}

export const Description: ValueObject<string> = {
  create,
};
