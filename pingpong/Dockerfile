FROM node:lts-slim

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY index.js index.js

ENV HOST=0.0.0.0

CMD ["npm", "start"]