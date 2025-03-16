/* eslint-disable @typescript-eslint/no-unused-vars */
type ClassNamesArguments =
  | string
  | undefined
  | null
  | false
  | Record<string, boolean>
  | string[];

function classNames(...args: ClassNamesArguments[]): string {
  return args
    .flatMap((arg) => {
      if (!arg) return [];
      if (typeof arg === "string") return arg;
      if (Array.isArray(arg)) return classNames(...arg);
      if (typeof arg === "object") {
        return Object.entries(arg)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}

export { classNames };
