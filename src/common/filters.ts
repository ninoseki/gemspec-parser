import { addDepToken, addDevDepToken, addRuntimeDepToken } from "./constants";

export const startFilter = (start: string) => (line: string): boolean =>
  line.startsWith(start);

export const filterGemspecDeps = (line: string): boolean =>
  startFilter(addDepToken)(line) || startFilter(addRuntimeDepToken)(line);

export const filterGemspecDevDeps = (line: string): boolean =>
  startFilter(addDevDepToken)(line);

export const filterGemspecAtrributes = (line: string): boolean =>
  !startFilter("add_de")(line) && !startFilter("add_runtime")(line);
