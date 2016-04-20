require 'html-proofer'
require 'jekyll'

task :build do
  Jekyll::Commands::Build.process({})
end

task :doctor do
  Jekyll::Commands::Doctor.process({})
end

task proof: :build do
  HTMLProofer.check_directory(
    '_site',
    check_external_hash: true,
    check_favicon: true,
    check_html: true,
    url_ignore: [%r{^/apps/}]
  ).run
end

task default: [:build, :doctor, :proof]
