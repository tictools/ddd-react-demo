import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Heading1 } from "../Heading1";

describe("HeadingPrimary", () => {
  const testText = "Test Primary Heading";
  const EXPECTED_TAG_NAME = "H1";

  it("renders an h1 tag", async () => {
    const { findByText } = render(<Heading1>{testText}</Heading1>);

    const h1 = await findByText(testText);

    expect(h1.tagName).toBe(EXPECTED_TAG_NAME);
  });

  it("renders without crashing", async () => {
    const { findByText } = render(<Heading1>{testText}</Heading1>);

    await findByText(testText);
  });

  it("displays the correct children", async () => {
    const { findByText } = render(<Heading1>{testText}</Heading1>);

    await findByText(testText);
  });
});
