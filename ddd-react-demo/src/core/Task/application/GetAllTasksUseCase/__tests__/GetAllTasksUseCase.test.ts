import { describe, it, MockInstance, vi } from "vitest";
import type { TaskRepository } from "../../../domain/Task/TaskRepository";
import { TaskValues } from "../../../domain/Task/TaskValues";
import { TaskMapper } from "../../TaskMapper/TaskMapper";
import { GetAllTasksUseCase } from "../GetAllTasksUseCase";

const mockTaskRepository: TaskRepository = {
  getAllTasks: vi.fn(),
  createTask: vi.fn(),
};

const mockGetAllTasks =
  mockTaskRepository.getAllTasks as unknown as MockInstance;

vi.spyOn(TaskMapper, "toDomain");
const spyOnMapToDomain = TaskMapper.toDomain as unknown as MockInstance;

const currentDateInMilliseconds = 1672575336000;

const firstTaskValues: TaskValues = {
  title: "First Test Task",
  description: "First task for testing",
  status: "pending",
  dueDate: Date.now() + 86400000, // +1 day
  userUUID: "7654e321-e89b-12d3-a456-426614174000",
  id: "123e4567-e89b-12d3-a456-426614174000",
  createdAt: currentDateInMilliseconds,
};

const secondTaskValues: TaskValues = {
  title: "Second Test Task",
  description: "Second task for testing",
  status: "pending",
  dueDate: Date.now() + 86400000, // +1 day
  userUUID: "7654e321-e89b-12d3-a456-426614174000",
  id: "123e4567-e89b-12d3-a456-426614174000",
  createdAt: currentDateInMilliseconds,
};

const firstValidTaskDTO = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "First Test Task",
  description: "First task for testing",
  status: "pending",
  "due-date": currentDateInMilliseconds + 86400000, // +1 day
  "user-uuid": "7654e321-e89b-12d3-a456-426614174000",
  "created-at": currentDateInMilliseconds,
};

const secondValidTaskDTO = {
  id: "802333f1-a39e-4793-b620-1facbc658286",
  title: "Second Test Task",
  description: "Second task for testing",
  status: "pending",
  "due-date": currentDateInMilliseconds + 86400000, // +1 day
  "user-uuid": "7654e321-e89b-12d3-a456-426614174000",
  "created-at": currentDateInMilliseconds,
};

describe("GetAllTasksUseCase", () => {
  it("should retrieve tasks correctly", async () => {
    mockGetAllTasks.mockResolvedValue([firstValidTaskDTO, secondValidTaskDTO]);

    spyOnMapToDomain.mockReturnValueOnce({ ok: true, value: firstTaskValues });
    spyOnMapToDomain.mockReturnValueOnce({ ok: true, value: secondTaskValues });

    const getAllTasks = GetAllTasksUseCase({
      taskRepository: mockTaskRepository,
    });

    const tasks = await getAllTasks.execute();

    const [firstTask, secondTask] = tasks;

    expect(mockTaskRepository.getAllTasks).toHaveBeenCalledOnce();
    expect(TaskMapper.toDomain).toHaveBeenCalledTimes(2);

    expect(firstTask).toEqual(firstTaskValues);
    expect(secondTask).toEqual(secondTaskValues);
  });

  it("should fail if the repository returns an error", async () => {
    mockGetAllTasks.mockRejectedValueOnce(new Error("Repository error"));

    const getAllTasks = GetAllTasksUseCase({
      taskRepository: mockTaskRepository,
    });

    await expect(getAllTasks.execute()).rejects.toThrow("Repository error");
  });

  it("should fail if task creation returned by TaskMapper.toDomain is invalid", async () => {
    spyOnMapToDomain.mockReturnValueOnce({
      ok: false,
      errors: ["Title is required"],
    });

    spyOnMapToDomain.mockReturnValueOnce({
      ok: false,
      errors: ["Description is required"],
    });

    const getAllTasks = GetAllTasksUseCase({
      taskRepository: mockTaskRepository,
    });

    await expect(getAllTasks.execute()).rejects.toEqual([
      "Title is required",
      "Description is required",
    ]);
  });
});
