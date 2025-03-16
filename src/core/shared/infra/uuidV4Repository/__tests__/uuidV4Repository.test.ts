import { describe, expect, it } from "vitest";
import { UuidV4Repository } from "../uuidV4Repository";

describe("uuidV4Repository", () => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  it("should generate a valid UUID", () => {
    const uuidRepository = new UuidV4Repository();

    const uuid = uuidRepository.generate();

    expect(uuid).toMatch(uuidRegex);
  });
});
