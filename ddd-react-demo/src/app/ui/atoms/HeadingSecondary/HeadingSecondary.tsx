import { ReactNode } from "react";

interface HeadingSecondaryProps {
  children: ReactNode;
}

export const HeadingSecondary = ({ children }: HeadingSecondaryProps) => (
  <h2>{children}</h2>
);
