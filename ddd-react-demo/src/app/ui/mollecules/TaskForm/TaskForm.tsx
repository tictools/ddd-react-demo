import { PartialTaskValues } from "../../../../core/Task/domain/Task/TaskValues";
import { type TaskStatus } from "../../../../core/Task/domain/valueObjects/Status";
import { useCreateTaskCase } from "../../../api/Task/mutations/useCreateTaskCase";
import { HeadingTertiary } from "../../atoms/HeadingTertiary/HeadingTertiary";

export const TaskForm = () => {
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

    executeCreateTaskUseCase(partialNewTask);

    (event.target as HTMLFormElement).reset();
  };

  return (
    <>
      <div>
        <HeadingTertiary>Create a new Task</HeadingTertiary>
        <form
          onSubmit={handleCreateNewTaskUseCase}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>
            Title
            <input type="text" name="title" id="title" required />
          </label>
          <label>
            Description
            <textarea name="description" id="description" required />
          </label>
          <label>
            Status
            <select name="status" id="status">
              <option value="pending">pending</option>
              <option value="inProgress">in progress</option>
              <option value="done">done</option>
            </select>
            <input type="date" name="dueDate" id="dueDate" required />
            <input type="submit" value="Create task" />
          </label>
        </form>
      </div>
      {error && (
        <ul>
          {(error as unknown as string[]).map((errorMessage: string) => (
            <li>{errorMessage}</li>
          ))}
        </ul>
      )}
    </>
  );
};
