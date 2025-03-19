import { type TaskStatus } from "../valueObjects/Status";

export type TaskDTO = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  "due-date": number;
  "created-at": number;
  "user-uuid": string;
};

export type PartialTaskDTO = Omit<TaskDTO, "id">;
