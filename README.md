# UHI Weekly — Newsletter Web App

A full-stack newsletter app built with **Next.js 14** and **Resend** for real email delivery.

## Features
- 📰 Public newsletter feed (Scholarships, Jobs, AI Tips)
- 📬 Email subscribe with instant welcome email via Resend
- 🔐 Password-protected admin panel
- ✍️ Publish posts — subscribers auto-notified by email
- 📣 Manual newsletter blast to all subscribers
- 👥 Subscriber list management

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Resend (free)
1. Go to [resend.com](https://resend.com) and create a free account
2. Navigate to **API Keys** → **Create API Key**
3. Copy your API key

### 3. Configure environment variables
```bash
cp .env.local.example .env.local
```
Then edit `.env.local`:
```
RESEND_API_KEY=re_your_actual_key_here
RESEND_FROM=UHI Weekly <you@yourdomain.com>
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note on RESEND_FROM:** For testing, use `onboarding@resend.dev` (Resend's shared domain).
> For production, [verify your own domain](https://resend.com/docs/dashboard/domains/introduction) in the Resend dashboard.

### 4. Run locally
```bash
npm run dev
```
Visit:
- **Newsletter:** http://localhost:3000
- **Admin:** http://localhost:3000/admin

---

## Deploy to Vercel (recommended, free)

```bash
npm install -g vercel
vercel
```

Then add your environment variables in **Vercel Dashboard → Settings → Environment Variables**.

---

## Production: Persistent Database

The app currently uses an **in-memory store** — data resets on server restart. For production, replace `lib/store.js` with a real database:

| Option | Cost | Notes |
|--------|------|-------|
| **Supabase** (PostgreSQL) | Free tier | Easiest, has dashboard |
| **PlanetScale** (MySQL) | Free tier | Serverless-friendly |
| **MongoDB Atlas** | Free tier | Flexible schema |
| **Upstash Redis** | Free tier | Ultra-fast, simple |

---

## File Structure
```
uhi-weekly/
├── app/
│   ├── page.js           # Public newsletter homepage
│   ├── admin/page.js     # Admin panel (password protected)
│   ├── globals.css       # All styles
│   ├── layout.js         # Root layout + fonts
│   └── api/
│       ├── subscribe/    # POST — subscribe + send welcome email
│       ├── posts/        # GET posts / POST new post + notify
│       ├── blast/        # POST — send newsletter to all subs
│       └── admin/        # GET stats / DELETE subscriber
├── lib/
│   ├── store.js          # In-memory data store
│   └── emails.js         # HTML email templates
├── .env.local.example    # Environment variable template
└── package.json
```

---

## Email Templates
Three beautiful HTML emails are included:
- **Welcome email** — sent when someone subscribes
- **New post notification** — sent to all subscribers when you publish
- **Newsletter blast** — sent manually from the admin panel
