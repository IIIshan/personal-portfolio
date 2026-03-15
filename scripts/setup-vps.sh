#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# setup-vps.sh — One-time VPS bootstrap for portfolio deployment.
# Run this once on a fresh Ubuntu server. Everything runs inside Docker.
# Usage:  bash scripts/setup-vps.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_URL="https://github.com/IIIshan/personal-portfolio.git"
APP_DIR="/opt/portfolio"

echo ""
echo "── Installing Docker ──────────────────────────────────────"
if command -v docker &>/dev/null; then
  echo "Docker already installed: $(docker --version)"
else
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
  echo "Docker installed: $(docker --version)"
fi

echo ""
echo "── Verifying Docker Compose ───────────────────────────────"
if docker compose version &>/dev/null; then
  echo "Docker Compose available: $(docker compose version)"
else
  echo "ERROR: Docker Compose plugin not found."
  echo "Install with: apt-get install -y docker-compose-plugin"
  exit 1
fi

echo ""
echo "── Configuring firewall ───────────────────────────────────"
if command -v ufw &>/dev/null; then
  ufw allow 22/tcp   # SSH
  ufw allow 80/tcp   # HTTP
  ufw allow 443/tcp  # HTTPS
  ufw --force enable
  echo "Firewall configured: ports 22, 80, 443 open."
else
  echo "ufw not found — skipping firewall config."
  echo "Make sure ports 22, 80, and 443 are open."
fi

echo ""
echo "── Cloning repository ─────────────────────────────────────"
if [ -d "$APP_DIR/.git" ]; then
  echo "Repository already exists at $APP_DIR. Pulling latest..."
  cd "$APP_DIR"
  git pull origin main
else
  mkdir -p "$APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

echo ""
echo "── Building and starting containers ───────────────────────"
docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "── Status ─────────────────────────────────────────────────"
docker compose -f docker-compose.prod.yml ps

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  Setup complete."
echo "  Caddy will auto-provision SSL once DNS propagates."
echo "  Check: https://ishanrana.dev"
echo "════════════════════════════════════════════════════════════"
