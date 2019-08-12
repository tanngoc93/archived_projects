#!/usr/bin/env bash
if [ ! -d tmp/pids ]; then
  mkdir -p tmp/pids
fi

if [ -f tmp/pids/puma.pid ]; then
  rm tmp/pids/puma.pid && touch tmp/pids/puma.pid
fi

bundle exec rake db:create
bundle exec rake db:migrate

exec bundle exec puma -C config/puma.rb -e $RAILS_ENV;
