import { ReactNode } from "react";

interface Heading2Props {
  children: ReactNode;
}

export const Heading2 = ({ children }: Heading2Props) => <h2>{children}</h2>;
