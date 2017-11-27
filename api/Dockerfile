FROM node:latest

RUN mkdir -p /var/www/api/dist
WORKDIR /var/www/api
RUN mkdir -p config

COPY ./package.json /var/www/api
COPY ./config /var/www/api/config
COPY ./dist /var/www/api/dist

RUN npm install
CMD [ "npm", "start" ]


