import { Heading3 } from "../../atoms/Heading3/Heading3";
import { useCreateTaskForm } from "./hooks/useCreateTaskForm";

import styles from "./TaskForm.module.css";

export const TaskForm = () => {
  const { handleCreateNewTaskUseCase, error } = useCreateTaskForm();

  return (
    <div className={styles["container"]}>
      <Heading3>Create a new Task</Heading3>
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
            <option value="in-progress">In Progress</option>
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
