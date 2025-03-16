import { TaskDTO } from "../../domain/Task/TaskDTO";
import { TaskRepository } from "../../domain/Task/TaskRepository";

export class JsonServerTaskRepository implements TaskRepository {
  private API_URL = "http://localhost:3000/tasks";
  private JSON_HEADERS = { "Content-Type": "application/json" };

  async getAllTasks(): Promise<TaskDTO[]> {
    const response = await fetch(this.API_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tasks. Status: ${response.status} ${response.statusText}`
      );
    }

    const tasks = await response.json();
    return tasks as TaskDTO[];
  }

  async createTask(task: TaskDTO): Promise<TaskDTO> {
    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: this.JSON_HEADERS,
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create task. Status: ${response.status} ${response.statusText}`
      );
    }

    const newTask = await response.json();
    return newTask as TaskDTO;
  }
}
