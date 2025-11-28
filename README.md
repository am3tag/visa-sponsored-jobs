# Visa Sponsored Jobs (v2.2)

A polished Next.js 14 app to list **visa sponsored jobs** with a secure **admin dashboard**, **Google Ads (test)**, and a clean LinkedIn-style UI.

## ✨ Features

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (blue / white professional theme)
- Prisma + PostgreSQL (Neon / Supabase / etc.)
- JWT-based admin auth with HTTP-only cookie
- Admin dashboard to **create** and **delete** jobs
- Public jobs page with:
  - One job card per row
  - Client-side search + location filter
  - Google **Test Ads** every 3rd job (configurable)
- Header logo + favicon
- Footer: “Made with 💙 by Girish Ameta”

## 🧰 Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set at least:

- `DATABASE_URL` – Postgres URL (Neon, Supabase, Railway…)
- `JWT_SECRET` – a long random string

You can override `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`.

## 🗄️ Prisma migrate & seed

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

This will:

- Create tables for `Job` and `AdminUser`
- Create an admin user (`girish` / `Sqli@1337` by default)
- Insert a few example visa-sponsored jobs

## 🚀 Run locally

```bash
npm run dev
```

- Public jobs page: `http://localhost:3000/`
- Admin login: `http://localhost:3000/admin/login`
- Admin dashboard: `http://localhost:3000/admin` (after login)

## 💰 Google Ads (Test Mode)

Ads are wired using Google **test IDs** and are shown **every 3rd job card**.

Control via `.env`:

```env
NEXT_PUBLIC_ADSENSE_ENABLED="true"        # set to "false" to hide all ads
NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-0000000000000000"
NEXT_PUBLIC_ADSENSE_SLOT="1234567890"
```

When you're ready to go live, replace these with your real AdSense client & slot IDs.

## ☁️ Deploying to Vercel

1. Push this project to GitHub / GitLab.
2. Create a new Vercel project and import the repo.
3. In **Vercel → Project → Settings → Environment Variables**, set:

   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_ADSENSE_ENABLED`
   - `NEXT_PUBLIC_ADSENSE_CLIENT`
   - `NEXT_PUBLIC_ADSENSE_SLOT`

4. Trigger a deploy.

The app is fully compatible with serverless environments like Vercel (uses PostgreSQL, not SQLite).

---

Made with 💙 by [Girish Ameta](https://www.linkedin.com/in/girishameta/)
