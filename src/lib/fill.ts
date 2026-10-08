import { TIME_ZONE, QUOTE_WORKING_DAYS, CALL_MINUTES, CONTACT_EMAIL } from '../config';
import { orTodo } from './todo';

/** Values for the {tokens} used in the i18n strings. Missing ones render as [TODO: …]. */
export const tokens: Record<string, string> = {
  tz: TIME_ZONE,
  days: orTodo(QUOTE_WORKING_DAYS, 'N'),
  minutes: String(CALL_MINUTES),
  email: CONTACT_EMAIL,
};

/** Replace {token} placeholders in a copy string. */
export const fill = (text: string, extra: Record<string, string> = {}) =>
  text.replace(/\{(\w+)\}/g, (m, key: string) => extra[key] ?? tokens[key] ?? m);

/** Split a string around {email} so the address can be rendered as a link. */
export const splitEmail = (text: string) => fill(text, { email: '\u0000' }).split('\u0000');
