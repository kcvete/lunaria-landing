// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { SITE_URL } from './src/config.ts';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  // The whole stylesheet is small, so inline it: no render-blocking CSS request.
  build: { inlineStylesheets: 'always' },
  // https://docs.astro.build/en/guides/internationalization/
  i18n: {
    locales: ['en', 'sl'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false, // English at "/", Slovenian at "/sl/"
    },
  },
  // Fonts are downloaded at build time and self-hosted from /_astro/fonts —
  // no runtime request to any third party. Astro also generates metric-matched
  // fallback faces (size-adjust etc.) to keep layout shift near zero.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Familjen Grotesk',
      cssVariable: '--font-display',
      weights: [500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Literata',
      cssVariable: '--font-text',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],
});
