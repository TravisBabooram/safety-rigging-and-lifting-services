# Safety Rigging & Lifting Services — Project Context

> Read this file before making changes in this repo. It describes the actual
> stack and workflow in use here — do not assume a different framework or
> backend just because another project on this machine uses one.

---

## Git Discipline — read this first

**Never run `git commit`, `git push`, or any branch-changing command unless the
user explicitly asks for it in that message.** Finishing a task does not imply
permission to commit it. If you're unsure whether the user wants a commit,
ask — don't assume "done coding" means "commit it." This applies to every
session, not just the first time it's said.

---

## Project Identity

| Field | Value |
|---|---|
| Project Name | Safety Rigging & Lifting Services (SRLS) |
| Type | Marketing site + admin dashboard for a rigging & lifting consultancy in Trinidad |
| Status | In development — UI redesign in progress |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Vite | Build tool / dev server |
| React 18 + TypeScript | UI |
| React Router v6 | Client-side routing (this is a client-rendered SPA, no SSR) |
| Tailwind CSS + shadcn/ui (Radix primitives) | Styling and component library |
| react-hook-form + zod | Form state and validation |
| @tanstack/react-query | Data fetching (installed; not yet used consistently — most pages call Supabase directly) |
| @dnd-kit | Drag-and-drop reordering in the admin dashboard |
| embla-carousel | Homepage hero carousel |
| lucide-react | Icons |
| Supabase | Postgres database, Auth, Storage, and one Edge Function (`send-contact-notification`) |

This project originated in Lovable (an AI site builder). The `lovable-tagger`
dev plugin and the `public/lovable-uploads/` folder have been removed as part
of Phase 1 cleanup (images now live in `public/assets/images/`) — don't
reintroduce Lovable-specific tooling going forward.

---

## Folder Structure

```
src/
├── pages/                     # Route components
│   ├── Index.tsx               # Home
│   ├── About.tsx, Services.tsx, Contact.tsx, ContactForm.tsx
│   ├── LiftPlanning.tsx, Sitemap.tsx, PrivacyTerms.tsx, NotFound.tsx
│   ├── AdminLogin.tsx, AdminDashboard.tsx
│   └── admin/                  # Admin-only routes (role-protected)
│       ├── DashboardHome.tsx, ManageServices.tsx, ManageDocuments.tsx
│       ├── ManagePages.tsx, ViewMessages.tsx
├── components/
│   ├── ui/                     # shadcn/Radix primitives — don't hand-edit, regenerate via shadcn CLI
│   ├── navigation.tsx, footer.tsx, scroll-to-top.tsx
│   ├── DynamicContent.tsx      # Renders editable content from the page_content table
│   ├── ProtectedRoute.tsx      # Role-gated route wrapper (admin/editor/viewer)
│   └── MaintenanceModeToggle.tsx, MaintenancePage.tsx
├── hooks/
│   ├── useAuth.tsx             # Supabase auth + role context
│   ├── useMaintenanceMode.tsx
│   └── usePageContent.tsx      # Reads/writes the page_content table
├── integrations/supabase/      # Generated Supabase client + DB types
└── lib/utils.ts

supabase/
├── migrations/                 # Schema + RLS policy history
└── functions/send-contact-notification/   # Edge Function for contact form emails

public/
├── assets/images/                # Site image assets
└── _redirects                    # Netlify SPA redirect rule
```

Admin routes (`/admin/*`) are gated by `ProtectedRoute` with a required role
(`admin`, `editor`, or `viewer`), backed by a `role` column on the Supabase
`users` table.

---

## Branch Strategy

- **`main`** — production. Treat as deployable at all times.
- **`ui-redesign`** — current active branch for the visual redesign. Do
  ongoing UI/UX work here unless told otherwise.
- Do not merge `ui-redesign` into `main`, and do not push either branch,
  without the user explicitly asking for it in that session (see Git
  Discipline above).

---

## Session Workflow

1. Confirm which branch you're on before making changes (`ui-redesign` is the
   working branch for the redesign).
2. Ask before merging, pushing, or committing — every time, regardless of
   what was approved in a previous session.
3. If a request implies a schema change, check `supabase/migrations/` for the
   current RLS setup before adding new tables or policies — this project has
   had real RLS bugs before (role escalation, infinite recursion), so new
   policies should be checked against `get_current_user_role()`, not just
   `auth.role() = 'authenticated'`.
