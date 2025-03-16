import { UuidV4Repository } from "../../core/shared/infra/uuidV4Repository/uuidV4Repository";
import { JsonServerTaskRepository } from "../../core/Task/infra/JsonServerTaskRepository/JsonServerTaskRepository";

export const repositoryRegistry = {
  taskRepository: new JsonServerTaskRepository(),
  uuidRepository: new UuidV4Repository(),
};
