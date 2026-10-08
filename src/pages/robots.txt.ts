import type { APIRoute } from 'astro';
import { PREVIEW_NOINDEX } from '../config';

/**
 * robots.txt follows PREVIEW_NOINDEX in src/config.ts.
 * Note: crawlers only read robots.txt at a domain root, so on a GitHub Pages
 * project sub-path the <meta name="robots"> tag is what actually keeps the
 * preview out of search results. This file takes effect once the site has its own domain.
 */
export const GET: APIRoute = () =>
  new Response(PREVIEW_NOINDEX ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
