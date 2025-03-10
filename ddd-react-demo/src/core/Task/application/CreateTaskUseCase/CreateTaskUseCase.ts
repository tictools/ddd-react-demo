import type {
  PartialTaskValues,
  TaskValues,
} from "../../../Task/domain/Task/TaskValues";
import type { UUIDRepository } from "../../../shared/domain/entities/UUID/UUIDRepository";
import { Task } from "../../domain/Task/Task";
import type { TaskRepository } from "../../domain/Task/TaskRepository";
import { TaskMapper } from "../TaskMapper/TaskMapper";

type Dependencies = {
  taskRepository: TaskRepository;
  uuidRepository: UUIDRepository;
};

export const CreateTaskUseCase = ({
  taskRepository,
  uuidRepository,
}: Dependencies) => {
  async function execute(
    taskProps: PartialTaskValues
  ): Promise<TaskValues | string[]> {
    const id = uuidRepository.generate();
    const createdAt = Date.now();

    const task = Task.create({ id, createdAt, ...taskProps });

    if (!task.ok) {
      return Promise.reject(task.errors);
    }

    const taskToPersistence = TaskMapper.toPersistence(task.value);

    const persistedTaskDTO = await taskRepository.createTask(taskToPersistence);

    const taskResult = TaskMapper.toDomain(persistedTaskDTO);

    if (!taskResult.ok) {
      return Promise.reject(taskResult.errors);
    }

    return Promise.resolve(taskResult.value);
  }

  return { execute };
};
