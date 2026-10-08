/**
 * Build-time renderer for the "moon made of code": a sphere shaded with 0s and 1s.
 *
 * Each character cell is lit like a point on a sphere (Lambert shading from a sun
 * angle set by the phase), multiplied by an albedo map with the near-side maria and
 * a little noise. The brightness is quantised into a few shade levels, and runs of
 * the same level are merged into one <span> so the markup stays small.
 *
 * Character choice also carries tone: "0" has more ink than "1", so bright cells
 * lean towards 0 and dim cells towards 1.
 */

export interface CodeMoonOptions {
  /** Columns across the disc. Rows are cols / 2 because a mono cell is ~1:2. */
  cols: number;
  /** Waxing phase: 0 new, 0.5 first quarter, 1 full. */
  lit: number;
  /** How many cells get a slow 0↔1 flip (CSS-only). */
  flips?: number;
  seed?: number;
}

export const SHADE_LEVELS = 6;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Small deterministic value noise for irregular mare edges and surface grain.
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x: number, y: number) {
  return 0.55 * valueNoise(x, y) + 0.3 * valueNoise(x * 2.1, y * 2.1) + 0.15 * valueNoise(x * 4.3, y * 4.3);
}
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Maria in disc coordinates (-1..1, y down): cx, cy, rx, ry, rotation (deg), depth.
// Procellarum, Imbrium, Serenitatis, Tranquillitatis, Crisium, Nubium, Fecunditatis, Nectaris.
const MARIA: [number, number, number, number, number, number][] = [
  [-0.54, 0.0, 0.3, 0.48, -12, 0.85],
  [-0.38, -0.25, 0.24, 0.26, 0, 0.75],
  [-0.18, -0.44, 0.28, 0.2, -18, 0.9],
  [0.15, -0.38, 0.18, 0.17, 0, 0.9],
  [0.25, -0.08, 0.22, 0.16, 25, 0.95],
  [0.65, -0.27, 0.12, 0.1, 0, 0.95],
  [-0.25, 0.32, 0.2, 0.13, 15, 0.7],
  [0.52, 0.21, 0.1, 0.17, -15, 0.75],
  [0.3, 0.26, 0.09, 0.09, 0, 0.7],
];
// Bright ray craters: Tycho, Copernicus, Kepler.
const CRATERS: [number, number, number][] = [
  [-0.15, 0.68, 0.07],
  [-0.35, 0.04, 0.05],
  [-0.66, 0.0, 0.035],
];

function albedo(x: number, y: number) {
  let mare = 0;
  const wobble = (fbm(x * 3 + 7, y * 3 + 3) - 0.5) * 0.5;
  for (const [cx, cy, rx, ry, rot, depth] of MARIA) {
    const a = (rot * Math.PI) / 180;
    const dx = x - cx;
    const dy = y - cy;
    const u = (dx * Math.cos(a) + dy * Math.sin(a)) / rx;
    const v = (-dx * Math.sin(a) + dy * Math.cos(a)) / ry;
    const dist = Math.sqrt(u * u + v * v) + wobble;
    mare = Math.max(mare, depth * (1 - smoothstep(0.65, 1.1, dist)));
  }
  let bright = 0;
  for (const [cx, cy, r] of CRATERS) {
    const d = Math.hypot(x - cx, y - cy) / r;
    bright = Math.max(bright, 1 - smoothstep(0.4, 1.2, d));
  }
  const grain = (fbm(x * 9, y * 9) - 0.5) * 0.22;
  return Math.min(1, Math.max(0.15, 1 - 0.66 * mare + grain + 0.3 * bright));
}

export interface CodeMoonResult {
  html: string;
  cols: number;
  rows: number;
  /** Shade level applied to the whole <pre>; runs at this level are bare text. */
  baseLevel: number;
}

export function renderCodeMoon({ cols, lit, flips = 0, seed = 2026 }: CodeMoonOptions): CodeMoonResult {
  const rows = Math.round(cols / 2);
  const rand = mulberry32(seed);
  // Sun direction for a waxing moon lit from the right.
  const theta = Math.PI * (1 - Math.min(1, Math.max(0, lit)));
  const L = [Math.sin(theta), 0, Math.cos(theta)];

  type Cell = { ch: string; level: number } | null;
  const grid: Cell[][] = [];
  const litCells: [number, number][] = [];

  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      const x = ((c + 0.5) / cols) * 2 - 1;
      const y = ((r + 0.5) / rows) * 2 - 1;
      const rr = x * x + y * y;
      // Slightly inside the cell grid so the limb is not a flat run of edge cells.
      if (rr > 0.93) {
        row.push(null);
        continue;
      }
      const z = Math.sqrt(Math.max(0, 1 - rr));
      const d = x * L[0] + z * L[2];
      const day = smoothstep(-0.06, 0.2, d);
      const alb = albedo(x, y);
      const limb = 0.7 + 0.3 * (1 - smoothstep(0.78, 0.93, rr));
      const raw = 0.1 * alb + day * alb * (0.8 + 0.2 * Math.max(0, d)) * limb;
      const value = Math.min(1, Math.pow(raw, 0.85) * 1.08);
      const level = Math.min(SHADE_LEVELS - 1, Math.max(0, Math.round(value * (SHADE_LEVELS - 1))));
      const ch = rand() < 0.12 + 0.8 * value * value ? '0' : '1';
      row.push({ ch, level });
      if (level >= SHADE_LEVELS - 2 && rr < 0.8) litCells.push([r, c]);
    }
    grid.push(row);
  }

  // The most common shade becomes the <pre>'s own colour, so its runs need no <span>.
  const counts = new Array(SHADE_LEVELS).fill(0);
  for (const row of grid) for (const cell of row) if (cell) counts[cell.level]++;
  const baseLevel = counts.indexOf(Math.max(...counts));

  // Pick the cells that flip, spread over the lit area.
  const flipSet = new Map<string, number>();
  for (let i = 0; i < flips && litCells.length; i++) {
    const [r, c] = litCells[Math.floor(rand() * litCells.length)];
    flipSet.set(`${r},${c}`, i);
  }

  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    const row = grid[r];
    let last = row.length - 1;
    while (last >= 0 && row[last] === null) last--;
    let out = '';
    let run = '';
    let runLevel = -1;
    const flush = () => {
      if (run) out += runLevel === baseLevel ? run : `<span class="l${runLevel}">${run}</span>`;
      run = '';
    };
    for (let c = 0; c <= last; c++) {
      const cell = row[c];
      if (!cell) {
        flush();
        runLevel = -1;
        out += ' ';
        continue;
      }
      const f = flipSet.get(`${r},${c}`);
      if (f !== undefined) {
        flush();
        const other = cell.ch === '0' ? '1' : '0';
        const dur = (7 + rand() * 7).toFixed(1);
        const delay = (rand() * 10).toFixed(1);
        out += `<span class="l${cell.level} f" style="--t:${dur}s;--d:-${delay}s"><b>${cell.ch}</b><b>${other}</b></span>`;
        runLevel = -1;
        continue;
      }
      if (cell.level !== runLevel) {
        flush();
        runLevel = cell.level;
      }
      run += cell.ch;
    }
    flush();
    lines.push(out);
  }
  return { html: lines.join('\n'), cols, rows, baseLevel };
}
