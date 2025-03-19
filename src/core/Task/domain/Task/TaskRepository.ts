import type { PartialTaskDTO, TaskDTO } from "./types/TaskDTO";

export interface TaskRepository {
  getAllTasks(): Promise<TaskDTO[]>;
  createTask(task: PartialTaskDTO): Promise<TaskDTO>;
}
