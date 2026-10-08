import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import productTrimmerShot from '../assets/work/product-trimmer.jpg';

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

export type ProjectStatus = 'in-development' | 'beta' | 'live';
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
    id: 'parrot',
    name: 'Parrot',
    featured: true,
    status: 'in-development', // TODO: confirm status
    summary: {
      en: 'Ebooks and audiobooks in one reader: a cross-platform client for self-hosted Storyteller servers with synced read-aloud highlighting, an audiobook player, reading stats, multi-server support and an e-ink mode.',
      sl: 'E-knjige in zvočne knjige v enem bralniku: večplatformni odjemalec za samogostujoče strežnike Storyteller s sinhroniziranim označevanjem besedila med branjem na glas, predvajalnikom zvočnih knjig, statistiko branja, podporo za več strežnikov in načinom za e-črnilo.',
    },
    platforms: { en: ['Android', 'iOS'], sl: ['Android', 'iOS'] },
    stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Ktor', 'SQLDelight'],
    links: [{ kind: 'github', href: 'https://github.com/RetRo99/Parrot' }], // TODO: add App Store / Google Play links when published
    placeholderPhase: 0.32,
    // image: parrotShot, // TODO: real screenshot in src/assets/work/
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
