set :stage,     :staging
set :rails_env, :staging
set :branch,    :staging

server 'server_ip', port: 'server_port', roles: [:web, :app, :db], primary: true