import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainHeading } from "../ui/mollecules/MainHeading/MainHeading";

import { TaskForm } from "../ui/mollecules/TaskForm/TaskForm";
import { TaskList } from "../ui/organisms/TaskList/TaskList";

import styles from "./App.module.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <div className={styles.content}>
          <MainHeading title="DDD + React" subtitle="TodoApp Demo" />
          <TaskForm />
          <TaskList />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
