import type { APIRoute } from 'astro';
import { PREVIEW_NOINDEX } from '../config';
import { withBase } from '../lib/url';

/**
 * robots.txt follows PREVIEW_NOINDEX in src/config.ts and points at the sitemap.
 * Note: crawlers only read robots.txt at a domain root, so on a GitHub Pages
 * project sub-path the <meta name="robots"> tag is what actually keeps the
 * preview out of search results. This file takes effect once the site has its own domain.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase('sitemap-index.xml'), site).href;
  const rules = PREVIEW_NOINDEX ? 'Disallow: /' : 'Allow: /';
  return new Response(`User-agent: *\n${rules}\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
