type TextProps = {
  customClassName: string;
  content: string;
};

export const Text = ({ content, customClassName }: TextProps) => (
  <p className={customClassName}>{content}</p>
);
