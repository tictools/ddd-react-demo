import { v4 as uuidv4 } from "uuid";
import { UUIDRepository } from "../../domain/entities/UUID/UUIDRepository";

export class UuidV4Repository implements UUIDRepository {
  generate() {
    return uuidv4();
  }
}
