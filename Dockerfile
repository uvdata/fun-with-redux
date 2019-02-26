#!/bin/sh
FROM node:11.10.0-alpine

# Install PM2
RUN yarn global add pm2

# Copy React files
copy swapi swapi/
copy static static/
copy pages pages/
copy package.json .
COPY pm2.json .

ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn install --production
RUN npm build

EXPOSE 43554 3000

CMD [ "pm2-runtime", "start", "pm2.json"]