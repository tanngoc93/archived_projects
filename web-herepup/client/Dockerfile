FROM node:8.12.0

RUN npm install -g webpack webpack-dev-server

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

ADD package.json /var/www/html/package.json

ADD yarn.lock /var/www/html/yarn.lock

RUN yarn install

COPY . /var/www/html