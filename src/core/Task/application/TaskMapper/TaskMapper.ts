import { OperationResult } from "../../../shared/domain/Result/Result";
import { Task } from "../../domain/Task/Task";
import { type TaskDTO } from "../../domain/Task/types/TaskDTO";
import { type TaskValues } from "../../domain/Task/types/TaskValues";

const toDomain = (dto: TaskDTO): OperationResult<TaskValues> =>
  Task.create({
    id: dto.id,
    title: dto.title,
    description: dto.description,
    status: dto.status,
    dueDate: dto["due-date"],
    createdAt: dto["created-at"],
    userUUID: dto["user-uuid"],
  });

const toPersistence = (task: TaskValues) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  "due-date": task.dueDate,
  "created-at": task.createdAt,
  "user-uuid": task.userUUID,
});

export const TaskMapper = {
  toDomain,
  toPersistence,
};
