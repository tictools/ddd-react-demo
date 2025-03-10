import { type TaskStatus } from "../valueObjects/Status";

export type TaskDTO = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  "created-at": number;
  "due-date": number;
  "user-uuid": string;
};

export type PartialTaskDTO = Omit<TaskDTO, "id">;
