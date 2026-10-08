# Lunaria landing page

Bilingual (English + Slovenian) one-page site for a two-person software studio from Slovenia.
"Lunaria" is a working name: see [Renaming the studio](#renaming-the-studio).

Built with [Astro](https://astro.build) 7, static output, plain CSS, under 1 KB of inline JavaScript,
self-hosted fonts and no third-party requests at runtime.

**Design direction.** Reading this as: a calm night-sky observing chart for two senior engineers.
Deep blue-black tinted neutrals (one hue, OKLCH), a single moonlight accent, a hand-built SVG moon
with real maria and phase geometry as the one memorable element, Familjen Grotesk for headings and
Literata for reading, left-aligned asymmetric layouts and one load sequence.

## Commands

Node 22 and npm 10.

```sh
npm install       # once
npm run dev       # dev server at http://localhost:4321 (Slovenian at /sl/)
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
npm run check     # TypeScript and Astro diagnostics
```

The build downloads the two font families from Fontsource once and copies them into
`dist/_astro/fonts/`, so the build machine needs internet access. The finished site makes no outside requests.

## Where things live

```
src/
  config.ts            studio name, domain, email, booking URL, form endpoint, socials (all launch TODOs)
  i18n/
    en.ts              English copy. Its shape is the contract for every language.
    sl.ts              Slovenian copy (formal "vi"), typed against en.ts
    index.ts           language list, useTranslations()
  data/
    projects.ts        showcase projects (typed; per-language summaries)
    team.ts            team members (photo, links; role/bio copy is in i18n)
  components/          one component per section, plus Moon/MoonDefs (SVG moon) and LangSwitch
  layouts/Base.astro   <head>: meta, hreflang, OG/Twitter, JSON-LD, fonts
  pages/index.astro    English  -> /
  pages/sl/index.astro Slovenian -> /sl/
  pages/stars.svg.ts   generates the star-field tile at build time
  styles/global.css    design tokens (OKLCH) and shared styles
public/
  team/                portraits
  work/                project screenshots (empty for now)
  og.png               share image (placeholder: a capture of the hero)
```

## Editing copy and translations

All visible text is in `src/i18n/en.ts` and `src/i18n/sl.ts`. Components contain no copy.
`sl.ts` is typed as `Dict` (the type of `en.ts`), so when you add or rename a key in `en.ts`,
`npm run check` or `npm run build` reports exactly where the Slovenian copy is missing.

Project summaries are the only exception: they sit next to the project data in
`src/data/projects.ts` as `{ en, sl }`.

To add a language: add it to `i18n.locales` in `astro.config.mjs` and to `languages` in
`src/i18n/index.ts`, create `src/i18n/<code>.ts`, register it in `dictionaries`, and add
`src/pages/<code>/index.astro` containing `<Landing lang="<code>" />`.

## Adding a project

Append an object to `projects` in `src/data/projects.ts`:

```ts
{
  id: 'my-app',
  name: 'My App',
  featured: true,                 // only featured projects are shown, in array order
  status: 'live',                 // 'in-development' | 'beta' | 'live'
  summary: { en: '…', sl: '…' },
  platforms: { en: ['iOS', 'Android'], sl: ['iOS', 'Android'] },
  stack: ['Kotlin Multiplatform', 'NestJS'],
  links: [{ kind: 'appStore', href: 'https://…' }], // site | demo | appStore | playStore | github
  placeholderPhase: 0.4,          // moon phase on the placeholder art (0 new … 1 full)
  image: '/work/my-app.webp',     // optional; ~1200×750 (16:10) in public/work/
}
```

The first featured project gets the large slot; the second sits offset beside it; any further
featured projects span the full width. The "Your project could be next" block always follows.

## Renaming the studio

Change `SITE_NAME` in `src/config.ts`. The wordmark, page titles, meta tags, footer, JSON-LD and
the mailto subject all read from it. Also update `SITE_URL` and `CONTACT_EMAIL`, regenerate
`public/og.png`, and change `"name"` in `package.json` if you like.

## Before launch

Every placeholder is listed here. In code they are marked `TODO`
(`grep -rn TODO src`).

**`src/config.ts`**
- [ ] `SITE_NAME`: confirm the final studio name (currently the working name "Lunaria").
- [ ] `SITE_URL`: real domain (used for canonical, hreflang and OG URLs). Currently `https://lunaria.example`.
- [ ] `CONTACT_EMAIL`: real inbox. Currently `hello@lunaria.example`.
- [ ] `BOOKING_URL`: Cal.com/Calendly link. Empty, so every "Book a call" button scrolls to the contact section.
- [ ] `FORM_ACTION`: form backend (Formspree, Basin, own endpoint). Empty, so the form submits via `mailto:` and shows a note saying so.
- [ ] `SOCIAL.github` / `SOCIAL.linkedin`: optional studio profiles (hidden while empty).
- [ ] `OG_IMAGE`: replace `public/og.png` (currently a 1200×630 capture of the hero) with a designed share image.

**`src/data/projects.ts`**
- [ ] Parrot: confirm status ("In development"); add App Store / Google Play links; add a screenshot to `public/work/`.
- [ ] Bardy: confirm status and platforms (shown as mobile app, web admin panel, backend); add links; add a screenshot.
- [ ] Hestia: decide whether to feature it (`featured: false`); confirm the summary and status.
- [ ] Product Trimmer: decide whether to feature it (`featured: false`). Its live demo link is already set.

**`src/data/team.ts`**
- [ ] Kevin: add a real portrait. His GitHub avatar (`public/team/kevin.png`) is an auto-generated identicon rather than a photo, so the page shows initials ("KC") until `photo` is set.
- [ ] Kevin: add a LinkedIn URL.
- [ ] Rok: replace the GitHub avatar (`public/team/rok.jpg`) with a chosen portrait if you prefer.

**Copy (`src/i18n/en.ts`, `src/i18n/sl.ts`)**
- [ ] Confirm the job titles ("Backend engineer, co-founder" and "Mobile engineer, co-founder").
- [ ] Pricing FAQ: decide whether to publish price ranges (currently "fixed quote after a free scoping call").
- [ ] Timeline FAQ: confirm "4 to 12 weeks" for a typical first version.
- [ ] Contact form budget options (under €10k / €10–25k / €25–50k / over €50k): confirm the brackets.
- [ ] Confirm the promises "Replies within 24 hours" and "Weekly demos" are ones you will keep.
- [ ] Have a native speaker do a final read of `sl.ts`.

**Other**
- [ ] Add a privacy notice if the form backend stores submissions (GDPR).
- [ ] Hosting: any static host works (`dist/`). Nothing is deployed yet.
