require 'sinatra'
require 'sinatra/assetpack'
require 'sinatra/support'

Encoding.default_external = 'utf-8'

class Site < Sinatra::Base
  set :root, File.dirname(__FILE__)
  register Sinatra::AssetPack
  register Sinatra::CompassSupport

  assets do
    # The second parameter defines where the compressed version will be served.
    # (Note: that parameter is optional, AssetPack will figure it out.)
    js :app, '/js/app.js', [
      '/js/*.js',
      '/js/**/*.js'
    ]

    css :app, '/css/app.css', [
      '/css/*.css',
      '/css/**/*.css'
    ]
  end

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
Site.run! if $0 == __FILE__
