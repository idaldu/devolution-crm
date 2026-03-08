# Devolution CRM

Modern fullstack monorepo with NestJS + Next.js and auto-generated API client.

## Stack

- **Package manager**: pnpm
- **Monorepo**: Turborepo
- **Backend**: NestJS (port 3001)
- **Frontend**: Next.js App Router (port 3000)
- **Database**: Drizzle ORM + PostgreSQL
- **API client**: heyapi + TanStack Query
- **UI**: shadcn/ui + TailwindCSS

## Quick Start

```bash
# Install dependencies
pnpm install

# Copy env file and configure
cp .env.example .env

# Run development servers
pnpm dev
```

## Available Commands

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start all dev servers                   |
| `pnpm build`        | Build all packages                      |
| `pnpm lint`         | Lint all packages                       |
| `pnpm typecheck`    | Type check all packages                 |
| `pnpm generate:api` | Generate API client from OpenAPI schema |
| `pnpm db:migrate`   | Run database migrations                 |

## Structure

```
.
├── apps/
│   ├── api/          # NestJS backend
│   └── web-app/      # Next.js frontend
└── packages/
    ├── api-client/   # Auto-generated API client (heyapi)
    ├── database/     # Drizzle ORM schema & client
    ├── ui/           # Shared UI components (shadcn/ui)
    └── config/       # Shared configs (tsconfig, eslint, prettier)
```

## Ports

- API: http://localhost:3001
- Web App: http://localhost:3000
- API Docs: http://localhost:3001/docs
