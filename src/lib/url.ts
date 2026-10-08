/**
 * Prefix a site-relative path with the configured base (astro.config `base`).
 * Every internal URL goes through here, so the site works both at a domain root
 * and under a sub-path such as https://kcvete.github.io/lunaria-landing/.
 *
 *   withBase('')            -> '/lunaria-landing/'
 *   withBase('sl/')         -> '/lunaria-landing/sl/'
 *   withBase('team/rok.jpg')-> '/lunaria-landing/team/rok.jpg'
 */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}
