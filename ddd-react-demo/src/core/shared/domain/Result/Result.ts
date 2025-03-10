interface IResult {
  ok: <T>(value: T) => OperationResult<T>;
  fail: <E>(errors: E[]) => OperationResult<never, E[]>;
  isOk: <T>(result: OperationResult<T>) => result is SuccessResult<T>;
}

export type SuccessResult<T> = { ok: true; value: T };
export type FailureResult<E = string[]> = { ok: false; errors: E };

export type OperationResult<T, E = string[]> =
  | SuccessResult<T>
  | FailureResult<E>;

function ok<T>(value: T): OperationResult<T> {
  return {
    ok: true,
    value,
  };
}

function fail<E>(errors: E[]): OperationResult<never, E[]> {
  return {
    ok: false,
    errors,
  };
}

function isOk<T>(result: OperationResult<T>): result is SuccessResult<T> {
  return result.ok;
}

export const Result: IResult = {
  ok,
  fail,
  isOk,
};
