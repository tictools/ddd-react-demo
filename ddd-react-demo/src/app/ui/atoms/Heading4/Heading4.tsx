import { ReactNode } from "react";

interface Heading3Props {
  children: ReactNode;
  customClassName: string;
}

export const Heading4 = ({ children, customClassName }: Heading3Props) => (
  <h4 className={customClassName}>{children}</h4>
);
