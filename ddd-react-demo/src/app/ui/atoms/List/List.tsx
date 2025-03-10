import React from "react";

type ListProps<T> = {
  itemsList: T[];
  renderTo: (element: T) => React.ReactNode;
};

export const List = <T,>({ itemsList, renderTo }: ListProps<T>) => {
  return <ul>{itemsList.map((element) => renderTo(element))}</ul>;
};
