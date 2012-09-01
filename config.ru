# Set up site
require './site'

# Set up middleware
require 'rack_clicky'
use Rack::Clicky, '66635410'

# Run site
run MySite
