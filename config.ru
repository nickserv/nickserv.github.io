# Set up site
require './site'

# Set up middleware
use Rack::Deflater

# Run site
run Site
