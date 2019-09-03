# gemspec-parser

[![Build Status](https://travis-ci.org/ninoseki/gemspec-parser.svg?branch=master)](https://travis-ci.org/ninoseki/gemspec-parser)
[![Coverage Status](https://coveralls.io/repos/github/ninoseki/gemspec-parser/badge.svg?branch=WIP)](https://coveralls.io/github/ninoseki/gemspec-parser?branch=WIP)
[![CodeFactor](https://www.codefactor.io/repository/github/ninoseki/gemspec-parser/badge)](https://www.codefactor.io/repository/github/ninoseki/gemspec-parser)

A simple parser for gemspec.

Note: This is a fork of [dev-cprice/gemfile-parser](https://github.com/dev-cprice/gemfile-parser).

## Installation

```bash
npm install gemspec-parser
```

## Usage

```ts
import { parseGemspec } from "gemspec-parser";

const stringGemspec = `
lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "example/version"

Gem::Specification.new do |spec|
  spec.name          = "example"
  spec.version       = "0.1.0"
  spec.authors       = ["John Doe"]

  spec.add_development_dependency "bundler", "~> 2.0"

  spec.add_dependency "foo", "~> 0.8"
  spec.add_runtime_dependency "bar", "~> 0.19"
end
`;

const gemspec = parseGemspec(stringGemspec);
// {
//   name: 'example',
//   version: '0.1.0',
//   summary: 'N/A',
//   authors: [ 'John Doe' ],
//   dependencies: [
//     { name: 'foo', requirements: '~> 0.8' },
//     { name: 'bar', requirements: '~> 0.19' }
//   ],
//   devDependencies: [ { name: 'bundler', requirements: '~> 2.0' } ]
// }
```
