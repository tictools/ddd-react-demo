import { TaskValues } from "core/Task/domain/Task/TaskValues";
import { useGetAllTasksCase } from "../../../api/Task/queries/useGetAllTasksCase";
import { DateText } from "../../atoms/DataText/DataText";
import { List } from "../../atoms/List/List";
import { Text } from "../../atoms/Text/Text";

export const TaskList = () => {
  const { data: tasks, error, isFetching } = useGetAllTasksCase();

  if (isFetching) return <p>...fetching</p>;

  if (error) return <p>{error.toString()}</p>;

  return (
    <List<TaskValues>
      itemsList={tasks as TaskValues[]}
      renderTo={(task) => (
        <li key={task.id}>
          <Text content={task.title} />
          <Text content={task.description} />
          <DateText
            timestamp={task.createdAt}
            dateFormatter="toLocaleDateString"
          />
          <DateText
            timestamp={task.dueDate}
            dateFormatter="toLocaleDateString"
          />
          <Text content={task.status} />
        </li>
      )}
    />
  );
};
