import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { HeadingTertiary } from "../HeadingTertiary";

describe("HeadingTertiary", () => {
  const testText = "Test Tertiary Heading";
  const EXPECTED_TAG_NAME = "H3";

  it("renders an h3 tag", async () => {
    const { findByText } = render(
      <HeadingTertiary>{testText}</HeadingTertiary>
    );

    const h3 = await findByText(testText);

    expect(h3.tagName).toBe(EXPECTED_TAG_NAME);
  });

  it("renders without crashing", async () => {
    const { findByText } = render(
      <HeadingTertiary>{testText}</HeadingTertiary>
    );

    await findByText(testText);
  });

  it("displays the correct children", async () => {
    const { findByText } = render(
      <HeadingTertiary>{testText}</HeadingTertiary>
    );

    await findByText(testText);
  });
});
