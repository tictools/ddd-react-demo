import { describe, expect, it } from "vitest";
import {
  FailureResult,
  SuccessResult,
} from "../../../../shared/domain/Result/Result";
import { TaskDTO } from "../../../domain/Task/TaskDTO";
import { TaskValues } from "../../../domain/Task/TaskValues";
import { TaskMapper } from "../TaskMapper";

// vi.spyOn(Task, "create");

const validTaskDTO: TaskDTO = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Test Task",
  description: "A task for testing",
  status: "pending",
  "due-date": Date.now() + 86400000, // +1 day
  "created-at": Date.now(),
  "user-uuid": "9d274d54-c473-4964-8388-6b2e4cc385ff",
};

const validTaskValues: TaskValues = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Test Task",
  description: "A task for testing",
  status: "pending",
  dueDate: validTaskDTO["due-date"],
  createdAt: validTaskDTO["created-at"],
  userUUID: "9d274d54-c473-4964-8388-6b2e4cc385ff",
};

describe("TaskMapper", () => {
  it("should return errors if task creation fails", () => {
    const result = TaskMapper.toDomain(
      validTaskDTO
    ) as SuccessResult<TaskValues>;

    expect(result.ok).toBe(true);
    expect(result.value).toEqual(validTaskValues);
  });

  it("should return errors if task creation fails", () => {
    const invalidTaskDTO = {
      ...validTaskDTO,
      title: "",
    };

    const result = TaskMapper.toDomain({
      ...invalidTaskDTO,
      title: "",
    }) as FailureResult<string[]>;

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("title: Title cannot be empty");
  });

  it("should convert TaskValues to TaskDTO correctly", () => {
    const result = TaskMapper.toPersistence(validTaskValues);
    expect(result).toEqual(validTaskDTO);
  });
});
