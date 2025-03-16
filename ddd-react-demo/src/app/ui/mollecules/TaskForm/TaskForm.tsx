import { PartialTaskValues } from "../../../../core/Task/domain/Task/TaskValues";
import { type TaskStatus } from "../../../../core/Task/domain/valueObjects/Status";
import { useCreateTaskCase } from "../../../api/Task/mutations/useCreateTaskCase";
import { HeadingTertiary } from "../../atoms/HeadingTertiary/HeadingTertiary";

import styles from "./TaskForm.module.css";

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
    <div className={styles["container"]}>
      <HeadingTertiary>Create a new Task</HeadingTertiary>
      <form onSubmit={handleCreateNewTaskUseCase} className={styles["form"]}>
        <div className={styles["form-group"]}>
          <label className={styles["label"]} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className={styles["input"]}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["label"]} htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className={styles["textarea"]}
            required
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["label"]} htmlFor="status">
            Status
          </label>
          <select name="status" id="status" className={styles["select"]}>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["label"]} htmlFor="dueDate">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            className={styles["dateInput"]}
            required
          />
        </div>

        <button type="submit" className={styles["submitButton"]}>
          Create Task
        </button>
      </form>

      {error && (
        <ul className={styles["errorList"]}>
          {(error as unknown as string[]).map((errorMessage: string, index) => (
            <li key={index} className={styles["errorItem"]}>
              {errorMessage}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
