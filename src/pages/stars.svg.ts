import type { APIRoute } from 'astro';

/**
 * Builds /stars.svg at build time: one small tile of stars that the body
 * background repeats. Deterministic (seeded), ~3 KB, zero DOM nodes on the page.
 */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const GET: APIRoute = () => {
  const rand = mulberry32(1969);
  const size = 760;
  const circles: string[] = [];
  for (let i = 0; i < 70; i++) {
    const bright = rand() > 0.93;
    const r = bright ? 1 + rand() * 0.5 : 0.4 + rand() * 0.5;
    const o = bright ? 0.75 : 0.18 + rand() * 0.45;
    circles.push(
      `<circle cx="${(rand() * size).toFixed(1)}" cy="${(rand() * size).toFixed(1)}" r="${r.toFixed(2)}" fill-opacity="${o.toFixed(2)}"/>`,
    );
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><g fill="#e8ebf7">${circles.join('')}</g></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
