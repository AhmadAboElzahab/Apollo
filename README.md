<p align="center">
  <img src="frontend/src/assets/logo.png" alt="Apollo Logo" width="180" />
</p>

<h1 align="center">Apollo</h1>
<p align="center">A full-stack music marketplace — sell artworks, beats, and lyrics — hosted entirely on Cloudflare for free.</p>

<p align="center">
  <a href="https://apollo-frontend-dkl.pages.dev">Live Site</a> •
  <a href="https://apollo-worker.ahmad-abo-elzahab.workers.dev">API Worker</a>
</p>

---

## Architecture

| Layer | Technology | URL |
|---|---|---|
| Frontend | React → Cloudflare Pages | `https://apollo-frontend-dkl.pages.dev` |
| Backend API | Cloudflare Worker (Hono) | `https://apollo-worker.ahmad-abo-elzahab.workers.dev` |
| Database | Cloudflare D1 (SQLite) | `apollo-db` |
| File Storage | Cloudflare R2 | `apollo-assets` |

Everything runs on Cloudflare's free tier — no Node.js server, no MongoDB, no S3.

---

## Project Structure

```
Apollo/
├── frontend/        # React app (Create React App)
│   ├── src/
│   │   ├── api.js   # Central URL helpers — apiUrl() and assetsUrl()
│   │   └── ...
│   └── .env         # Build-time env vars (see Environment Variables below)
│
└── worker/          # Cloudflare Worker (Hono + TypeScript)
    ├── src/
    │   ├── index.ts           # Route definitions
    │   ├── controllers/       # auth, artwork, audio, lyrics, category, promo, payment, user
    │   └── middleware/auth.ts # JWT middleware (Web Crypto API)
    ├── migrations/            # D1 SQL migration files
    ├── wrangler.toml          # Cloudflare config
    └── .dev.vars              # Local secrets (gitignored)
```

---

## Environment Variables

### Frontend — `frontend/.env`

Create this file before building or running locally:

```env
REACT_APP_API_URL=https://apollo-worker.ahmad-abo-elzahab.workers.dev
REACT_APP_ASSETS_URL=https://apollo-worker.ahmad-abo-elzahab.workers.dev/assets
```

For local development against a local Worker, change both to `http://localhost:8787` and `http://localhost:8787/assets`.

### Worker — `worker/.dev.vars`

Create this file for local `wrangler dev` sessions (gitignored, never committed):

```env
SECRET_KEY=replace-with-a-long-random-string
```

Generate a strong key with:
```bash
openssl rand -hex 32
```

In production, secrets are stored in Cloudflare and set with:
```bash
cd worker
CLOUDFLARE_ACCOUNT_ID=e9b49b479bdf1ac20f888e497f0c117d npx wrangler secret put SECRET_KEY
```

#### Optional secrets (disabled by default)

| Variable | Purpose |
|---|---|
| `EMAIL` | Sending address for MailChannels email |
| `EMAIL_PASSWORD` | Email password |
| `TELEGRAM_TOKEN` | Telegram bot token for sharing |
| `TELEGRAM_CHAT_ID` | Telegram channel/chat ID |

---

## Local Development

### Prerequisites

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) — `npm install -g wrangler`
- Cloudflare account logged in — `wrangler login`

### Run the Worker locally

```bash
cd worker
npm install
# create worker/.dev.vars with your SECRET_KEY first
npx wrangler dev
# Worker runs at http://localhost:8787
```

### Run the Frontend locally

```bash
cd frontend
npm install
# update .env to point to http://localhost:8787 for local Worker
npm start
# Opens http://localhost:3000
```

---

## Deployment

### Deploy the Worker

```bash
cd worker
npm install
CLOUDFLARE_ACCOUNT_ID=e9b49b479bdf1ac20f888e497f0c117d npx wrangler deploy
```

The Worker is live at:
`https://apollo-worker.ahmad-abo-elzahab.workers.dev`

### Run D1 database migrations

Only needed the first time or when new migration files are added:

```bash
cd worker
# Apply locally
npx wrangler d1 execute apollo-db --local --file=migrations/0001_initial.sql

# Apply to production
CLOUDFLARE_ACCOUNT_ID=e9b49b479bdf1ac20f888e497f0c117d \
  npx wrangler d1 execute apollo-db --remote --file=migrations/0001_initial.sql
```

### Deploy the Frontend

```bash
cd frontend
npm install
npm run build   # outputs to frontend/build/

CLOUDFLARE_ACCOUNT_ID=e9b49b479bdf1ac20f888e497f0c117d \
  npx wrangler pages deploy build --project-name apollo-frontend
```

The frontend is live at:
`https://apollo-frontend-dkl.pages.dev`

---

## First-Time Setup Checklist

- [ ] Set `SECRET_KEY` on the Worker: `wrangler secret put SECRET_KEY`
- [ ] Run D1 migrations against production (see above)
- [ ] Create an admin user via `POST /api/auth/register` with `role: "admin"`
- [ ] Add categories before creating products

---

## Features

- **Artworks** — upload `.webp` images, auto blurhash placeholder, like/unlike
- **Beats** — upload audio files, waveform player (Wavesurfer.js), like/unlike
- **Lyrics** — write and sell lyrics, like/unlike
- **Categories** — tag products by type (Artworks / Beats / Lyrics)
- **Cart & Checkout** — promo code support, payment recording
- **Purchase History** — per-user order history
- **Admin Panel** — manage all products, categories, promo codes, and accounting
- **Auth** — cookie-based JWT (HMAC-SHA256 via Web Crypto API), PBKDF2 password hashing

---

## Tech Stack

| | |
|---|---|
| Frontend | React, Tailwind CSS, SWR, Wavesurfer.js, Headless UI |
| Backend | Cloudflare Workers, Hono, TypeScript |
| Database | Cloudflare D1 (SQLite) |
| Storage | Cloudflare R2 |
| Auth | Web Crypto API (HMAC-SHA256 JWT + PBKDF2) |
| Images | Pure-JS blurhash, WebP |
