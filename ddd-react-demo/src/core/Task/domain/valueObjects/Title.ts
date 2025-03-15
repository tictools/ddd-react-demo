import {
  type OperationResult,
  Result,
} from "../../../shared/domain/Result/Result";
// import { type OperationResult, Result } from "core/shared/Result";
import type { ValueObject } from "../../../shared/domain/valueObjects/types";

function create(title: string): OperationResult<string> {
  const isValid = hasContent(title);

  if (!isValid) return Result.fail(["value cannot be empty"]);

  return Result.ok(title);
}

function hasContent(title: string) {
  return title.trim().length > 0;
}

export const Title: ValueObject<string> = {
  create,
};
