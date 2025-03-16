import { Heading1 } from "../../atoms/Heading1/Heading1";
import { Heading2 } from "../../atoms/Heading2/Heading2";

type MainHeadingProps = {
  title: string;
  subtitle: string;
};

export const MainHeading = ({ title, subtitle }: MainHeadingProps) => {
  return (
    <header>
      <Heading1>{title}</Heading1>
      <Heading2>{subtitle}</Heading2>
    </header>
  );
};
