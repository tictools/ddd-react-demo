import { describe, expect, it } from "vitest";
import { Result } from "../../../../shared/domain/Result/Result";
import { TaskStatus } from "../../valueObjects/Status";
import { Task } from "../Task";

describe("Note.create", () => {
  const defaultProps = {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    title: "Valid Title",
    description: "Valid Description",
    status: "pending" as TaskStatus,
    dueDate: Date.now() + 1000,
    userUUID: "123e4567-e89b-12d3-a456-426614174000",
    createdAt: Date.now(),
  };

  it("should return success when all properties are valid", () => {
    const props = { ...defaultProps };

    const result = Task.create(props);

    expect(result.ok).toBe(true);
    expect(Result.isOk(result) && result.value.id).toBe(props.id);
    expect(Result.isOk(result) && result.value.title).toBe(props.title);
    expect(Result.isOk(result) && result.value.description).toBe(
      props.description
    );
    expect(Result.isOk(result) && result.value.status).toBe(props.status);
    expect(Result.isOk(result) && result.value.dueDate).toEqual(props.dueDate);
    expect(Result.isOk(result) && result.value.userUUID).toBe(props.userUUID);
  });

  it("should return failure when id is invalid", () => {
    const props = {
      ...defaultProps,
      id: "invalid-uuid",
    };

    const result = Task.create(props);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual(["id: Invalid UUID"]);
  });

  it("should return failure when title is empty", () => {
    const props = {
      ...defaultProps,
      title: "",
    };

    const result = Task.create(props);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([
      "title: value cannot be empty",
    ]);
  });

  it("should return failure when description is empty", () => {
    const props = {
      ...defaultProps,
      description: "",
    };

    const result = Task.create(props);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([
      "description: value cannot be empty",
    ]);
  });

  it("should return failure when status is invalid", () => {
    const props = {
      ...defaultProps,
      status: "INVALID_STATUS" as unknown as never,
    };

    const result = Task.create(props);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([
      "status: invalid value. Expected: pending | in-progress | completed",
    ]);
  });

  it("should return failure when dueDate is invalid", () => {
    const props = {
      ...defaultProps,
      dueDate: Date.now() - 1000,
    };

    const result = Task.create(props);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([
      "dueDate: value cannot be set before the creation date",
    ]);
  });

  it("should return failure when userUUID is invalid", () => {
    const props = {
      ...defaultProps,
      userUUID: "invalid-uuid",
    };

    const result = Task.create(props);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([
      "userUuid: Invalid UUID",
    ]);
  });

  it("should return failure when more than one prop is invalid", () => {
    const props = {
      ...defaultProps,
      title: "",
      userUUID: "invalid-uuid",
    };

    const result = Task.create(props);

    expect(result.ok).toBe(false);
    expect(!Result.isOk(result) && result.errors).toEqual([
      "title: value cannot be empty",
      "userUuid: Invalid UUID",
    ]);
  });
});
