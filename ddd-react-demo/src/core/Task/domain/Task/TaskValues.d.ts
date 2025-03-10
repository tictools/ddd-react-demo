export type TaskValues = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: number;
  createdAt: number;
  userUUID: string;
};

export type PartialTaskValues = Omit<TaskValues, "id" | "createdAt">;
