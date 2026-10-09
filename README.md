# Lunaria landing page

Bilingual (English + Slovenian) one-page site for a four-person software studio from Slovenia.
"Lunaria" is a working name: see [Renaming the studio](#renaming-the-studio).

Built with [Astro](https://astro.build) 7, static output, plain CSS, a few KB of JavaScript
(the hero scene loads lazily), self-hosted fonts and no third-party requests at runtime. Hosted as a GitHub Pages project site at
<https://kcvete.github.io/lunaria-landing/> (see [Hosting](#hosting)).

**Design direction.** Reading this as: a software studio named after the honesty plant (Lunaria
annua), whose seed pods dry into small silver moons. A deep blue night with a glowing moon made
of 0s and 1s over a moonlit field of Lunaria; one hue of blue-black neutrals (OKLCH) with a
single pearl-silver accent and violet only in the flower centres; a seed-pod logo; plant-growth
stages as process markers; Montserrat for headings and Hanken Grotesk for reading; left-aligned,
asymmetric layouts.

## Commands

Node 22 and npm 10.

```sh
npm install       # once
npm run dev       # dev server at http://localhost:4321/lunaria-landing/ (Slovenian at …/sl/)
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
  components/          one component per section, plus CodeMoon, PodStage, LogoMark and LangSwitch
  lib/codeMoon.ts      build-time renderer for the moon made of 0s and 1s
  scripts/field-scene.ts  the hero's moonlit field of Lunaria (canvas, loaded lazily)
  lib/url.ts           withBase(): every internal URL goes through it
  layouts/Base.astro   <head>: meta, hreflang, OG/Twitter, JSON-LD, fonts
  pages/index.astro    English  -> /
  pages/sl/index.astro Slovenian -> /sl/
  pages/stars.svg.ts   generates the star-field tile at build time
  pages/robots.txt.ts  robots.txt, driven by PREVIEW_NOINDEX
  pages/privacy.astro  privacy notice (EN); pages/sl/zasebnost.astro is the SL page
  components/Cta.astro the one call to action: same label and destination everywhere
  lib/fill.ts          fills {city} {days} {minutes} … in copy from config ([TODO] when empty)
  data/testimonials.ts client quotes (section hidden while empty)
  assets/work/         project screenshots (optimised to AVIF/WebP at build time)
  assets/team/         team portraits (optimised to WebP at build time)
  styles/global.css    design tokens (OKLCH) and shared styles
public/
  .nojekyll            tells GitHub Pages not to run Jekyll
  work/                project screenshots (empty for now)
  og.jpg, og-sl.jpg    share images (captures of each hero)
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
  image: myAppShot,               // optional; import a ~1200×750 (16:10) file from src/assets/work/ at the top of the file
}
```

The first featured project gets the large slot; the second sits offset beside it; any further
featured projects span the full width. The "Your project could be next" block always follows.

## Renaming the studio

Change `SITE_NAME` in `src/config.ts`. The wordmark, page titles, meta tags, footer, JSON-LD and
the mailto subject all read from it. Also update `SITE_URL` and `CONTACT_EMAIL`, regenerate
`public/og.jpg` and `public/og-sl.jpg`, and change `"name"` in `package.json` if you like.

## The hero: a moonlit field of Lunaria

`src/scripts/field-scene.ts` draws the field on a canvas behind the lower part of the hero:

- **Deterministic:** every flower, pod, bud and leaf comes from a seeded PRNG, so every visit sees the same field.
- **Sprites, not per-frame drawing:** blooms (four obovate petals with a claw, translucent gradient,
  veins, a moon-side rim and a glint, each tilted in 3D), side views, buds and flat seed pods are
  drawn once into small offscreen canvases. A frame only stamps sprites and strokes one stem per plant.
- **Depth:** the far field and mist are painted once into a blurred backdrop; clumped middle rows and
  a few large foreground blooms animate; a band of moonlight runs towards the moon.
- **Motion:** each plant sways with its own phase (near plants more), a gust wave crosses the field
  about every 14 s, and glints twinkle. It pauses when the hero is off-screen or the tab is hidden;
  with `prefers-reduced-motion` it renders one static frame.
- **Performance:** the script loads when the page is idle (≈4.5 KB gzipped) and builds its sprites and
  backdrop in idle-time slices, so there are no long tasks; the headline stays the largest paint.
  Device pixel ratio is capped at 2 and phones get fewer plants.

The moon above it is the build-time code moon described below, with a CSS glow and a soft disc behind it.

### The moon made of code

`src/lib/codeMoon.ts` lights each character cell like a point on a sphere (Lambert shading from a
sun angle set by the phase), multiplies it by an albedo map of the near-side maria, and quantises
the result into six shade levels. Bright cells lean towards `0` (more ink), dim ones towards `1`.
Runs of the same level share one `<span>` and the most common level needs none, so the hero moon
is about 12 KB of HTML (≈1.3 KB gzipped). A dozen digits flip 0↔1 with a CSS opacity animation,
which stops under `prefers-reduced-motion`. The text uses the system monospace stack (no font file)
and its size follows the container width (`cqi` units), so it never overflows.

`<CodeMoon cols={84} lit={0.8} flips={14} />`: `cols` is the resolution, `lit` the phase
(0 new … 0.5 half … 1 full).

## Hosting

The site is set up for GitHub Pages at `https://kcvete.github.io/lunaria-landing/`:

- `astro.config.mjs` sets `site` (from `SITE_URL` in `src/config.ts`) and
  `base: process.env.BASE_PATH ?? '/lunaria-landing'`.
- All internal links and assets go through `withBase()` (`src/lib/url.ts`), and the star-field URL
  is set as a CSS variable in `Base.astro`. Write new paths without a leading slash and wrap them in `withBase()`.
- `.github/workflows/deploy.yml` builds with `withastro/action` and publishes with
  `actions/deploy-pages` on every push to `main` (or by hand from the Actions tab).
  One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**.

**Moving to a custom domain:** set `SITE_URL` in `src/config.ts` to `https://your.domain` and build
with `BASE_PATH=''` (in the workflow, uncomment the `env:` block). Then add the domain under Settings → Pages.

**Preview mode:** while `PREVIEW_NOINDEX = true` in `src/config.ts`, every page carries
`<meta name="robots" content="noindex, nofollow">` and `robots.txt` disallows everything.
Crawlers only read `robots.txt` at a domain root, so on the github.io sub-path the meta tag does the work.
Lighthouse's SEO score shows 66 in this mode because of the noindex; it is 100 with the flag off.

## Before launch

Every placeholder is listed here. In code they are marked `TODO`
(`grep -rn TODO src`).

**`src/config.ts`**
- [ ] `SITE_NAME`: confirm the final studio name (currently the working name "Lunaria").
- [ ] `PREVIEW_NOINDEX`: set to `false` so search engines may index the site.
- [ ] `SITE_URL`: real domain (used for canonical, hreflang and OG URLs). Currently `https://kcvete.github.io`; with a custom domain also build with `BASE_PATH=''`.
- [ ] `CONTACT_EMAIL`: real inbox. Currently `hello@lunaria.example`.
- [ ] `BOOKING_URL`: Cal.com/Calendly link. Empty, so every "Book a free consultation" button scrolls to the contact form (and the contact section shows no booking button).
- [ ] `FORM_ACTION`: form backend (Formspree, Basin, own endpoint). Empty, so the form opens the visitor's email app with the message filled in and shows a "your email app should be open" state. With an endpoint the form posts via fetch, shows a thank-you state (plus a booking button when `BOOKING_URL` is set) and uses a `_gotcha` honeypot.
- [x] `CITY`: Ljubljana (JSON-LD). The visible location line is copy in `services.location` (EN/SL).
- [x] `QUOTE_WORKING_DAYS`: 5 ("written spec and fixed quote within 5 working days").
- [ ] **Required before the real launch:** `LEGAL` + `SHOW_IMPRINT`. Fill company name and legal form (s.p./d.o.o.), address, matična številka and davčna številka/ID za DDV, then set `SHOW_IMPRINT = true` to show the footer imprint (ZEPT Art. 5). The privacy notice currently names "the Lunaria team" as controller; GDPR Art. 13 needs the legal entity named there too (edit `privacy.sections[0]` in both languages). Optionally set `LEGAL.emailProvider`. Have the notice reviewed once the entity exists. Owner decision (2026-10): hidden until the entity is decided.
- [x] `SHOW_PRICING`: stays `false` (owner decision: no published prices; every project gets a fixed quote after the free call). The `faq.pricing` structure is kept for later.
- [ ] Analytics (optional): wire a cookieless tool by defining `window.track` in `Base.astro`. The page already emits `booking_click` and `form_submit`. Update the privacy notice and the "no analytics" sentences if you do.
- [ ] `SOCIAL.github` / `SOCIAL.linkedin`: optional studio profiles (hidden while empty).
- [ ] `OG_IMAGE`: replace `public/og.jpg` and `public/og-sl.jpg` (currently 1200×630 captures of each hero) with designed share images.

**`src/data/projects.ts`**
- [ ] Parrot: confirm status ("In development"); add App Store / Google Play links; add a screenshot to `public/work/`.
- [ ] Bardy: confirm status and platforms (shown as mobile app, web admin panel, backend); add links; add a screenshot.
- [ ] Hestia: decide whether to feature it (`featured: false`); confirm the summary and status.
- [ ] Product Trimmer: decide whether to feature it (`featured: false`). Its live demo link is already set.

**`src/data/team.ts`**
- [x] Team photos and LinkedIn links for all four (photos in `src/assets/team/`, optimised to WebP; `photo: null` falls back to initials for future members).
- [ ] Optional: higher-resolution originals for Kevin, Zane and Aneja (the current ones are cropped from 200×200 LinkedIn photos, slightly soft on 2× screens). Rok's is 460×460.
- [ ] Aneja: portfolio URL (optional).

**Copy (`src/i18n/en.ts`, `src/i18n/sl.ts`)**
- [ ] Confirm the job titles ("Backend engineer, co-founder", "Mobile engineer, co-founder", "Business process analyst", "Graphic designer") and whether Zane and Aneja should also be listed as co-founders.
- [ ] Audience: confirm "startups and growing businesses" (`audience` constant at the top of `en.ts` / `sl.ts`).
- [ ] AI data handling: confirm the sentence "Your code and data are never used to train AI models" matches the terms of the AI tools you use.
- [ ] Testimonials: add real, attributed quotes to `src/data/testimonials.ts` (the section stays hidden while empty).
- [ ] Timeline FAQ: confirm "4 to 12 weeks" for a typical first version.
- [ ] Contact form budget options (under €10k / €10–25k / €25–50k / over €50k): confirm the brackets.
- [ ] Confirm the promises "We reply within 1 working day", "free 30-minute call, no obligation" and "Weekly demos" are ones you will keep.
- [ ] Have a native speaker do a final read of `sl.ts`.

**Other**
- [ ] Add a privacy notice if the form backend stores submissions (GDPR).
- [ ] Hosting: create the GitHub repo `kcvete/lunaria-landing`, push `main`, and set Pages → Source to GitHub Actions. Nothing is deployed yet.
