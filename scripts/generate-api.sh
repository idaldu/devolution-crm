#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🚀 Generating OpenAPI schema from NestJS..."
cd "$ROOT_DIR/apps/api"
node_modules/.bin/ts-node -r tsconfig-paths/register src/generate-openapi.ts

echo "📦 Generating API client with heyapi..."
cd "$ROOT_DIR/packages/api-client"
node_modules/.bin/openapi-ts -f openapi-ts.config.ts

echo "✅ API client generated at packages/api-client/src/generated/"
