require 'sinatra'

class MySite < Sinatra::Base

	use Rack::GoogleAnalytics, :tracker => 'UA-22970573-1'

	get '/' do
		@page_title = 'Home'
		@page_id = 'index'
		erb :'index'
	end

	get '/projects' do
		@page_title = 'Projects'
		@page_id = 'projects'
		erb :'projects'
	end

	get '/skills' do
		@page_title = 'Skills'
		@page_id = 'skills'
		erb :'skills'
	end

	not_found do
		@page_title = '404 Not Found'
		@page_id = '404'
		erb :'404'
	end

end

# Only run it when called as `ruby your_app_file.rb`
MySite.run! if $0 == __FILE__
