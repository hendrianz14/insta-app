# Insta App Starter

A full-stack SaaS starter kit built with **Next.js 14**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, **Supabase**, and **Stripe**. The project ships with an opinionated folder structure, Supabase helpers, payment adapters, database migrations, and automated tooling so you can ship new products faster.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router and Turbopack
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) primitives
- [Supabase](https://supabase.com/) authentication, database, and row level security policies
- [Stripe](https://stripe.com/) subscription billing helpers and webhook handlers
- [Vitest](https://vitest.dev/) and Testing Library for component testing

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env.local` and update each value for your project.

   ```bash
   cp .env.example .env.local
   ```

   Required values include Supabase credentials, Stripe keys, and a `DATABASE_URL` for running SQL migrations locally.

3. **Run database migrations and seed data (optional)**

   Ensure `DATABASE_URL` points to a Postgres instance you can reach, then run:

   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the marketing site. Authenticated dashboard routes live under `/dashboard` and are guarded by Supabase session middleware.

## Project Structure

```
app/
  (marketing)/       # Marketing pages, pricing, and auth
  (dashboard)/       # Authenticated dashboard experience
  api/               # Route handlers for Supabase auth & Stripe
components/
  layout/            # Layout primitives (dashboard shell)
  marketing/         # Landing page sections
  ui/                # shadcn/ui components
lib/
  payments/          # Stripe adapters
  supabase/          # Supabase clients (browser, server, service)
  env.*              # Environment variable parsing
  utils.ts           # Shared helpers
scripts/             # Database migration + seed runners
db/
  migrations/        # SQL migrations with RLS + RPC functions
  seed.sql           # Example seed data
```

## Available Commands

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `pnpm dev`         | Start the development server with Turbopack      |
| `pnpm build`       | Create an optimized production build              |
| `pnpm start`       | Run the production server                         |
| `pnpm lint`        | Lint the codebase using Next.js ESLint config     |
| `pnpm typecheck`   | Run TypeScript checks without emitting files      |
| `pnpm test`        | Execute the Vitest test suite                     |
| `pnpm db:migrate`  | Apply SQL migrations in `db/migrations`           |
| `pnpm db:seed`     | Seed the database with sample data                |

## Testing

Vitest is preconfigured with a JSDOM environment. Place tests in the `tests/` directory and use Testing Library helpers for React components.

```bash
pnpm test
```

## Deployment Notes

- Provide the Supabase project URL and anon key as public environment variables.
- Set `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `STRIPE_PRICE_ID` as server-side secrets.
- Configure the Stripe webhook endpoint to point to `/api/webhooks/stripe`.
- Update `NEXT_PUBLIC_APP_URL` to the production URL before deploying.

Happy shipping! 🚀
