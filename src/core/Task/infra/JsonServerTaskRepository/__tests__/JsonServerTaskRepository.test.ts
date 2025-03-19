import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type TaskDTO } from "../../../domain/Task/types/TaskDTO";
import { JsonServerTaskRepository } from "../JsonServerTaskRepository";

describe("JsonServerTaskRepository", () => {
  let repository: JsonServerTaskRepository;
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  const mockTasks: TaskDTO[] = [
    {
      id: "task13e1-7a38-467e-ada8-dd27e7a811a8",
      title: "Task 1",
      description: "Description 1",
      status: "pending",
      "due-date": Date.now(),
      "created-at": Date.now(),
      "user-uuid": "user1f22-e622-4b06-9983-03bd19adf978",
    },
    {
      id: "task2baa-997e-48ab-af92-0f4cbcba812a",
      title: "Task 2",
      description: "Description 2",
      status: "completed",
      "due-date": Date.now(),
      "created-at": Date.now(),
      "user-uuid": "user2bc5-c733-478d-9038-85be71c465c7",
    },
  ];

  const createdTask: TaskDTO = {
    id: "task37c84-327e-4fbc-900a-1b014a144498",
    title: "New Task",
    description: "New Description",
    status: "pending",
    "due-date": Date.now(),
    "created-at": Date.now(),
    "user-uuid": "task3045c-fc31-4963-a65a-2b4fa8d375fa",
  };

  beforeEach(() => {
    repository = new JsonServerTaskRepository();
    fetchSpy = vi.spyOn(globalThis, "fetch") as unknown as ReturnType<
      typeof vi.spyOn
    >;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getAllTasks", () => {
    it("should fetch all tasks successfully", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      } as Response);

      const tasks = await repository.getAllTasks();

      expect(tasks).toEqual(mockTasks);
      expect(fetchSpy).toHaveBeenCalledWith("http://localhost:3000/tasks");
    });

    it("should throw an error if fetching tasks fails", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(repository.getAllTasks()).rejects.toThrow(
        "Failed to fetch tasks"
      );
    });
  });

  describe("createTask", () => {
    const newTask: TaskDTO = {
      ...createdTask,
    };

    it("should create a task successfully", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: true,
        json: async () => createdTask,
      } as Response);

      const result = await repository.createTask(newTask);

      expect(result).toEqual(createdTask);
      expect(fetchSpy).toHaveBeenCalledWith("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createdTask),
      });
    });

    it("should throw an error if creating a task fails", async () => {
      fetchSpy.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(repository.createTask(newTask)).rejects.toThrow(
        "Failed to create task"
      );
    });
  });
});
