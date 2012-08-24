require 'sinatra/base'

class MySite < Sinatra::Base

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
