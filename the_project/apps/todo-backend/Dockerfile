# ---- Base build stage: install todo-backend + root deps ----
FROM node:24-slim AS deps
WORKDIR /repo

COPY ../package.json ../package-lock.json ./
COPY apps/todo-backend/package.json apps/todo-backend/

RUN --mount=type=cache,target=/root/.npm \
	npm ci --workspace=todo-backend --include-workspace-root

# ---- Build todo-backend ----
FROM deps AS build-todo-backend
COPY apps/todo-backend apps/todo-backend
COPY tsconfig.json ./
RUN npm run build --workspace=todo-backend

# ---- Production dependencies only ----
FROM node:24-slim AS prod-deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/todo-backend/package.json apps/todo-backend/

RUN --mount=type=cache,target=/root/.npm \
	npm ci --workspace=todo-backend --include-workspace-root --omit=dev

# ---- Release ----
FROM node:24-slim AS release
ENV NODE_ENV=production

WORKDIR /home/node/app

USER node
COPY --chown=node:node --from=prod-deps				/repo/node_modules ./node_modules
COPY --chown=node:node --from=prod-deps				/repo/apps/todo-backend/package.json ./package.json
COPY --chown=node:node --from=build-todo-backend	/repo/apps/todo-backend/build ./build

CMD ["node", "./build/index.js"]
