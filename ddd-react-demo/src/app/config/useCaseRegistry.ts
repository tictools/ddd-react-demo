import { CreateTaskUseCase } from "../../core/Task/application/CreateTaskUseCase/CreateTaskUseCase";
import { GetAllTasksUseCase } from "../../core/Task/application/GetAllTasksUseCase/GetAllTasksUseCase";
import { repositoryRegistry } from "./repositoryRegistry";

const { taskRepository, uuidRepository } = repositoryRegistry;

export const useCaseRegistry = {
  createTaskUseCase: CreateTaskUseCase({ taskRepository, uuidRepository }),
  getAllTasksUseCase: GetAllTasksUseCase({ taskRepository }),
};
