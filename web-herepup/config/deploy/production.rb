set :stage,     :production
set :rails_env, :production
set :branch,    :master

server 'server_ip', port: 'server_port', roles: [:web, :app, :db], primary: true