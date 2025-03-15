import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { HeadingSecondary } from "../HeadingSecondary";

describe("HeadingSecondary", () => {
  const testText = "Test Secondary Heading";
  const EXPECTED_TAG_NAME = "H2";

  it("renders an h2 tag", async () => {
    const { findByText } = render(
      <HeadingSecondary>{testText}</HeadingSecondary>
    );

    const h2 = await findByText(testText);

    expect(h2.tagName).toBe(EXPECTED_TAG_NAME);
  });

  it("renders without crashing", async () => {
    const { findByText } = render(
      <HeadingSecondary>{testText}</HeadingSecondary>
    );

    await findByText("Test Secondary Heading");
  });

  it("displays the correct children", async () => {
    const { findByText } = render(
      <HeadingSecondary>{testText}</HeadingSecondary>
    );

    await findByText(testText);
  });
});
