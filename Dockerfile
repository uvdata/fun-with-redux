FROM node:8

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN yarn

CMD ["npm", "start"]
