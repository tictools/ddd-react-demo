import { Guard } from "../../../shared/domain/Guard/Guard";
import {
  type OperationResult,
  Result,
} from "../../../shared/domain/Result/Result";
import { UUID } from "../../../shared/domain/entities/UUID/UUID";
// import { failure, Result, success } from "../../shared/result";
import { type TaskValues } from "./types/TaskValues";
import { Description } from "./valueObjects/Description";
import { DueDate } from "./valueObjects/DueDate";
import { Status } from "./valueObjects/Status";
import { TimestampDate } from "./valueObjects/TimestampDate";
import { Title } from "./valueObjects/Title";

function create(props: TaskValues): OperationResult<TaskValues, string[]> {
  const taskPropsResult = Guard.againstNullOrUndefined([
    { field: "id", result: UUID.create(props.id) },
    { field: "title", result: Title.create(props.title) },
    { field: "description", result: Description.create(props.description) },
    { field: "status", result: Status.create(props.status) },
    { field: "dueDate", result: DueDate.create(props.dueDate) },
    { field: "userUuid", result: UUID.create(props.userUUID) },
    { field: "createdAt", result: TimestampDate.create(props.dueDate) },
  ]);

  if (taskPropsResult.isFail) return Result.fail(taskPropsResult.errors);

  return Result.ok({ ...props });
}

export const Task = {
  create,
};
