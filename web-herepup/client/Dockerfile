FROM node:8.12.0

RUN npm install -g webpack webpack-dev-server

RUN mkdir /var/www/node

WORKDIR   /var/www/node

COPY package.json      /var/www/node/package.json

COPY package-lock.json /var/www/node/package-lock.json

RUN npm install

COPY .  /var/www/node