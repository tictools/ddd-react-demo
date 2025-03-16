export const SpanText = ({
  children,
  customClassName,
}: {
  children: React.ReactNode;
  customClassName: string;
}) => {
  return <span className={customClassName}>{children}</span>;
};
