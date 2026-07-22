FROM node:lts-slim

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY index.js index.js

CMD ["npm", "start"]