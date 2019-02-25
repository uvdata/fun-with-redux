FROM node:11

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn

CMD ["npm", "start"]

EXPOSE 3000
