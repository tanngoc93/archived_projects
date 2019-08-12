FROM ruby:2.5.3

RUN apt-get update && apt-get install -y libpq-dev

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
 && apt-get install -y nodejs

RUN mkdir -p /var/www/ruby

RUN mkdir -p /var/www/ruby/tmp/pids

WORKDIR /var/www/ruby

COPY Gemfile /var/www/ruby/Gemfile

COPY Gemfile.lock /var/www/ruby/Gemfile.lock

RUN gem install bundler && bundle install

COPY . .