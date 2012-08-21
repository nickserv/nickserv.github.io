require 'rubygems'
require 'sinatra'

get '/index.html' do
	erb :'index.html'
end

get '/projects.html' do
	erb :'projects.html'
end

get '/skills.html' do
	erb :'skills.html'
end

not_found do
	erb :'404.html'
end
