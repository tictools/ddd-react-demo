import { ReactNode } from "react";

interface HeadingTertiaryProps {
  children: ReactNode;
}

export const HeadingTertiary = ({ children }: HeadingTertiaryProps) => (
  <h3>{children}</h3>
);
