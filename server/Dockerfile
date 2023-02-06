FROM node:16-alpine

RUN npm install -g nodemon

COPY ./src /usr/src/api

WORKDIR /usr/src/api

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]