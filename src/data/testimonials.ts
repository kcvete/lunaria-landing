import type { Lang } from '../i18n';

/**
 * Client testimonials. The section stays hidden while this list is empty.
 * Only add real, attributed quotes you have permission to publish.
 */
export interface Testimonial {
  quote: Record<Lang, string>;
  name: string;
  role: Record<Lang, string>;
  company: string;
  /** Optional link to verify (LinkedIn, Clutch review, company site). */
  href?: string;
}

export const testimonials: Testimonial[] = [
  // TODO: e.g.
  // {
  //   quote: { en: '…', sl: '…' },
  //   name: 'Ana Novak',
  //   role: { en: 'Head of Product', sl: 'vodja produkta' },
  //   company: 'Company d.o.o.',
  //   href: 'https://www.linkedin.com/in/…',
  // },
];
