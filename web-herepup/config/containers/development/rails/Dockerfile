FROM ruby:2.5.3

RUN apt-get update && apt-get install -y libpq-dev

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
 && apt-get install -y nodejs

RUN mkdir -p /var/www/html \
 && mkdir -p /var/www/html/log \&& mkdir -p /var/www/html/tmp/pids

WORKDIR /var/www/html

COPY Gemfile /var/www/html/Gemfile

COPY Gemfile.lock /var/www/html/Gemfile.lock

RUN gem install bundler && bundle install

COPY . /var/www/html