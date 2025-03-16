import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import type { UUIDRepository } from "../../../../shared/domain/entities/UUID/UUIDRepository";
import type { TaskRepository } from "../../../domain/Task/TaskRepository";
import { PartialTaskValues, TaskValues } from "../../../domain/Task/TaskValues";
import { TaskMapper } from "../../TaskMapper/TaskMapper";
import { CreateTaskUseCase } from "../CreateTaskUseCase";

const mockUUIDRepository: UUIDRepository = {
  generate: vi.fn().mockReturnValue("123e4567-e89b-12d3-a456-426614174000"),
};

const mockTaskRepository: TaskRepository = {
  getAllTasks: vi.fn(),
  createTask: vi.fn(),
};

const mockCreateTask = mockTaskRepository.createTask as unknown as MockInstance;

vi.spyOn(TaskMapper, "toPersistence");
const spyOnMapToPersistence =
  TaskMapper.toPersistence as unknown as MockInstance;

vi.spyOn(TaskMapper, "toDomain");
const spyOnMapToDomain = TaskMapper.toDomain as unknown as MockInstance;

vi.spyOn(Date, "now");
const spyOnDateNow = Date.now as unknown as MockInstance;

const currentDateInMilliseconds = 1672575336000;

const partialTaskProps: PartialTaskValues = {
  title: "Test Task",
  description: "A task for testing",
  status: "pending",
  dueDate: Date.now() + 86400000, // +1 day
  userUUID: "7654e321-e89b-12d3-a456-426614174000",
};

const TaskProps: TaskValues = {
  ...partialTaskProps,
  id: "123e4567-e89b-12d3-a456-426614174000",
  createdAt: currentDateInMilliseconds,
};

const validTaskDTO = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Test Task",
  description: "A task for testing",
  status: "pending",
  "due-date": currentDateInMilliseconds + 86400000, // +1 day
  "user-uuid": "7654e321-e89b-12d3-a456-426614174000",
  "created-at": currentDateInMilliseconds,
};

describe("createTaskUseCase", () => {
  beforeEach(() => {
    spyOnDateNow.mockReturnValue(currentDateInMilliseconds);
    vi.clearAllMocks();
  });

  it("should create a task correctly", async () => {
    mockCreateTask.mockResolvedValue(validTaskDTO);
    spyOnMapToPersistence.mockReturnValue(validTaskDTO);
    spyOnMapToDomain.mockReturnValue({ ok: true, value: TaskProps });

    const createTask = CreateTaskUseCase({
      taskRepository: mockTaskRepository,
      uuidRepository: mockUUIDRepository,
    });

    const task = await createTask.execute(partialTaskProps);

    expect(task).toEqual(TaskProps);

    expect(mockUUIDRepository.generate).toHaveBeenCalled();

    expect(TaskMapper.toPersistence).toHaveBeenCalledWith(TaskProps);

    expect(mockTaskRepository.createTask).toHaveBeenCalledWith(validTaskDTO);

    expect(TaskMapper.toDomain).toHaveBeenCalledWith(validTaskDTO);
  });

  it("should fail if the repository returns an error", async () => {
    mockCreateTask.mockRejectedValueOnce(new Error("Repository error"));

    const createTask = CreateTaskUseCase({
      taskRepository: mockTaskRepository,
      uuidRepository: mockUUIDRepository,
    });

    await expect(createTask.execute(partialTaskProps)).rejects.toThrow(
      "Repository error"
    );
  });

  it.only("should fail if task creation returned by TaskMapper.toDomain is invalid", async () => {
    spyOnMapToDomain.mockReturnValueOnce({
      ok: false,
      errors: ["Title is required"],
    });

    const createTask = CreateTaskUseCase({
      taskRepository: mockTaskRepository,
      uuidRepository: mockUUIDRepository,
    });

    await expect(createTask.execute(partialTaskProps)).rejects.toEqual([
      "Title is required",
    ]);
  });
});
