## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the directory structure](#about-the-directory-structure)
- [About the use case and repository registry](#about-the-use-case-and-repository-registry)
- [About the connection with tanstack-query](#about-the-connection-with-tanstack-query)
  - [Example with a query (`useQuery`)](#example-with-a-query-usequery)
  - [Example with a mutation (`useMutation`)](#example-with-a-mutation-usemutation)

## About the directory structure

Here is a structure that fits your architecture and allows scalable integration with `tanstack-query` and `zustand`:

```
/app
 ├── /config        # Global configuration (e.g., dependency registry)
 ├── /state         # Zustand stores
 ├── /api           # tanstack-query hooks that connect `tanstack-query` with use cases.
 ├── /ui            # Components organized following Atomic Design
 │   ├── /atoms
 │   ├── /molecules
 │   ├── /organisms
 │   ├── /systems
 ├── /pages         # Pages and main layout
 ├── /routes        # Application route definitions
 ├── /hooks         # Custom React hooks
 ├── /providers     # Context providers (QueryClientProvider, etc.)
 ├── /utils         # Utility functions
 ├── /types         # Shared type definitions
```

**Benefits**:

- ✅ Maintains a clear separation of responsibilities.
- ✅ Scalable as the project grows.
- ✅ Allows easy reuse of queries, mutations, and state.
- ✅ Facilitates adaptation if a more sophisticated dependency injection mechanism is introduced later.

[Go to top](#table-of-contents)

## About the use case and repository registry

TODO

[Go to top](#table-of-contents)

## About the connection with tanstack-query

In tanstack-query, we can define a hook to encapsulate data management.

For example, to retrieve all tasks:

```ts
import { useQuery } from "@tanstack/react-query";
import { useCaseRegistry } from "../config/useCaseRegistry";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: useCaseRegistry.getAllTasksUseCase.execute,
  });
};
```

With this `tanstack-query` structure:

- manages caching and data synchronization automatically.
- handles `Promise.resolve()` and `Promise.reject()` natively for both queries and mutations. This allows us to leverage our implementation without any extra adaptation.

### Example with a query (`useQuery`)

```ts
import { useQuery } from "@tanstack/react-query";
import { GetAllTasksUseCase } from "core/Task/application/GetAllTasksUseCase";
import { taskRepository } from "core/Task/infrastructure/TaskRepository";

const getAllTasks = GetAllTasksUseCase({ taskRepository });

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks.execute(), // ✅ Works directly
    retry: false, // ❌ Do not retry in case of validation error
  });
};
```

- ✅ If `execute()` resolves correctly, `data` will have the tasks.
- ✅ If `execute()` rejects, `error` will capture the errors.

[Go to top](#table-of-contents)

### Example with a mutation (`useMutation`)

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskUseCase } from "core/Task/application/CreateTaskUseCase";
import { taskRepository } from "core/Task/infrastructure/TaskRepository";

const createTask = CreateTaskUseCase({ taskRepository });

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask) => createTask.execute(newTask), // ✅ Returns a Promise
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // 🔄 Refresh the task list
    },
    onError: (error) => {
      console.error("Error creating task:", error); // ❌ Handle errors
    },
  });
};
```

- ✅ If `execute()` resolves, `onSuccess` runs and we can refresh the list.
- ✅ If `execute()` rejects, `onError` correctly captures the error.

[Go to top](#table-of-contents)
