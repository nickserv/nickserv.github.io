require 'github-pages'
require 'html-proofer'
require 'scss_lint/rake_task'
require 'validator.nu'

task(:build) { Jekyll::Commands::Build.process({}) }
task(:doctor) { Jekyll::Commands::Doctor.process({}) }

task proof: :build do
  HTMLProofer.check_directory(
    '_site',
    check_external_hash: true,
    check_favicon: true,
    check_html: true,
    file_ignore: ['_site/skills/index.html'],
    url_swap: { %r{^/apps/(.*)$} => 'http://nickmccurdy.com/apps/\1' }
  ).run
end

# This task must run after all Jekyll tasks, see
# https://github.com/brigade/scss-lint/issues/750
SCSSLint::RakeTask.new

task validate: :build do
  Dir.glob('_site/**/*.html').each do |file|
    text = File.open(file).read
    results = JSON.parse Validator.nu text
    messages = results['messages'].map { |message| message['message'] }

    unless messages.empty?
      puts file
      puts messages
      raise
    end
  end
end

task default: [:build, :doctor, :proof, :scss_lint, :validate]
