import React from "react";

import styles from "./List.module.css";

type ListProps<T> = {
  itemsList: T[];
  renderTo: (element: T) => React.ReactNode;
};

export const List = <T,>({ itemsList, renderTo }: ListProps<T>) => {
  return (
    <ul className={styles["list"]}>
      {itemsList.map((element) => renderTo(element))}
    </ul>
  );
};
