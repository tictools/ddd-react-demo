import type { PartialTaskDTO, TaskDTO } from "./TaskDTO.d";

export interface TaskRepository {
  getAllTasks(): Promise<TaskDTO[]>;
  createTask(task: PartialTaskDTO): Promise<TaskDTO>;
}
