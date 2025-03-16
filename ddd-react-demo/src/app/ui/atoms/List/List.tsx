import React from "react";

import styles from "./List.module.css";

type ListItem = { id: string };

type ListProps<T extends ListItem> = {
  itemsList: T[];
  renderTo: (element: T) => React.ReactNode;
};

export const List = <T extends ListItem>({
  itemsList,
  renderTo,
}: ListProps<T>) => {
  return (
    <ul className={styles["list"]}>
      {itemsList.map((element) => (
        <React.Fragment key={element.id}>{renderTo(element)}</React.Fragment>
      ))}
    </ul>
  );
};
