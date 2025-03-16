import { type PartialTaskValues } from "../../../../../core/Task/domain/Task/TaskValues";
import { type TaskStatus } from "../../../../../core/Task/domain/valueObjects/Status";
import { useCreateTaskCase } from "../../../../api/Task/mutations/useCreateTaskCase";

export const useCreateTaskForm = () => {
  const { mutate: executeCreateTaskUseCase, error } = useCreateTaskCase();

  const handleCreateNewTaskUseCase = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const partialNewTask: PartialTaskValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as TaskStatus,
      dueDate: new Date(formData.get("dueDate") as string).getTime(),
      userUUID: "1ee9333c-4133-4b1b-871a-fd8dc223eb24", // Assuming userUUID is set elsewhere
    };
    console.log("🚀 ~ useCreateTaskForm ~ partialNewTask:", partialNewTask);

    executeCreateTaskUseCase(partialNewTask);

    (event.target as HTMLFormElement).reset();
  };

  return {
    handleCreateNewTaskUseCase,
    error,
  };
};
