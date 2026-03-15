#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# setup-vps.sh — One-time VPS bootstrap for portfolio deployment.
# Run this as ROOT on a fresh Ubuntu server. Everything runs inside Docker.
# Usage:  bash scripts/setup-vps.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_URL="https://github.com/IIIshan/personal-portfolio.git"
APP_DIR="/home/deploy/ishanrana.dev"
DEPLOY_USER="deploy"

# ─── Must run as root ────────────────────────────────────────────────────────
if [ "$(id -u)" -ne 0 ]; then
  echo "ERROR: This script must be run as root."
  exit 1
fi

# ─── 1. Install Docker ──────────────────────────────────────────────────────
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

# ─── 2. Verify Docker Compose ───────────────────────────────────────────────
echo ""
echo "── Verifying Docker Compose ───────────────────────────────"
if docker compose version &>/dev/null; then
  echo "Docker Compose available: $(docker compose version)"
else
  echo "ERROR: Docker Compose plugin not found."
  echo "Install with: apt-get install -y docker-compose-plugin"
  exit 1
fi

# ─── 3. Create deploy user (if not exists) ──────────────────────────────────
echo ""
echo "── Setting up deploy user ─────────────────────────────────"
if id "$DEPLOY_USER" &>/dev/null; then
  echo "User '$DEPLOY_USER' already exists."
else
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
  echo "User '$DEPLOY_USER' created."
fi

if groups "$DEPLOY_USER" | grep -q docker; then
  echo "User '$DEPLOY_USER' already in docker group."
else
  usermod -aG docker "$DEPLOY_USER"
  echo "User '$DEPLOY_USER' added to docker group."
fi

# ─── 4. Configure firewall ──────────────────────────────────────────────────
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

# ─── 5. Clone repo as deploy user ───────────────────────────────────────────
echo ""
echo "── Cloning repository ─────────────────────────────────────"
if [ -d "$APP_DIR/.git" ]; then
  echo "Repository already exists at $APP_DIR. Pulling latest..."
  su - "$DEPLOY_USER" -c "cd $APP_DIR && git pull origin main"
else
  su - "$DEPLOY_USER" -c "git clone $REPO_URL $APP_DIR"
fi

# ─── 6. Build and start containers as deploy user ───────────────────────────
echo ""
echo "── Building and starting containers ───────────────────────"
su - "$DEPLOY_USER" -c "cd $APP_DIR && docker compose -f docker-compose.prod.yml up -d --build"

# ─── 7. Status ───────────────────────────────────────────────────────────────
echo ""
echo "── Status ─────────────────────────────────────────────────"
su - "$DEPLOY_USER" -c "cd $APP_DIR && docker compose -f docker-compose.prod.yml ps"

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  Setup complete."
echo "  Caddy will auto-provision SSL once DNS propagates."
echo "  Check: https://ishanrana.dev"
echo ""
echo "  For future deploys, run as '$DEPLOY_USER':"
echo "    bash $APP_DIR/scripts/deploy.sh"
echo "════════════════════════════════════════════════════════════"
