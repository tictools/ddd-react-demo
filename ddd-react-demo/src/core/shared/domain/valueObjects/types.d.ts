import { type OperationResult } from "../Result/Result";

export interface ValueObject<T> {
  create(value: T): OperationResult<T>;
}
