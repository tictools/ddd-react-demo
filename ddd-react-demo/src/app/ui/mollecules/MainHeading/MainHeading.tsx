import { HeadingPrimary } from "../../atoms/HeadingPrimary/HeadingPrimary";
import { HeadingSecondary } from "../../atoms/HeadingSecondary/HeadingSecondary";

type MainHeadingProps = {
  title: string;
  subtitle: string;
};

export const MainHeading = ({ title, subtitle }: MainHeadingProps) => {
  return (
    <header>
      <HeadingPrimary>{title}</HeadingPrimary>
      <HeadingSecondary>{subtitle}</HeadingSecondary>
    </header>
  );
};
