import { ReactNode } from "react";

interface Heading1Props {
  children: ReactNode;
}

export const Heading1 = ({ children }: Heading1Props) => <h1>{children}</h1>;
