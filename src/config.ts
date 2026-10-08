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

/** Open Graph share images in /public, per language (1200×630). */
export const OG_IMAGE = { en: 'og.png', sl: 'og-sl.png' }; // TODO: replace captures with designed share images

/** Location line (services intro, footer, JSON-LD). Empty city renders as a visible TODO. */
export const CITY = ''; // TODO: city, e.g. 'Ljubljana'
export const TIME_ZONE = 'CET/CEST';

/** "What happens next" strip: written spec and fixed quote arrive within this many working days. */
export const QUOTE_WORKING_DAYS = ''; // TODO: e.g. '5'

/** Length of the free intro call, in minutes. */
export const CALL_MINUTES = 30;

/**
 * Legal entity for the footer imprint (ZEPT Art. 5) and the privacy notice
 * (GDPR Art. 13 controller). Empty values render as visible TODO markers.
 */
export const LEGAL = {
  companyName: '', // TODO: e.g. 'Lunaria, Kevin Cvetežar s.p.' or 'Lunaria d.o.o.'
  address: '', // TODO: registered address, e.g. 'Ulica 1, 1000 Ljubljana, Slovenia'
  registrationNo: '', // TODO: matična številka
  taxNo: '', // TODO: davčna številka / ID za DDV (e.g. 'SI12345678')
  retention: '', // TODO: how long inquiries are kept, e.g. '12 months'
  emailProvider: '', // TODO: who hosts the inbox, e.g. 'Google Workspace (Google Ireland Ltd.)'
  privacyUpdated: '', // TODO: date of the privacy notice, e.g. '2026-11-01'
};

/** Show the price guide in the FAQ (figures live in src/i18n/*.ts → faq.pricing). */
export const SHOW_PRICING = false; // TODO: set true once the price ranges are decided

/**
 * Analytics hook. The page calls window.track(event, props) on:
 *   booking_click (any "Book a free consultation" CTA), form_submit (contact form).
 * The stub in Base.astro does nothing. To wire a cookieless tool (Plausible, Umami),
 * load its script there and forward track() to it. No third-party script is loaded now.
 */
export const ANALYTICS_EVENTS = ['booking_click', 'form_submit'] as const;

// ---- derived helpers (no need to edit) ----
export const BOOKING_HREF = BOOKING_URL || '#contact';
export const bookingIsExternal = BOOKING_URL.startsWith('http');
