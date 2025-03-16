import { TaskValues } from "core/Task/domain/Task/TaskValues";
import { useGetAllTasksCase } from "../../../api/Task/queries/useGetAllTasksCase";
import { DateText } from "../../atoms/DataText/DataText";
import { HeadingTertiary } from "../../atoms/HeadingTertiary/HeadingTertiary";
import { List } from "../../atoms/List/List";
// import { Text } from "../../atoms/Text/Text";

import styles from "./TaskList.module.css";

export const TaskList = () => {
  const { data: tasks, error, isFetching } = useGetAllTasksCase();

  if (isFetching) return <p className={styles["loading__text"]}>...fetching</p>;

  if (error) return <p className={styles["error-text"]}>{error.toString()}</p>;

  const getStatusClassName = (status: string) => {
    const baseClass = styles["task__status"];
    switch (status) {
      case "pending":
        return `${baseClass} ${styles["task__status--pending"]}`;
      case "inProgress":
        return `${baseClass} ${styles["task__status--in-progress"]}`;
      case "done":
        return `${baseClass} ${styles["task__status--done"]}`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={styles["container"]}>
      <HeadingTertiary>Tasks List</HeadingTertiary>
      <List<TaskValues>
        itemsList={tasks as TaskValues[]}
        renderTo={(task) => (
          <li key={task.id} className={styles["task__item"]}>
            <div className={styles["task__header"]}>
              <h4 className={styles["task__title"]}>{task.title}</h4>
            </div>
            <p className={styles["task__description"]}>{task.description}</p>
            <div className={styles["task__meta"]}>
              <div className={styles["task__meta-row"]}>
                <span className={styles["task__date"]}>
                  Created:{" "}
                  <DateText
                    timestamp={task.createdAt}
                    dateFormatter="toLocaleDateString"
                  />
                </span>
                <span className={styles["task__date"]}>
                  Due:{" "}
                  <DateText
                    timestamp={task.dueDate}
                    dateFormatter="toLocaleDateString"
                  />
                </span>
              </div>
              <span className={getStatusClassName(task.status)}>
                {task.status}
              </span>
            </div>
          </li>
        )}
      />
    </div>
  );
};
