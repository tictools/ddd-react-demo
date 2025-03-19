import { TaskValues } from "core/Task/domain/Task/types/TaskValues";
import { useGetAllTasksCase } from "../../../api/Task/queries/useGetAllTasksCase";
import { Heading3 } from "../../atoms/Heading3/Heading3";
import { List } from "../../atoms/List/List";

import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./TaskList.module.css";

export const TaskList = () => {
  const { data: tasks, error, isFetching } = useGetAllTasksCase();

  if (isFetching) return <p className={styles["loading__text"]}>...fetching</p>;

  if (error) return <p className={styles["error-text"]}>{error.toString()}</p>;

  return (
    <div className={styles["container"]}>
      <Heading3>Tasks List</Heading3>
      <List<TaskValues>
        itemsList={tasks as TaskValues[]}
        renderTo={(task: TaskValues) => <TaskCard task={task} />}
      />
    </div>
  );
};
