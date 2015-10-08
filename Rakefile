require 'html/proofer'
require 'jekyll'

task :build do
  Jekyll::Commands::Build.process({})
end

task :doctor do
  Jekyll::Commands::Doctor.process({})
end

task proof: :build do
  HTML::Proofer.new('_site', url_ignore: [%r{^/apps/}]).run
end

task default: [:build, :doctor, :proof]
