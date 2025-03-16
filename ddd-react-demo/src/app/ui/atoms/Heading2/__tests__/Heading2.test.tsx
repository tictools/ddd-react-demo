import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Heading2 } from "../Heading2";

describe("Heading2", () => {
  const testText = "Test Secondary Heading";
  const EXPECTED_TAG_NAME = "H2";

  it("renders an h2 tag", async () => {
    const { findByText } = render(<Heading2>{testText}</Heading2>);

    const h2 = await findByText(testText);

    expect(h2.tagName).toBe(EXPECTED_TAG_NAME);
  });

  it("renders without crashing", async () => {
    const { findByText } = render(<Heading2>{testText}</Heading2>);

    await findByText("Test Secondary Heading");
  });

  it("displays the correct children", async () => {
    const { findByText } = render(<Heading2>{testText}</Heading2>);

    await findByText(testText);
  });
});
