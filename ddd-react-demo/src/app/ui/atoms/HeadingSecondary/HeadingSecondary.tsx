import { ReactNode } from "react";

interface HeadingSecondaryProps {
  children: ReactNode;
}

export const HeadingSecondary = ({ children }: HeadingSecondaryProps) => (
  <h1>{children}</h1>
);
