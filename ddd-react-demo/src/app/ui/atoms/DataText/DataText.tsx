import { Text } from "../Text/Text";

type dateFormatter =
  | "toDateString"
  | "toISOString"
  | "toLocaleDateString"
  | "toLocaleString";

type DateTextProps = {
  timestamp: number;
  dateFormatter?: dateFormatter;
  locale?: string;
};

type dateFormatterMapParams = {
  date: Date;
  locale?: string;
};

const dateFormatterMap: Record<
  dateFormatter,
  ({ date, locale }: dateFormatterMapParams) => string
> = {
  toDateString: ({ date }) => date.toDateString(),
  toISOString: ({ date }) => date.toISOString(),
  toLocaleDateString: ({ date, locale }) => date.toLocaleDateString(locale),
  toLocaleString: ({ date, locale }) => date.toLocaleString(locale),
};

export const DateText = ({
  timestamp,
  dateFormatter = "toLocaleDateString",
  locale = "en-GB",
}: DateTextProps) => {
  const date = new Date(timestamp);

  const dateString = dateFormatterMap[dateFormatter]({ date, locale });

  return <Text content={dateString} />;
};
