import * as fs from "fs";
import {
  addDepToken,
  addDevDepToken,
  Dependency,
  Gemspec,
  gemspecStartToken,
  optionalGemspecAttributeKeys,
} from "./common/constants";
import { filteredAndTrimmedLines } from "./common/lines";
import {
  filterGemspecAtrributes,
  filterGemspecDeps,
  filterGemspecDevDeps,
  startFilter,
} from "./common/filters";
import { extractToken } from "./common/extractToken";
import { reduceGemDeps } from "./common/reduceGemDeps";

interface Attributes {
  [key: string]: string | string[];
}

const trimIt = (s: string): string => {
  if (s.length === 0) {
    return s;
  }
  const t = s.trim();

  const first = t[0];
  const last = t[t.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return t.slice(1, -1);
  }
  return t;
};

const convert = (s: string): string | string[] => {
  const firstChar: string = s[0];
  const lastChar: string = s[s.length - 1];
  if (firstChar === "[" && lastChar === "]") {
    return JSON.parse(s) as string[];
  }
  return trimIt(s);
};

const extractValue = (
  attributes: Attributes,
  key: string
): string | string[] | undefined => {
  if (!(key in attributes)) {
    return undefined;
  }
  return attributes[key];
};

const extractString = (attributes: Attributes, key: string): string => {
  return (extractValue(attributes, key) || "N/A").toString();
};

const extractArray = (attributes: Attributes, key: string): string[] => {
  return Array.from(extractValue(attributes, key) || ["N/A"]);
};

export const parseGemspec = (string = ""): Gemspec => {
  const endOfHeader = string.indexOf(gemspecStartToken);
  const [gemspecStart, ...lines] = filteredAndTrimmedLines(
    string.slice(endOfHeader)
  );

  const specName = extractToken(gemspecStart, {
    start: "|",
    searchValue: /\|/g,
    replaceValue: "",
  });
  const specLines = lines
    .filter(startFilter(specName))
    .map(l => l.slice(l.indexOf(specName) + `${specName}.`.length));

  const attributes: Attributes = specLines
    .filter(filterGemspecAtrributes)
    .reduce((acc, l) => {
      const key = extractToken(l, { end: "=" });
      const value = convert(extractToken(l, { start: "=" }));
      return { ...acc, [key]: value };
    }, {});

  const name: string = extractString(attributes, "name");
  const version: string = extractString(attributes, "version");
  const summary: string = extractString(attributes, "summary");

  const dependencies: Dependency[] = reduceGemDeps(
    specLines
      .filter(filterGemspecDeps)
      .map(l => extractToken(l, { start: addDepToken }))
  );
  const devDependencies: Dependency[] = reduceGemDeps(
    specLines
      .filter(filterGemspecDevDeps)
      .map(l => extractToken(l, { start: addDevDepToken }))
  );

  const gemspec: Gemspec = {
    name: name,
    version: version,
    summary: summary,
    dependencies: dependencies,
    devDependencies: devDependencies,
  };

  optionalGemspecAttributeKeys.forEach((key: string) => {
    if (key in attributes)
      if (key === "licenses" || key === "authors") {
        gemspec[key] = extractArray(attributes, key);
      } else {
        gemspec[key] = extractString(attributes, key);
      }
  });
  return gemspec;
};

export function parseGemspecFromFile(path: string): Gemspec {
  const data: string = fs.readFileSync(path, "utf8");
  return parseGemspec(data);
}
