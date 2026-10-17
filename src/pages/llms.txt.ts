import type { APIRoute } from 'astro';
import { CITY, CONTACT_EMAIL, SITE_NAME } from '../config';
import { featuredProjects } from '../data/projects';
import { en } from '../i18n/en';
import { withBase } from '../lib/url';

/**
 * llms.txt (llmstxt.org): a plain summary of the studio for AI assistants,
 * built from the same copy and project data as the page.
 */
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(withBase(path), site).href;
  const services = en.services.items.map((s) => `- ${s.title}: ${s.text} (${s.stack.join(', ')})`);
  const work = featuredProjects.map((p) => {
    const link = p.links[0] ? ` ${p.links[0].href}` : '';
    return `- ${p.name} (${en.work.status[p.status]}):${link} ${p.summary.en}`;
  });
  const faq = en.faq.items.map((f) => `- ${f.q} ${f.a}`);
  const body = [
    `# ${SITE_NAME}`,
    '',
    `> ${en.meta.description}`,
    '',
    `${en.hero.sub} Based in ${CITY}, Slovenia. Contact: ${CONTACT_EMAIL}.`,
    '',
    '## Services',
    ...services,
    '',
    '## Our own products',
    ...work,
    '',
    '## FAQ',
    ...faq,
    '',
    '## Pages',
    `- English: ${url('')}`,
    `- Slovenian: ${url('sl/')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
