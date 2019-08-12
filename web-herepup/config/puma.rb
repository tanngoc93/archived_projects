# Change to match your CPU core count
workers ENV['WEB_CONCURRENCY'].to_i || 2

# Min and Max threads per worker
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count

port            ENV.fetch("PORT") { 3000 }

# Specifies the `environment` that Puma will run in.
rails_env =     ENV.fetch("RAILS_ENV") { "production" }
environment rails_env

app_dir = File.expand_path("../..", __FILE__)
shared_dir = "#{app_dir}/tmp"

# Logging
stdout_redirect "#{app_dir}/log/puma.stdout.log", "#{app_dir}/log/puma.stderr.log", true

# Set master PID and state locations
pidfile    "#{shared_dir}/pids/puma.pid"
state_path "#{shared_dir}/pids/puma.state"
activate_control_app

on_worker_boot do
  require "active_record"
  ActiveRecord::Base.connection.disconnect! rescue ActiveRecord::ConnectionNotEstablished
  ActiveRecord::Base.establish_connection(YAML.load_file("#{app_dir}/config/database.yml")[rails_env])
end

# Allow puma to be restarted by `rails restart` command.
plugin :tmp_restart
