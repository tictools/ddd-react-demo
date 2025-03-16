import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Heading4 } from "../Heading4";

describe("Heading4", () => {
  const testText = "Test Tertiary Heading";
  const EXPECTED_TAG_NAME = "H4";

  it("renders an h3 tag", async () => {
    const { findByText } = render(<Heading4>{testText}</Heading4>);

    const h3 = await findByText(testText);

    expect(h3.tagName).toBe(EXPECTED_TAG_NAME);
  });

  it("renders without crashing", async () => {
    const { findByText } = render(<Heading4>{testText}</Heading4>);

    await findByText(testText);
  });

  it("displays the correct children", async () => {
    const { findByText } = render(<Heading4>{testText}</Heading4>);

    await findByText(testText);
  });
});
