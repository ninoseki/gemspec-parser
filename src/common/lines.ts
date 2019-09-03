import { EOL } from "./constants";

const trimIt = (line: string): string => line.trim();

export const lines = (string: string): string[] => string.split(EOL);
export const filteredAndTrimmedLines = (string: string): string[] =>
  lines(string)
    .filter(Boolean)
    .map(trimIt);
