require 'html-proofer'
require 'jekyll'

task(:build) { Jekyll::Commands::Build.process({}) }
task(:doctor) { Jekyll::Commands::Doctor.process({}) }

task proof: :build do
  HTMLProofer.check_directory(
    '_site',
    check_external_hash: true,
    check_favicon: true,
    check_html: true,
    file_ignore: ['_site/skills/index.html'],
    url_ignore: [%r{^/apps/}]
  ).run
end

task default: [:build, :doctor, :proof]
