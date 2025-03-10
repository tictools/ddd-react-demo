import { OperationResult, Result } from "../Result/Result";

type GuardValues = {
  isSuccess: boolean;
  isFail: boolean;
  errors: string[];
};
type GuardCheck<T> = { field: keyof T; result: OperationResult<T[keyof T]> };
type GuardChecks<T> = GuardCheck<T>[];

function againstNullOrUndefined<T>(checks: GuardChecks<T>): GuardValues {
  const errors: string[] = [];
  const validatedProps = {} as T;

  for (const { field, result } of checks) {
    if (!Result.isOk(result)) {
      errors.push(`${String(field)}: ${result.errors}`);
    } else {
      validatedProps[field] = result.value;
    }
  }

  return {
    isSuccess: errors.length === 0,
    isFail: errors.length !== 0,
    errors,
  };
}

export const Guard = {
  againstNullOrUndefined,
};
