require 'rubygems'
require 'sinatra'

get '/index.html' do
	@page_title = 'Home'
	@page_id = 'index.html'
	erb :'index.html', { :layout => :'layout.html' }
end

get '/projects.html' do
	@page_title = 'Projects'
	@page_id = 'projects.html'
	erb :'projects.html', { :layout => :'layout.html' }
end

get '/skills.html' do
	@page_title = 'Skills'
	@page_id = 'skills.html'
	erb :'skills.html', { :layout => :'layout.html' }
end

not_found do
	@page_title = '404 Not Found'
	@page_id = '404.html'
	erb :'404.html', { :layout => :'layout.html' }
end
