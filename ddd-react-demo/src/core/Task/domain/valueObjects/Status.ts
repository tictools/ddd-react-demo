import {
  type OperationResult,
  Result,
} from "../../../shared/domain/Result/Result";
// import { type OperationResult, Result } from "core/shared/Result";
import type { ValueObject } from "../../../shared/domain/valueObjects/types";

export type TaskStatus = "pending" | "in-progress" | "completed";

const taskStatusValues = ["pending", "in-progress", "completed"];

function create(status: string): OperationResult<TaskStatus> {
  const isValid = isValidStatus(status);

  if (!isValid)
    return Result.fail([
      `invalid value. Expected: ${taskStatusValues.join(" | ")}`,
    ]);

  return Result.ok(status as TaskStatus);
}

function isValidStatus(status: string): boolean {
  return taskStatusValues.includes(status);
}

export const Status: ValueObject<string> = {
  create,
};
