#!/usr/bin/env bash
# Generate trusted SSL certificate using mkcert for local development
#
# Usage:
#   bash scripts/gen-cert.sh                    # auto-detect local IP
#   bash scripts/gen-cert.sh 192.168.31.28      # specify IP explicitly

set -e

CERTS_DIR="$(dirname "$0")/../apps/web-app/certs"
mkdir -p "$CERTS_DIR"

if ! command -v mkcert &>/dev/null; then
  echo "❌ mkcert not found. Install it: brew install mkcert && mkcert -install"
  exit 1
fi

# Detect local IP if not provided
if [ -n "$1" ]; then
  LOCAL_IP="$1"
else
  LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}')
fi

if [ -z "$LOCAL_IP" ]; then
  echo "❌ Could not detect local IP. Pass it as argument: bash scripts/gen-cert.sh 192.168.x.x"
  exit 1
fi

echo "🔐 Generating trusted certificate for: localhost, 127.0.0.1, $LOCAL_IP"

mkcert \
  -key-file "$CERTS_DIR/key.pem" \
  -cert-file "$CERTS_DIR/cert.pem" \
  localhost 127.0.0.1 "$LOCAL_IP"

echo ""
echo "✅ Done! Next steps:"
echo "  1. Run: pnpm --filter @devolution/web-app dev:https"
echo "  2. In BotFather set Mini App URL: https://${LOCAL_IP}:3000"
echo "  3. Restart Telegram Desktop, then open your Mini App"
