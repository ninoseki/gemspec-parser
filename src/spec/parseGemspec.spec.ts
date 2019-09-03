import { parseGemspec } from "../parseGemspec";
import { Gemspec } from "../common/constants";

const stringGemspec = `
# frozen_string_literal: true

lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "miteru/version"

Gem::Specification.new do |spec|
  spec.name          = "miteru"
  spec.version       = Miteru::VERSION
  spec.authors       = ["Manabu Niseki"]
  spec.email         = ["manabu.niseki@gmail.com"]

  spec.summary       = "An experimental phishing kit detector"
  spec.description   = "An experimental phishing kit detector"
  spec.homepage      = "https://github.com/ninoseki/miteru"
  spec.license       = "MIT"

  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "coveralls", "~> 0.8"
  spec.add_development_dependency "glint", "~> 0.1"
  spec.add_development_dependency "rake", "~> 12.3"
  spec.add_development_dependency "rspec", "~> 3.8"
  spec.add_development_dependency "vcr", "~> 5.0"
  spec.add_development_dependency "webmock", "~> 3.6"

  spec.add_dependency "colorize", "~> 0.8"
  spec.add_dependency "down", "~> 4.8"
  spec.add_dependency "http", "~> 4.1"
  spec.add_dependency "oga", "~> 2.15"
  spec.add_dependency "parallel", "~> 1.17"
  spec.add_dependency "slack-notifier", "~> 2.3"
  spec.add_runtime_dependency "thor", "~> 0.19"
end
`;

test("parseGemspec", () => {
  const gemspec: Gemspec = parseGemspec(stringGemspec);

  expect(gemspec.name).toBe("miteru");

  expect(gemspec.devDependencies).toStrictEqual([
    { name: "bundler", requirements: "~> 2.0" },
    { name: "coveralls", requirements: "~> 0.8" },
    { name: "glint", requirements: "~> 0.1" },
    { name: "rake", requirements: "~> 12.3" },
    { name: "rspec", requirements: "~> 3.8" },
    { name: "vcr", requirements: "~> 5.0" },
    { name: "webmock", requirements: "~> 3.6" },
  ]);

  expect(gemspec.dependencies).toStrictEqual([
    { name: "colorize", requirements: "~> 0.8" },
    { name: "down", requirements: "~> 4.8" },
    { name: "http", requirements: "~> 4.1" },
    { name: "oga", requirements: "~> 2.15" },
    { name: "parallel", requirements: "~> 1.17" },
    { name: "slack-notifier", requirements: "~> 2.3" },
    { name: "thor", requirements: "~> 0.19" },
  ]);
});
