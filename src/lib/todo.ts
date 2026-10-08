/** Marker shown in the preview wherever a config value is still missing. */
export const TODO_MARK = 'TODO';
export const orTodo = (value: string | number | undefined | null, label = '') =>
  value === '' || value == null ? `[${TODO_MARK}${label ? `: ${label}` : ''}]` : String(value);
export const isTodo = (value: string | number | undefined | null) => value === '' || value == null;
