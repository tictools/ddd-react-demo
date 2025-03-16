import { TaskValues } from "../../../../core/Task/domain/Task/TaskValues";
import { classNames } from "../../../services/CSSService/CSSService";
import { DateText } from "../../atoms/DataText/DataText";
import { Heading4 } from "../../atoms/Heading4/Heading4";
import { SpanText } from "../../atoms/SpanText/SpanText";
import { Text } from "../../atoms/Text/Text";

import styles from "./TaskCard.module.css";

type TaskCardProps = {
  task: TaskValues;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const getStatusClassName = (status: string) =>
    classNames(styles["task__status"], {
      [styles["task__status--pending"]]: status === "pending",
      [styles["task__status--in-progress"]]: status === "in-progress",
      [styles["task__status--done"]]: status === "done",
    });

  return (
    <li key={task.id} className={styles["task__item"]}>
      <div className={styles["task__header"]}>
        <Heading4 customClassName={styles["task__title"]}>
          {task.title}
        </Heading4>
        <span className={getStatusClassName(task.status)}></span>
      </div>
      <Text
        customClassName={styles["task__description"]}
        content={task.description}
      />
      <div className={styles["task__meta"]}>
        <div className={styles["task__meta-row"]}>
          <SpanText customClassName={styles["task__date"]}>
            Created:{" "}
            <DateText
              timestamp={task.createdAt}
              dateFormatter="toLocaleDateString"
            />
          </SpanText>
          <SpanText customClassName={styles["task__date"]}>
            Due:{" "}
            <DateText
              timestamp={task.dueDate}
              dateFormatter="toLocaleDateString"
            />
          </SpanText>
        </div>
      </div>
    </li>
  );
};
