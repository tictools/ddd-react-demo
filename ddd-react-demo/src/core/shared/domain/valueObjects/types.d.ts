import { type OperationResult } from "../../../shared/Result";

export interface ValueObject<T> {
  create(value: T): OperationResult<T>;
}
