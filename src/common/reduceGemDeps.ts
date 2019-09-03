import { Dependency } from "./constants";

const quoteMapper = (line: string): string => {
  const quoteIndex = line.indexOf("'");
  const start = quoteIndex >= 0 ? quoteIndex : line.indexOf('"') || 0;
  return line.slice(start);
};

export const reduceGemDeps = (dependencies: string[] = []): Dependency[] =>
  dependencies.map(quoteMapper).map((line: string) => {
    const parts: string[] = line
      .split(",")
      .map(s => s.trim().replace(/'|"/g, ""));

    const name = parts[0] || "N/A";
    const requirements = parts[1] || "N/A";
    return { name: name, requirements: requirements };
  });
