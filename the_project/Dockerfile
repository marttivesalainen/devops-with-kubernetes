# ---- Base build stage: install all workspaces once ----
FROM node:24-slim AS deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/

RUN --mount=type=cache,target=/root/.npm \
	npm ci --workspaces --include-workspace-root

# ---- Build frontend ----
FROM deps AS build-frontend
COPY apps/frontend apps/frontend
COPY tsconfig.json ./
RUN npm run build --workspace=frontend

# ---- Build backend ----
FROM deps AS build-backend
COPY apps/backend apps/backend
COPY tsconfig.json ./
RUN npm run build --workspace=backend

# ---- Production dependencies only ----
FROM node:24-slim AS prod-deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/

RUN --mount=type=cache,target=/root/.npm \
	npm ci --workspace=backend --include-workspace-root --omit=dev

# ---- Release ----
FROM node:24-slim AS release
ENV NODE_ENV=production
ENV FRONTEND_DIST=/home/node/app/public

WORKDIR /home/node/app

USER node
COPY --chown=node:node --from=prod-deps			/repo/node_modules ./node_modules
COPY --chown=node:node --from=prod-deps			/repo/apps/backend/package.json ./package.json
COPY --chown=node:node --from=build-backend		/repo/apps/backend/build ./build
COPY --chown=node:node --from=build-frontend	/repo/apps/frontend/dist ./public

CMD ["node", "./build/index.js"]
