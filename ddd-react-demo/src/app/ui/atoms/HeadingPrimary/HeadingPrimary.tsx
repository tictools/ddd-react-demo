import { ReactNode } from "react";

interface HeadingPrimaryProps {
  children: ReactNode;
}

export const HeadingPrimary = ({ children }: HeadingPrimaryProps) => (
  <h1>{children}</h1>
);
