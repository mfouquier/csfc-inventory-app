FROM node:alpine 

WORKDIR /app

COPY . /app

RUN npm install

RUN apk add bash

EXPOSE 3000

CMD ["npm", "start"]