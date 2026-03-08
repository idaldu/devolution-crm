#!/usr/bin/env bash
# Generate self-signed SSL certificate for local development
# Covers localhost, 127.0.0.1, and your local network IP
#
# Usage:
#   bash scripts/gen-cert.sh                    # auto-detect local IP
#   bash scripts/gen-cert.sh 192.168.31.28      # specify IP explicitly

set -e

CERTS_DIR="$(dirname "$0")/../apps/web-app/certs"
mkdir -p "$CERTS_DIR"

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

echo "🔐 Generating certificate for: localhost, 127.0.0.1, $LOCAL_IP"

openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout "$CERTS_DIR/key.pem" \
  -out "$CERTS_DIR/cert.pem" \
  -days 365 \
  -subj "/CN=localhost" \
  -addext "subjectAltName=IP:127.0.0.1,IP:${LOCAL_IP},DNS:localhost"

echo "✅ Certificate saved to apps/web-app/certs/"
echo ""
echo "Next steps:"
echo "  1. Trust the cert in your browser: open apps/web-app/certs/cert.pem"
echo "  2. Run: pnpm --filter @devolution/web-app dev:https"
echo "  3. In BotFather set URL: https://${LOCAL_IP}:3000"
