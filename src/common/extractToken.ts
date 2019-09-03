export const extractToken = (string: string, options = {}): string => {
  const start = options["start"] || "";
  const end = options["end"];
  const searchValue: string | RegExp = options["searchValue"] || "";
  const replaceValue = options["replaceValue"] || "";

  const endIndex = end ? string.indexOf(end) : undefined;
  const startIndex = start ? string.indexOf(start) + start.length : 0;
  return string
    .slice(startIndex, endIndex)
    .replace(searchValue, replaceValue)
    .trim();
};
