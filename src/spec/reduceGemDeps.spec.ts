import { reduceGemDeps } from "../common/reduceGemDeps";

test("reduceGemDeps", () => {
  const dependencies = ['spec.add_development_dependency "bundler", "~> 2.0"'];
  const reduced = reduceGemDeps(dependencies);

  expect(reduced).toStrictEqual([{ name: "bundler", requirements: "~> 2.0" }]);
});
