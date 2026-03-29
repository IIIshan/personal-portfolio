# ── Stage 1: Build ────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

# Create non-root user and set permissions
RUN mkdir -p /var/lib/caddy && \
    chown -R caddy:caddy /var/lib/caddy /srv /etc/caddy

# Switch to non-root user
USER caddy:caddy

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80 443
