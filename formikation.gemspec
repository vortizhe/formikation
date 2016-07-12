# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'formikation/version'

Gem::Specification.new do |spec|
  spec.name          = "formikation"
  spec.version       = Formikation::VERSION
  spec.authors       = ["vortizhe"]
  spec.email         = ["kespers@gmail.com"]
  spec.summary       = "Formikation is a simple jQuery plugin to beautify form inputs with some css."
  spec.description   = "Formikation is a simple jQuery plugin to beautify form inputs, select, radios and checkboxes with some css. It supports custom theming and is IE8+ compatible."
  spec.homepage      = "http://vortizhe.me/formikation/"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
end
