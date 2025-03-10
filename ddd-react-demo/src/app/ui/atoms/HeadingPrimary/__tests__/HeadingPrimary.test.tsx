import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { HeadingPrimary } from "../HeadingPrimary";

describe("HeadingPrimary", () => {
  it("renders without crashing", async () => {
    const { findByText } = render(
      <HeadingPrimary>Test Heading</HeadingPrimary>
    );

    await findByText("Test Heading");
  });

  it("displays the correct children", async () => {
    const testText = "Hello, World!";

    const { findByText } = render(<HeadingPrimary>{testText}</HeadingPrimary>);

    await findByText(testText);
  });
});
