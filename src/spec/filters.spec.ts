import {
  startFilter,
  filterGemspecDeps,
  filterGemspecDevDeps,
} from "../common/filters";

test("startFilter", () => {
  const fn = startFilter("foo");
  expect(fn("foo")).toBeTruthy();
  expect(fn("bar")).toBeFalsy();
});

test("filterGemspecDeps", () => {
  expect(filterGemspecDeps("foo bar")).toBeFalsy();
  expect(filterGemspecDeps('add_dependency "bundler", "~> 2.0"')).toBeTruthy();
  expect(
    filterGemspecDeps('add_runtime_dependency "bundler", "~> 2.0"')
  ).toBeTruthy();
});

test("filterGemspecDevDeps", () => {
  expect(filterGemspecDevDeps("foo bar")).toBeFalsy();
  expect(
    filterGemspecDevDeps('add_development_dependency "bundler", "~> 2.0"')
  ).toBeTruthy();
});
