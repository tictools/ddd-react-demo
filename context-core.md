## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the domain layer](#about-the-domain-layer)
  - [VO](#vo)
  - [Entity](#entity)
    - [Validation](#validation)
- [About the application layer](#about-the-application-layer)
  - [Implementations](#implementations)
    - [Option #1: Always recreate the entity before persisting (the one you propose)](#option-1-always-recreate-the-entity-before-persisting-the-one-you-propose)
      - [Process:](#process)
    - [Option #2: Do not recreate the entity and rely on mapping](#option-2-do-not-recreate-the-entity-and-rely-on-mapping)
      - [Process:](#process-1)
    - [Conclusion and Recommendation](#conclusion-and-recommendation)
  - [Use Cases](#use-cases)
    - [Design Principles](#design-principles)
    - [General Structure of a Use Case](#general-structure-of-a-use-case)
    - [Behavior with TanStack Query](#behavior-with-tanstack-query)
- [Advantages of this Approach](#advantages-of-this-approach)
- [About the infrastructure layer](#about-the-infrastructure-layer)
  - [TaskRepository](#taskrepository)
    - [`getAllTasks`](#getalltasks)
    - [`createTask`](#createtask)

## About the domain layer

- contains all the business logic of our domain
- only knows what is defined in this layer, does not fetch anything from upper layers
- we implement functional pattern instead of OOP whenever possible

### VO

- we define the entity properties as value objects
- each value object must validate itself. For example, we have the `dueDate` property. This value cannot be earlier than the date the note is created.

[Go to top](#table-of-contents)

### Entity

- the creation of a task implements the Result pattern (ok | fail), which must accept generic types to be reused as a shared element for all entities.
- parameters are received as a typed properties object (or props).

#### Validation

- props are validated all at once instead of separately. We ensure readability and scalability.
- we define the behavior of `Guard.againstNullOrUndefined` to validate the required props to create an entity instance and return:
  - if the validation was successful
  - if the validation was not successful
  - an array with the flattened errors (empty if successful, populated with detected errors if not)

[Go to top](#table-of-contents)

---

## About the application layer

- contains all use cases
- only knows itself and the domain layer, has no coupling with the infra layer
- use cases will depend on their interface to maintain dependency inversion. (receives the repository as a parameter when instantiated)
- use cases should not have dependencies on React or Zustand. Tanstack Query will be managed from the UI (app layer).

### Implementations

#### Option #1: Always recreate the entity before persisting (the one you propose)

This approach ensures that the data is valid at all times. This means that the use case receives validatable properties (but not the entity), and before sending them to the repository, it creates a Task instance to ensure data consistency.

##### Process:

- The use case receives taskProps (without id).
- Creates a Task entity to validate business rules.
- Transforms the entity to TaskToPersistence.
- Sends the DTO to the repository to save it.
- Receives the TaskFromPersistence and transforms it back to Task.

✅ Pros:

- Validation always goes through the entity before being sent to persistence.
- Prevents incorrect data from reaching infra.
- Reduces inconsistencies because the Task instance exists at all times.
- Better testability because validation is independent of the repository.

❌ Cons:

- May cause duplication of validation if the TaskRepository also validates some data.
- The entity is created twice (once here and once when retrieved from the DB).
- Depends on a good taskMapper.

#### Option #2: Do not recreate the entity and rely on mapping

Here the use case does not recreate the Task instance before passing it to the repository. It relies on the validation of the Value Objects and a taskMapper that ensures only valid data is sent.

##### Process:

- The use case receives taskProps.
- Maps it directly to TaskToPersistence.
- The repository validates and adds the UUID.
- The repository returns TaskFromPersistence.
- Transforms it to Task to ensure integrity before returning it.

✅ Pros:

- More efficient (the Task instance is not created twice).
- The repository remains responsible for the UUID.
- Simpler and more direct.

❌ Cons:

- If taskMapper does not validate well, incorrect data may reach the repository.
- It does not guarantee 100% that the domain controls the rules before persisting.

#### Conclusion and Recommendation

It depends on how much we want to ensure data consistency before sending it to the repository.
🔹 If we want maximum security → recreate the entity (Option 1).
🔹 If we want more efficiency and trust in the mapping → do direct mapping (Option 2).

Option 1 is chosen because it always guarantees solid validation and prevents sending incorrect data. Also, since the entity is immutable, creating it twice is not a major issue.

[Go to top](#table-of-contents)

### Use Cases

The `useCases` encapsulate the application logic for task management. They are designed to be compatible with `TanStack Query` (TQ), leveraging its native data and error handling.

#### Design Principles

- **Domain Entity**: All `useCases` recreate the domain entity to ensure data integrity.
- **Mapping**: All `useCases` implement their own mapper to send data to persistence and reintegrate it into the domain.
- **Promisification**: All `useCases` return `Promise<T>` to maintain consistency in their execution.
- **Error Handling**: `Promise.reject(errors)` is used instead of exceptions, as TQ already handles errors natively.
- **Simplicity**: Successful cases return values directly without additional wrappers like `OperationResult`.

#### General Structure of a Use Case

```ts
type Dependencies = {
  taskRepository: TaskRepository;
  uuidRepository: UUIDRepository;
};

export const CreateTaskUseCase = ({
  taskRepository,
  uuidRepository,
}: Dependencies) => {
  async function execute(
    taskProps: PartialTaskValues
  ): Promise<TaskValues | string[]> {
    const id = uuidRepository.generate();
    const createdAt = Date.now();

    const task = Task.create({ id, createdAt, ...taskProps });

    if (!task.ok) {
      return Promise.reject(task.errors);
    }

    const taskToPersistence = TaskMapper.toPersistence(task.value);

    const persistedTaskDTO = await taskRepository.createTask(taskToPersistence);

    const taskResult = TaskMapper.toDomain(persistedTaskDTO);

    if (!taskResult.ok) {
      return Promise.reject(taskResult.errors);
    }

    return Promise.resolve(taskResult.value);
  }

  return { execute };
};
```

#### Behavior with TanStack Query

- **`resolve(value)`** → Assigns `value` to `data`.
- **`reject(error)`** → Assigns `error` to `error`.
- **`error` can be a list of messages**, facilitating its management in the UI.

[Go to top](#table-of-contents)

## Advantages of this Approach

✅ **Natural integration with TQ** → Without unnecessary transformations.
✅ **Errors handled in a structured way** → We can display messages directly from `error`.
✅ **Simpler and maintainable code** → We eliminate `OperationResult`, which is no longer necessary.

This structure ensures clear, scalable, and efficient code!

[Go to top](#table-of-contents)

---

## About the infrastructure layer

- we implement OOP pattern to diversify the proposal with different paradigms.

### TaskRepository

As a first iteration, we will define the infra layer of the `Task` entity (formerly Note).

#### `getAllTasks`

- the concrete implementation uses fetch and targets `http://localhost:3000/tasks` via GET action to retrieve all tasks
- does not receive any parameters.

#### `createTask`

- the `createTask` action receives as a parameter the partial DTO already mapped to be sent to persistence (when we define the use cases, we will define the `toDomain` and `toPersistence` methods). The properties it receives are:
  - title: string;
  - description: string;
  - status: TaskStatus;
  - due-date: Date;
  - user-uuid: string;
- generates the task id using `uuidService`
- the concrete implementation uses fetch and targets `http://localhost:3000/tasks` via POST action to create a new task
- once the promise is resolved, it returns the DTO delivered by the backend service

[Go to top](#table-of-contents)

---

Given these premises, as developers we want to:

- define the `TaskRepository` interface in the domain layer, including all allowed actions
- define `JsonServerTaskRepository` in the infra layer with the actions to retrieve all tasks (`getAllTasks`) and create a new task (`createTask`)
- ensure the dependency inversion principle. The `createTask` action receives the partial DTO (without id) as an argument. The repository is coupled to the concrete implementation, receiving the `uuidService` through the constructor.
- correctly define the typing for each action. The types sent are always prefixed with `<entity>ToPersistence` and the types received are always prefixed with `<entity>FromPersistence`
- define tests for the actions, mocking the fetch behavior to avoid directly hitting the service

[Go to top](#table-of-contents)
