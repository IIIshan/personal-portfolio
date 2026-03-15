#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Pull latest code and redeploy. Run after each git push.
# Usage:  bash /opt/portfolio/scripts/deploy.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR="/opt/portfolio"
cd "$APP_DIR"

echo ""
echo "── Pulling latest code ────────────────────────────────────"
git pull origin main

echo ""
echo "── Rebuilding and restarting containers ───────────────────"
docker compose -f docker-compose.prod.yml up -d --build

echo ""
echo "── Cleaning up old images ─────────────────────────────────"
docker image prune -f

echo ""
echo "── Status ─────────────────────────────────────────────────"
docker compose -f docker-compose.prod.yml ps

echo ""
echo "Deploy complete."
