import { ReactNode } from "react";

import styles from "./HeadingTertiary.module.css";

interface HeadingTertiaryProps {
  children: ReactNode;
}

export const HeadingTertiary = ({ children }: HeadingTertiaryProps) => (
  <h3 className={`${styles["heading"]}`}>{children}</h3>
);
