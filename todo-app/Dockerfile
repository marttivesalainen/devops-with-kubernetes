FROM node:24.18.0-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY ./app ./app
RUN npm run build

FROM node:24.18.0-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:24.18.0-slim AS release
ENV NODE_ENV=production
WORKDIR /home/node/app
USER node

COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/build ./build
COPY --chown=node:node --from=deps    /app/node_modules ./node_modules

EXPOSE 8080
ENV PORT=8080

CMD [ "node", "./build/app/index.js" ]