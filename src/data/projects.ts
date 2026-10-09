import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import productTrimmerShot from '../assets/work/product-trimmer.jpg';
import parrotShot from '../assets/work/parrot.jpg';
import thinkTwiceShot from '../assets/work/think-twice.jpg';

/**
 * Showcase projects. Add a project by appending an object to `projects`.
 * Only `featured: true` projects are rendered (in array order; the first gets the
 * large slot), followed by the "Your project could be next" block. Link a repo only
 * if it is public.
 *
 * Screenshots: put an image in src/assets/work/ (~1200×750, 16:10), import it at the
 * top of this file and set `image: thatImport`. Astro turns it into responsive
 * AVIF/WebP at build time. Without `image`, a generated placeholder (project name +
 * a moon phase) is used.
 */

export type ProjectStatus = 'in-development' | 'early-access' | 'beta' | 'live';
export type ProjectLinkKind = 'site' | 'demo' | 'appStore' | 'playStore' | 'github';

export interface Project {
  id: string;
  name: string;
  featured: boolean;
  status: ProjectStatus;
  /** One-line problem → solution, per language. */
  summary: Record<Lang, string>;
  platforms: Record<Lang, string[]>;
  stack: string[];
  links: { kind: ProjectLinkKind; href: string }[];
  /** Moon phase (0 new, 0.5 half, 1 full) drawn on the placeholder art until a screenshot exists. */
  placeholderPhase: number;
  /** Optional screenshot, imported from src/assets/work/. */
  image?: ImageMetadata;
}

export const projects: Project[] = [
  {
    id: 'parrot',
    name: 'Parrot',
    featured: true,
    status: 'early-access', // coming soon to Google Play; early access by email (parrotapp.dev, 2026-10)
    summary: {
      en: 'Read it. Hear it. Never lose your place. Parrot is a reader for your own ebooks and audiobooks: it highlights each sentence as the narrator reads and keeps your place in sync between the ebook and the audiobook. Works with Storyteller and Audiobookshelf servers.',
      sl: 'Berite, poslušajte in nikoli ne izgubite mesta. Parrot je bralnik za vaše lastne e-knjige in zvočne knjige: med branjem pripovedovalca označi vsak stavek in usklajuje mesto med e-knjigo in zvočno knjigo. Deluje s strežniki Storyteller in Audiobookshelf.',
    },
    platforms: {
      en: ['Android phones, tablets and e-ink readers', 'iPhone version in the works'],
      sl: ['Telefoni, tablice in bralniki z e-črnilom (Android)', 'različica za iPhone je v pripravi'],
    },
    stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Ktor', 'SQLDelight'],
    links: [
      { kind: 'site', href: 'https://parrotapp.dev/' },
      { kind: 'github', href: 'https://github.com/RetRo99/Parrot' },
    ], // TODO: add the Google Play link when published
    placeholderPhase: 0.32,
    image: parrotShot, // frame from the app tour video on parrotapp.dev
  },
  {
    id: 'product-trimmer',
    name: 'Product Trimmer',
    featured: true,
    status: 'live',
    summary: {
      en: 'Draw around a product in a photo and get a clean, full-resolution cutout on white or transparent. The AI model runs entirely in your browser, so your images never leave your device.',
      sl: 'Izdelek na fotografiji obkrožite in dobite čist izrez v polni ločljivosti, na beli ali prozorni podlagi. Model umetne inteligence teče v celoti v vašem brskalniku, zato slike nikoli ne zapustijo vaše naprave.',
    },
    platforms: { en: ['Web (runs in the browser)'], sl: ['Splet (deluje v brskalniku)'] },
    stack: ['Transformers.js', 'WebGPU', 'WASM', 'BiRefNet', 'U²-Net'],
    links: [
      { kind: 'demo', href: 'https://kcvete.github.io/product-trimmer/' },
      { kind: 'github', href: 'https://github.com/kcvete/product-trimmer' },
    ],
    placeholderPhase: 0.15,
    image: productTrimmerShot, // captured from the live demo
  },
  {
    id: 'think-twice',
    name: 'Think Twice',
    featured: true,
    status: 'in-development',
    summary: {
      en: 'Think Twice puts a calm pause between you and the apps you open on autopilot: it asks why now, for how long and how you feel, nudges you when time is up, and shows what usually pulls you in.',
      sl: 'Think Twice postavi miren premor med vas in aplikacije, ki jih odpirate samodejno: vpraša, zakaj ravno zdaj, za koliko časa in kako se počutite, opozori, ko čas poteče, in pokaže, kaj vas najpogosteje potegne vanje.',
    },
    platforms: { en: ['Android'], sl: ['Android'] },
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'Accessibility service', 'Lottie'],
    links: [], // private repository; no store link yet
    placeholderPhase: 0.5,
    image: thinkTwiceShot, // composed from the redesigned app screens (Oct 2026)
  },
  {
    id: 'bardy',
    name: 'Bardy',
    featured: true,
    status: 'in-development', // TODO: confirm status
    summary: {
      en: 'Board-game nights without the rulebook detours: Bardy the AI gameknight answers rules questions and guides players through each game — a mobile app, a NestJS backend and an admin panel.',
      sl: 'Družabni večeri brez listanja po pravilih: Bardy, vitez družabnih iger z umetno inteligenco, odgovarja na vprašanja o pravilih in igralce vodi skozi igro — mobilna aplikacija, zaledje v NestJS in skrbniška plošča.',
    },
    platforms: { en: ['Mobile app', 'Web admin panel', 'Backend'], sl: ['Mobilna aplikacija', 'Spletna skrbniška plošča', 'Zaledje'] }, // TODO: confirm platforms (Android/iOS?)
    stack: ['Kotlin', 'React', 'NestJS', 'LLMs'],
    links: [], // TODO: store links / website (repo kcvete/ai-bardly is private, so no source link)
    placeholderPhase: 0.62,
    // image: bardyShot, // TODO: real screenshot in src/assets/work/
  },
  {
    id: 'hestia',
    name: 'Hestia',
    featured: false, // TODO: decide whether to feature; confirm summary copy
    status: 'in-development', // TODO: confirm status
    summary: {
      en: 'A self-hosted AI recipe library: import recipes from anywhere, search them instantly and cook from a calm, focused view.',
      sl: 'Samogostujoča knjižnica receptov z umetno inteligenco: recepte uvozite od koderkoli, jih takoj najdete in kuhate v mirnem, osredotočenem pogledu.',
    },
    platforms: { en: ['Web', 'Backend'], sl: ['Splet', 'Zaledje'] },
    stack: ['FastAPI', 'SvelteKit', 'SQLite FTS5'],
    links: [], // TODO: links
    placeholderPhase: 0.9,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
