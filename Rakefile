require 'github-pages'
require 'html-proofer'
require 'scss_lint/rake_task'

task(:build) { Jekyll::Commands::Build.process({}) }
task(:doctor) { Jekyll::Commands::Doctor.process({}) }

task proof: :build do
  HTMLProofer.check_directory(
    '_site',
    check_external_hash: true,
    check_favicon: true,
    check_html: true,
    file_ignore: ['_site/skills/index.html'],
    url_swap: { %r{^/apps/(.*)$} => 'http://mccurdy.io/apps/\1' }
  ).run
end

# This task must run after all Jekyll tasks, see
# https://github.com/brigade/scss-lint/issues/750
SCSSLint::RakeTask.new { |t| t.files = Dir.glob('_sass/*.scss') }

task default: [:build, :doctor, :proof, :scss_lint]
