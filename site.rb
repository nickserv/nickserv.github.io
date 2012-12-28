require 'sinatra'

class MySite < Sinatra::Base

	# Pages

	get '/' do
		@page_title = 'Home'
		@page_id = 'index'
		erb :index
	end

	get '/projects' do
		@page_title = 'Projects'
		@page_id = 'projects'
		erb :projects
	end

	get '/skills' do
		@page_title = 'Skills'
		@page_id = 'skills'
		erb :skills
	end

	not_found do
		@page_title = '404 Not Found'
		@page_id = '404'
		erb :'404'
	end

	# Redirects

	get '/index.html' do
		redirect '/', 301
	end

	get '/apps.html' do
		redirect '/projects', 301
	end

end

# Only run it when called as `ruby your_app_file.rb`
MySite.run! if $0 == __FILE__
