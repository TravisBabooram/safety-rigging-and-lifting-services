# Safety Rigging & Lifting Services (SRLS)

Marketing site and admin dashboard for Safety Rigging & Lifting Services, a
rigging and lifting consultancy based in Trinidad. The public site covers
services, lift planning, company info, and a contact form; the `/admin`
section lets staff manage services, documents, page content, and contact
messages.

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **React Router v6** (client-rendered SPA, no SSR)
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **react-hook-form** + **zod** for forms and validation
- **Supabase** — Postgres database, Auth, Storage, and one Edge Function
  (`send-contact-notification`)

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (or access to the existing one)

### Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy the environment template and fill in your Supabase credentials:
   ```sh
   cp .env.example .env
   ```
   You'll need `VITE_SUPABASE_PROJECT_ID`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and
   `VITE_SUPABASE_URL` from your Supabase project's API settings.
3. Start the dev server:
   ```sh
   npm run dev
   ```
   The app runs at `http://localhost:8080`.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run build:dev` | Development-mode build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview a production build locally |

## Project Structure

```
src/
├── pages/           # Route components (public site + /admin)
├── components/      # Shared UI, including shadcn primitives in components/ui/
├── hooks/           # Auth, maintenance mode, page content
├── integrations/supabase/   # Supabase client + generated DB types
supabase/
├── migrations/      # Schema + RLS policy history
└── functions/       # Edge Functions
```

See `CLAUDE.md` for a fuller breakdown of the codebase and current branch
strategy.

## Database

Schema and Row Level Security policies live in `supabase/migrations/` and are
applied through the Supabase CLI or dashboard. There is no local database —
all environments talk to the Supabase project configured in `.env`.
