# ---- Stage 1: Build the React frontend ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install build deps for better-sqlite3 native build
RUN apk add --no-cache python3 make g++

# Install dependencies (use npm ci for reproducible install)
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources and build the Vite frontend
COPY . .
RUN npm run build


# ---- Stage 2: Production runtime ----
FROM node:20-alpine AS runner

WORKDIR /app

# Runtime deps only (better-sqlite3 needs libstdc++ at runtime)
RUN apk add --no-cache python3 make g++ \
    && addgroup -S app && adduser -S app -G app

ENV NODE_ENV=production
ENV PORT=3000

# Install prod-only node_modules
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built frontend + server + migrations from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/migrations ./migrations

# Prepare upload folders and db folder (mount points for volumes)
RUN mkdir -p /app/uploads/images /app/uploads/documents /app/db_vol \
    && chown -R app:app /app

USER app

EXPOSE 3000

CMD ["node", "server/index.js"]
