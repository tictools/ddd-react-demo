import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { ValueObject } from "../../../../shared/domain/valueObjects/types";
import { type OperationResult, Result } from "../../Result/Result";

function create(uuid: string = uuidv4()): OperationResult<string> {
  const isValid = isUUID(uuid);

  if (!isValid) return Result.fail(["value has invalid format"]);

  return Result.ok(uuid);
}

function isUUID(uuid: string) {
  return uuidValidate(uuid);
}

export const UUID: ValueObject<string> = {
  create,
};
