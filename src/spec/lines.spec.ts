import { filteredAndTrimmedLines } from "../common/lines";

test("filteredAndTrimmedLines", () => {
  const s = "foo\nfoo bar\n  foo bar foo bar  ";
  const lines = filteredAndTrimmedLines(s);
  expect(lines[0]).toBe("foo");
  expect(lines[1]).toBe("foo bar");
  expect(lines[2]).toBe("foo bar foo bar");
});
