import { Guard } from "../../../shared/domain/Guard/Guard";
import {
  type OperationResult,
  Result,
} from "../../../shared/domain/Result/Result";
import { UUID } from "../../../shared/domain/entities/UUID/UUID";
// import { failure, Result, success } from "../../shared/result";
import { Description } from "../valueObjects/Description";
import { DueDate } from "../valueObjects/DueDate";
import { Status } from "../valueObjects/Status";
import { TimestampDate } from "../valueObjects/TimestampDate";
import { Title } from "../valueObjects/Title";
import { type TaskValues } from "./TaskValues.d";

// export type TaskValues = {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
//   dueDate: number;
//   createdAt: number;
//   userUUID: string;
// };

// export type PartialTaskValues = Omit<TaskValues, "id" | "createdAt">;

// TODO: think about createdAt (entity || VO?)

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
