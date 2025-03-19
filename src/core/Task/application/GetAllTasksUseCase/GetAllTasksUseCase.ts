import { TaskValues } from "core/Task/domain/Task/types/TaskValues";
import { SuccessResult } from "../.././../shared/domain/Result/Result";
import { TaskRepository } from "../../domain/Task/TaskRepository";
import { TaskMapper } from "../TaskMapper/TaskMapper";

type Dependencies = {
  taskRepository: TaskRepository;
};

export const GetAllTasksUseCase = ({ taskRepository }: Dependencies) => {
  async function execute(): Promise<TaskValues[] | string[]> {
    const tasksDTO = await taskRepository.getAllTasks();

    const tasksResult = tasksDTO.map(TaskMapper.toDomain);

    const failedTasksResults = tasksResult.filter(
      (taskResult) => !taskResult.ok
    );

    if (failedTasksResults.length) {
      const errors = failedTasksResults.flatMap(
        (tasksResultWithError) => tasksResultWithError.errors
      );
      return Promise.reject(errors);
    }

    const validTasks = (tasksResult as SuccessResult<TaskValues>[]).map(
      (task) => task.value
    );
    return Promise.resolve(validTasks as TaskValues[]);
  }

  return {
    execute,
  };
};
