# MIBM website

You lead the impact. We run the business.

The official MIBM website: business management for Muslim entrepreneurs, creators and changemakers.

## Stack

- React 18, TypeScript, Vite
- Tailwind CSS 3 (brand tokens in `tailwind.config.js`)
- GSAP + ScrollTrigger for the hero and scroll storytelling
- React Router for pages
- Fonts are self-hosted through Fontsource: Poppins, Inter, IBM Plex Sans Arabic

## Run it

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # also regenerates public/sitemap.xml and robots.txt
```

## Where to edit content

Text, services and tiers are kept out of the components:

| What | File |
| --- | --- |
| Name, contact, domain, form endpoint | `src/data/site.ts` |
| Four chains, method, services, audiences, values, tiers | `src/data/content.ts` |
| Insights articles | `src/data/insights.ts` |
| Colors and type scale | `tailwind.config.js`, `src/styles/index.css` |

## Founder to confirm before launch

Every item is marked `TODO(founder)` in the code.

1. **Name expansion.** `site.legalName` is "MIBM | Muslim Business Management". Confirm or change it to "Muslim Influencers Business Management".
2. **Engagement tiers and prices.** No prices have been agreed yet. `tiers` in `content.ts` shows "Priced after the first call" until `price` is set.
3. **Domain.** Set `VITE_SITE_URL` (or `SITE_URL` at build time) so canonical links, Open Graph URLs and the sitemap use the live domain. It defaults to `https://mibm.lovable.app`.
4. **Booking form.** Set `VITE_FORM_ENDPOINT` to a URL that accepts a JSON POST (Formspree, a Supabase edge function, a Make/Zapier webhook). Until it is set, the form tells the visitor plainly that nothing was sent, and offers copy, WhatsApp or email instead.
5. **Contact.** Add the email and WhatsApp number in `site.contact` to enable those buttons.
6. **Open Graph image.** Add `public/og-image.png` (1200×630) and `public/apple-touch-icon.png` (180×180).

## Environment variables

```
VITE_SITE_URL=https://your-domain.com
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxx
```

## Lovable

This repository is the source of truth. All code changes are made here, by commit. Lovable is used only to host and preview, never to generate.

Lovable cannot import an existing repository directly; it links a project to a repository it creates. To use Lovable without spending AI credits:

1. In Lovable, create a new blank project named **MIBM**. Do not send it a prompt.
2. Open **Settings → GitHub → Connect** and let Lovable create its repository.
3. Push this codebase into that repository (replace its contents). Lovable syncs from GitHub automatically.
4. Publish from Lovable. From then on, commit to GitHub; Lovable picks up each push.

Any static host also works without Lovable: build command `npm run build`, output directory `dist`, with all routes rewritten to `/index.html`.

## Structure

```
src/
  components/
    brand/        Logo, mark, hilal, arch, horizon (SVG)
    layout/       Layout, footer, page hero
    navigation/   Header and mobile menu
    sections/     Homepage sections
    forms/        Diagnosis booking form
  pages/          Route pages
  data/           Editable content
  hooks/          SEO
  lib/            Motion setup
  styles/         Global styles
```
