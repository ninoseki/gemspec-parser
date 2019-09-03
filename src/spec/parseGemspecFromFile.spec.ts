import { parseGemspecFromFile } from "../index";
import { Gemspec } from "../common/constants";

import * as path from "path";

test("parseGemspecFromFile", () => {
  const gemspec: Gemspec = parseGemspecFromFile(
    path.resolve(__dirname, "fixtures/kokki.gemspec")
  );

  expect(gemspec.devDependencies).toStrictEqual([
    { name: "bundler", requirements: "~> 2.0" },
    { name: "coveralls", requirements: "~> 0.8" },
    { name: "rake", requirements: "~> 12.3" },
    { name: "rspec", requirements: "~> 3.8" },
    { name: "vcr", requirements: "~> 5.0" },
    { name: "webmock", requirements: "~> 3.6" },
  ]);
});

test("parseGemspecFromFile with rails", () => {
  const gemspec: Gemspec = parseGemspecFromFile(
    path.resolve(__dirname, "fixtures/rails.gemspec")
  );

  expect(gemspec.name).toBe("rails");
  expect(gemspec.author).toBe("David Heinemeier Hansson");
  expect(gemspec.summary).toBe("Full-stack web application framework.");
  expect(gemspec.required_ruby_version).toBe(">= 2.5.0");
  expect(gemspec.required_rubygems_version).toBe(">= 1.8.11");
});
