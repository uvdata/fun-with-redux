FROM node:10

WORKDIR /app

EXPOSE 3000

COPY package.json package.json
RUN yarn install

COPY . /app

RUN yarn build

CMD [ "yarn", "start" ]