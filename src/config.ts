/**
 * Single source of truth for studio-wide settings and launch placeholders.
 * Every value marked TODO must be confirmed before launch (see README "Before launch").
 */

/** Studio name. Rename here and it changes everywhere (copy, meta, wordmark). */
export const SITE_NAME = 'Lunaria'; // TODO: working name — confirm final studio name

/**
 * Production origin (no path, no trailing slash), used for canonical/hreflang/OG URLs.
 * The sub-path (GitHub Pages project site) is `base` in astro.config.mjs, set via BASE_PATH.
 * Override at build time with the SITE_URL environment variable.
 */
export const SITE_URL = 'https://kcvete.github.io'; // TODO: real domain at launch (then BASE_PATH='')

/**
 * Preview mode: while true, every page gets <meta name="robots" content="noindex, nofollow">
 * and robots.txt disallows everything. Set to false at launch.
 */
export const PREVIEW_NOINDEX = true; // TODO: false at launch

/** Public contact email (footer, contact section, mailto fallback for the form). */
export const CONTACT_EMAIL = 'hello@lunaria.example'; // TODO: real inbox

/** Booking link for "Book a call" buttons (Cal.com, Calendly, ...). '' = falls back to #contact. */
export const BOOKING_URL = ''; // TODO: booking link

/**
 * Contact form endpoint (Formspree, Basin, own API, ...).
 * '' = the form falls back to a mailto: submission to CONTACT_EMAIL.
 */
export const FORM_ACTION = ''; // TODO: form backend endpoint

/** Studio-level social links. Empty strings are not rendered. */
export const SOCIAL = {
  github: '', // TODO: studio GitHub org (optional)
  linkedin: '', // TODO: studio LinkedIn page (optional)
};

/** Path to the Open Graph share image in /public. */
export const OG_IMAGE = 'og.png'; // TODO: replace with a designed 1200x630 share image

// ---- derived helpers (no need to edit) ----
export const BOOKING_HREF = BOOKING_URL || '#contact';
export const bookingIsExternal = BOOKING_URL.startsWith('http');
