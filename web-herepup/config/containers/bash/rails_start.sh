#!/usr/bin/env bash
if [ ! -d tmp/pids ]; then
  mkdir -p tmp/pids
fi

if [ -f tmp/pids/puma.pid ]; then
  rm tmp/pids/puma.pid
fi

bundle exec rails db:create && rails db:migrate
bundle exec rails s -b 0.0.0.0
