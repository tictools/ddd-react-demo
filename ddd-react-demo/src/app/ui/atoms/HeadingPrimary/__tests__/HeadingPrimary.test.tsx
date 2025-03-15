import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { HeadingPrimary } from "../HeadingPrimary";

describe("HeadingPrimary", () => {
  const testText = "Test Primary Heading";
  const EXPECTED_TAG_NAME = "H1";

  it("renders an h1 tag", async () => {
    const { findByText } = render(<HeadingPrimary>{testText}</HeadingPrimary>);

    const h1 = await findByText(testText);

    expect(h1.tagName).toBe(EXPECTED_TAG_NAME);
  });

  it("renders without crashing", async () => {
    const { findByText } = render(<HeadingPrimary>{testText}</HeadingPrimary>);

    await findByText(testText);
  });

  it("displays the correct children", async () => {
    const { findByText } = render(<HeadingPrimary>{testText}</HeadingPrimary>);

    await findByText(testText);
  });
});
