import { parseGemspec, parseGemspecFromFile } from "../index";

test("parseGemspec", () => {
  expect(typeof parseGemspec).toBe("function");
});

test("parseGemspecFromFile", () => {
  expect(typeof parseGemspecFromFile).toBe("function");
});
