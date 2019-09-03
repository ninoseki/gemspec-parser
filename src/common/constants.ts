export const EOL = "\n";
export const gemDependencyToken = "gem '";
export const gemspecStartToken = "Gem::Specification.new do";
export const addDepToken = "add_dependency";
export const addDevDepToken = "add_development_dependency";
export const addRuntimeDepToken = "add_runtime_dependency";
export const optionalGemspecAttributeKeys: string[] = [
  "author",
  "authors",
  "description",
  "email",
  "homepage",
  "license",
  "licenses",
  "required_ruby_version",
  "required_rubygems_version",
];

export interface Dependency {
  name: string;
  requirements: string;
}

export interface Gemspec {
  author?: string;
  authors?: string[];
  dependencies?: Dependency[];
  description?: string;
  devDependencies?: Dependency[];
  email?: string;
  homepage?: string;
  license?: string;
  licenses?: string[];
  name: string;
  required_ruby_version?: string;
  required_rubygems_version?: string;
  summary: string;
  version: string;
}
