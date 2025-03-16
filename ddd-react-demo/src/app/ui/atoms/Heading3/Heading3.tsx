import { ReactNode } from "react";

import styles from "./Heading3.module.css";

interface Heading3Props {
  children: ReactNode;
}

export const Heading3 = ({ children }: Heading3Props) => (
  <h3 className={`${styles["heading"]}`}>{children}</h3>
);
