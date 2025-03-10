import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { HeadingSecondary } from "../HeadingSecondary";

describe("HeadingSecondary", () => {
  it("renders without crashing", async () => {
    const { findByText } = render(
      <HeadingSecondary>Test Secondary Heading</HeadingSecondary>
    );

    await findByText("Test Secondary Heading");
  });

  it("displays the correct children", async () => {
    const testText = "Hello, World!";

    const { findByText } = render(
      <HeadingSecondary>{testText}</HeadingSecondary>
    );

    await findByText(testText);
  });
});
