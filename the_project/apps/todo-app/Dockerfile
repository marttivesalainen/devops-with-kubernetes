# syntax=docker/dockerfile:1
#
# Build context must be the monorepo root (the_project/), not this folder,
# because we need the root package.json / package-lock.json / tsconfig.json.
#
#   docker build -f apps/todo-app/Dockerfile -t <image>:<tag> .

# ---- Install all workspace deps once (cached on manifests) ----
FROM node:24-slim AS deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/todo-app/backend/package.json apps/todo-app/backend/
COPY apps/todo-app/frontend/package.json apps/todo-app/frontend/
COPY apps/todo-backend/package.json apps/todo-backend/

RUN --mount=type=cache,target=/root/.npm \
	npm ci --workspaces --include-workspace-root

# ---- Build frontend ----
FROM deps AS build-frontend
COPY tsconfig.json ./
COPY apps/todo-app/frontend apps/todo-app/frontend
RUN npm run build --workspace=frontend

# ---- Build backend ----
FROM deps AS build-backend
COPY tsconfig.json ./
COPY apps/todo-app/backend apps/todo-app/backend
RUN npm run build --workspace=backend

# ---- Production dependencies only (backend + hoisted root) ----
FROM node:24-slim AS prod-deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/todo-app/backend/package.json apps/todo-app/backend/
COPY apps/todo-app/frontend/package.json apps/todo-app/frontend/
COPY apps/todo-backend/package.json apps/todo-backend/

RUN --mount=type=cache,target=/root/.npm \
	npm ci --workspace=backend --include-workspace-root --omit=dev

# ---- Release ----
FROM node:24-slim AS release
ENV NODE_ENV=production
ENV FRONTEND_DIST=/home/node/app/public

WORKDIR /home/node/app

USER node
COPY --chown=node:node --from=prod-deps      /repo/node_modules ./node_modules
COPY --chown=node:node --from=prod-deps      /repo/apps/todo-app/backend/package.json ./package.json
COPY --chown=node:node --from=build-backend  /repo/apps/todo-app/backend/build ./build
COPY --chown=node:node --from=build-frontend /repo/apps/todo-app/frontend/dist ./public

CMD ["node", "./build/index.js"]
