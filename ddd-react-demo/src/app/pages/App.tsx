import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainHeading } from "../ui/mollecules/MainHeading/MainHeading";

import { TaskForm } from "../ui/mollecules/TaskForm/TaskForm";
import { TaskList } from "../ui/organisms/TaskList/TaskList";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainHeading title="DDD + React" subtitle="TodoApp Demo" />
      <TaskForm />
      <TaskList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
