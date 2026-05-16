# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev         # Dev server with Turbopack (http://localhost:3000)
pnpm build       # Production build
pnpm lint        # ESLint
pnpm start       # Start production server
```

No test suite is configured.

## Architecture

Single-page Next.js App Router site for a pizza restaurant. All content is currently hardcoded as constants in `src/app/page.tsx`.

**Key patterns:**

- `src/app/page.tsx` — The entire homepage is one large `'use client'` component. Product data (featured pizzas, pizza of the day, special offers, etc.) is defined as constants at the top of this file.
- `src/app/layout.tsx` — Root layout with `ThemeProvider`, `PizzaLoader`, Vercel Analytics/SpeedInsights, and Schema.org JSON-LD for SEO.
- `src/components/ThemeProvider.tsx` — Custom dark/light mode context. Theme is persisted in `localStorage` under key `saboreos-theme`. Auto-enables dark mode between 19:00–04:00. Toggle triggers a full-screen sweep animation.
- `src/utils/whatsapp.ts` — All WhatsApp link generation. Phone number is hardcoded as `3123946614`. Every CTA button on the page goes through these helpers.
- `src/containers/Footer.js` — The only JS (non-TypeScript) file; uses SCSS module.

**Styling approach:** Tailwind CSS v4 is the primary styling tool. SCSS modules in `src/styles/` are used for a few components (Navbar, Footer, Home sections, PizzaLoader). Global styles in `src/app/globals.css`. Dark mode uses the `dark` class on `<html>` (Tailwind's class strategy).

**Images:** Local images are in `public/images/` (pizzas, comidas, preparacion categories). Remote images are served from Vercel Blob (`0dwas2ied3dcs14f.public.blob.vercel-storage.com` and `ipbxcphqipulqm7d.public.blob.vercel-storage.com`). Both domains are whitelisted in `next.config.ts`.

**Deployment:** Vercel. Analytics and Speed Insights are already integrated.
