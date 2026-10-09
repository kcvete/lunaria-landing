/**
 * Moonlit field of Lunaria (honesty) flowers, buds and silver seed pods, drawn in code
 * glyphs (0, 1, :, ·) on a 2D canvas.
 *
 * - Deterministic: everything comes from a seeded PRNG.
 * - Blooms (petal outlines of 0/1 with dotted spines over a faint glowing body, each tilted
 *   in 3D), pods (glyph ovals with seeds) and buds are pre-rendered once into sprites, so a
 *   frame is just drawImage + one dotted stem per plant; glints flip 0 ↔ 1.
 * - Far rows and mist are painted once into a blurred backdrop; mid/near rows animate.
 * - Gentle sway per plant, plus gust waves that travel across the field.
 * - Pauses offscreen and in hidden tabs; reduced motion gets one static frame.
 */

type RGB = [number, number, number];
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];

const LILAC: RGB = [196, 184, 232];
const HAZE: RGB = [112, 132, 172];
const STEM: RGB = [28, 50, 54];
const STEM_LIT: RGB = [96, 126, 134];
const GROUND_TOP: RGB = [22, 34, 62];
const GROUND_BOTTOM: RGB = [4, 7, 16];
const TAU = Math.PI * 2;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SPRITE = 160;
const C = SPRITE / 2;
function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

/** Moon-side rim light: stroke the current path with a gradient fixed in screen space (light from above). */
function rim(g: CanvasRenderingContext2D, a: number, w = 1.3) {
  g.save();
  g.setTransform(1, 0, 0, 1, 0, 0);
  const lg = g.createLinearGradient(0, 0, 0, SPRITE);
  lg.addColorStop(0, `rgba(255,255,255,${a})`);
  lg.addColorStop(0.5, `rgba(255,255,255,${a * 0.25})`);
  lg.addColorStop(1, 'rgba(255,255,255,0)');
  g.strokeStyle = lg;
  g.lineWidth = w;
  g.stroke();
  g.restore();
}

/** A closed bud: two lilac-tinged sepals. */
function budSprite(R: () => number, haze: number) {
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  g.translate(C, C * 1.25);
  g.rotate((R() - 0.5) * 0.5);
  const h = SPRITE * (0.3 + R() * 0.08);
  const col = mix([206, 214, 226], HAZE, haze * 0.6);
  for (const side of [-1, 1]) {
    g.beginPath();
    g.moveTo(0, 0);
    g.bezierCurveTo(side * h * 0.42, -h * 0.25, side * h * 0.3, -h * 0.8, 0, -h);
    g.bezierCurveTo(side * h * 0.08, -h * 0.6, side * h * 0.05, -h * 0.3, 0, 0);
    const grad = g.createLinearGradient(0, 0, 0, -h);
    grad.addColorStop(0, rgba(mix(col, [70, 100, 96], 0.4), 0.95));
    grad.addColorStop(1, rgba(mix(col, LILAC, 0.35), 0.92));
    g.fillStyle = grad;
    g.fill();
    rim(g, 0.6 - haze * 0.3, 1);
  }
  return c;
}

/**
 * "Code" version of a sprite: sample the painted sprite on a coarse grid and redraw each
 * cell as a monospace glyph whose choice and brightness follow the painted coverage.
 * Bright cells become 1/0, dim cells : and ·, so the shape reads as a flower made of code.
 */
const GLYPH_FONT = 'ui-monospace, Menlo, Consolas, monospace';
function glyphify(src: HTMLCanvasElement, cols: number, R: () => number, bright = 1) {
  const d = src.getContext('2d')!.getImageData(0, 0, SPRITE, SPRITE).data;
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  const cell = SPRITE / cols;
  // 1) coverage + luminance per cell
  const cov = new Float32Array(cols * cols);
  const lum = new Float32Array(cols * cols);
  for (let gy = 0; gy < cols; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      let a = 0;
      let l = 0;
      let n = 0;
      for (let y = Math.floor(gy * cell); y < Math.floor((gy + 1) * cell); y += 2) {
        for (let x = Math.floor(gx * cell); x < Math.floor((gx + 1) * cell); x += 2) {
          const k = (y * SPRITE + x) * 4;
          a += d[k + 3];
          l += (d[k] * 0.3 + d[k + 1] * 0.55 + d[k + 2] * 0.15) * d[k + 3];
          n++;
        }
      }
      cov[gy * cols + gx] = n ? a / n / 255 : 0;
      lum[gy * cols + gx] = a ? l / a / 255 : 0;
    }
  }
  const at = (x: number, y: number) => (x < 0 || y < 0 || x >= cols || y >= cols ? 0 : cov[y * cols + x]);
  g.font = `600 ${cell * 0.92}px ${GLYPH_FONT}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  // 2) outline cells (coverage next to empty space) get bright 0/1, the inside gets
  //    sparse, dim : and · so each petal reads as a shape drawn in code
  for (let gy = 0; gy < cols; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const v = cov[gy * cols + gx];
      if (v < 0.12) continue;
      const edge = v - Math.min(at(gx - 1, gy), at(gx + 1, gy), at(gx, gy - 1), at(gx, gy + 1));
      const L = lum[gy * cols + gx];
      const isEdge = edge > 0.32;
      if (!isEdge && R() < 0.38) continue;
      const ch = isEdge ? (R() < 0.55 ? '0' : '1') : L > 0.78 && R() < 0.45 ? (R() < 0.5 ? '1' : '0') : R() < 0.55 ? ':' : '·';
      const tint = L > 0.8 ? '246,249,255' : L > 0.64 ? '220,214,244' : '178,166,224';
      const a = isEdge ? 0.62 + 0.38 * L : 0.18 + 0.42 * v * L;
      g.fillStyle = `rgba(${tint},${Math.min(1, a * bright)})`;
      g.fillText(ch, (gx + 0.5) * cell, (gy + 0.55) * cell);
    }
  }
  return c;
}

/** A bloom drawn directly in glyphs: each petal is an outline of 0/1 with a dotted spine. */
function codeBloomSprite(R: () => number, haze: number, step: number) {
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  const pitch = Math.pow(R(), 1.1) * 1.0;
  const axis = R() * Math.PI;
  const spin = R() * TAU;
  const s = SPRITE * 0.42;
  const ca = Math.cos(axis);
  const sa = Math.sin(axis);
  const cp = Math.cos(pitch);
  // tilt a point of the flower plane into screen space
  const tilt = (x: number, y: number) => {
    const u = x * ca + y * sa;
    const v = (-x * sa + y * ca) * cp;
    return [C + u * ca - v * sa, C + u * sa + v * ca];
  };
  g.font = `700 ${step * 1.05}px ${GLYPH_FONT}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const put = (x: number, y: number, ch: string, col: string, a: number) => {
    const [px, py] = tilt(x, y);
    g.fillStyle = `rgba(${col},${a})`;
    g.fillText(ch, px, py);
  };
  const fade = 1 - haze * 0.45;
  for (let k = 0; k < 4; k++) {
    const a = spin + (k * Math.PI) / 2 + (R() - 0.5) * 0.2;
    const len = s * (0.86 + R() * 0.12);
    const wid = s * (0.36 + R() * 0.06);
    const dx = Math.sin(a);
    const dy = -Math.cos(a);
    const cx = dx * len * 0.56;
    const cy = dy * len * 0.56;
    const ry = len * 0.44;
    // outline: walk the petal ellipse at roughly one glyph per step
    // a faint translucent petal body under the glyphs, so the bloom glows instead of looking wiry
    g.save();
    g.translate(C, C);
    g.rotate(axis);
    g.scale(1, cp);
    g.rotate(-axis);
    g.translate(cx, cy);
    g.rotate(a);
    const body = g.createRadialGradient(0, -ry * 0.2, 0, 0, 0, Math.max(wid, ry));
    body.addColorStop(0, `rgba(226,230,250,${0.16 * fade})`);
    body.addColorStop(1, `rgba(190,196,236,${0.04 * fade})`);
    g.fillStyle = body;
    g.beginPath();
    g.ellipse(0, 0, wid, ry, 0, 0, TAU);
    g.fill();
    g.restore();
    const per = Math.PI * (1.5 * (wid + ry) - Math.sqrt(wid * ry));
    const n = Math.max(8, Math.round(per / (step * 0.95)));
    for (let i = 0; i < n; i++) {
      const t = (i / n) * TAU;
      const ex = Math.cos(t) * wid;
      const ey = Math.sin(t) * ry;
      // petal frame: ex across the petal (perpendicular to its direction), ey along it
      const x = cx + ex * Math.cos(a) + ey * dx;
      const y = cy + ex * Math.sin(a) + ey * dy;
      // skip the part of the outline tucked into the centre
      if (Math.hypot(x, y) < s * 0.16) continue;
      const lit = 0.5 - 0.5 * Math.sin(t + a); // the moon-facing side is brighter
      put(x, y, R() < 0.5 ? '0' : '1', lit > 0.55 ? '248,250,255' : '214,208,242', (0.55 + 0.45 * lit) * fade);
    }
    // spine and a little fill
    for (let r = s * 0.2; r < len * 0.92; r += step * 1.1) {
      put(dx * r, dy * r, '·', '226,222,246', 0.55 * fade);
    }
    for (let j = 0; j < 4; j++) {
      const r = len * (0.35 + R() * 0.45);
      const off = (R() - 0.5) * wid * 1.1;
      put(dx * r + Math.cos(a) * off, dy * r + Math.sin(a) * off, R() < 0.5 ? ':' : '·', '200,192,236', 0.4 * fade);
    }
  }
  // centre: a small violet cluster
  for (const [x, y] of [[0, 0], [step * 0.6, 0], [-step * 0.6, 0], [0, step * 0.6], [0, -step * 0.6]]) {
    put(x, y, ':', '176,150,232', 0.95 * fade);
  }
  return c;
}

/** A seed pod drawn in glyphs: an oval outline, a septum column and four seed clusters. */
function codePodSprite(R: () => number, haze: number, step: number) {
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  const rx = SPRITE * 0.36;
  const ry = SPRITE * 0.34;
  const squash = 0.35 + R() * 0.6;
  const rot = R() * Math.PI;
  g.translate(C, C);
  g.rotate(rot);
  g.font = `700 ${step * 1.05}px ${GLYPH_FONT}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const fade = 1 - haze * 0.45;
  const n = Math.round((Math.PI * (rx + ry * squash)) / (step * 0.9));
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU;
    const lit = 0.5 - 0.5 * Math.sin(t + rot);
    g.fillStyle = `rgba(${lit > 0.5 ? '250,252,255' : '196,206,230'},${(0.5 + 0.5 * lit) * fade})`;
    g.fillText(R() < 0.6 ? '0' : '1', Math.cos(t) * rx, Math.sin(t) * ry * squash);
  }
  g.fillStyle = `rgba(214,222,240,${0.4 * fade})`;
  for (let x = -rx + step; x < rx - step * 0.5; x += step * 1.2) g.fillText('·', x, 0);
  for (const k of [-0.55, -0.18, 0.18, 0.55]) {
    g.fillStyle = `rgba(150,160,200,${0.75 * fade})`;
    g.fillText(':', k * rx, (k > 0 ? 0.25 : -0.25) * ry * squash);
  }
  return c;
}

type Kind = 'bloom' | 'side' | 'bud' | 'pod';
interface Plant {
  x: number;
  y: number;
  z: number;
  size: number;
  stem: number;
  lean: number;
  phase: number;
  speed: number;
  rot: number;
  sprite: HTMLCanvasElement;
  kind: Kind;
  glint: number;
  branch: number;
}

export function start(el: HTMLCanvasElement, moonX = 0.62) {
  const ctx = el.getContext('2d');
  if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  let W = 0;
  let H = 0;
  let plants: Plant[] = [];
  let backdrop: HTMLCanvasElement | null = null;
  let raf = 0;
  let visible = true;

  // All set-up work runs in small idle-time slices so it never blocks the main thread.
  const idle = (cb: (d: { timeRemaining(): number }) => void) =>
    'requestIdleCallback' in window
      ? requestIdleCallback(cb, { timeout: 2500 })
      : setTimeout(() => cb({ timeRemaining: () => 10 }), 40);
  function run(gen: Generator<unknown>, done: () => void) {
    const step = (d: { timeRemaining(): number }) => {
      const end = performance.now() + Math.max(5, Math.min(12, d.timeRemaining()));
      let r: IteratorResult<unknown>;
      do r = gen.next();
      while (!r.done && performance.now() < end);
      if (r.done) done();
      else idle(step);
    };
    idle(step);
  }

  const R0 = rng(20261009);
  type Set = Record<Kind, HTMLCanvasElement[]>;
  const blank = (): Set => ({ bloom: [], side: [], bud: [], pod: [] });
  const near = blank();
  const mid = blank();
  const far = blank();
  function* sprites() {
    // every bloom, side view and pod is drawn directly in glyphs; buds are painted, then turned into glyphs
    const RG = rng(4242);
    for (const [set, cols, br, haze] of [[near, 26, 1, 0], [mid, 15, 0.95, 0.35], [far, 8, 0.85, 0.75]] as const) {
      const step = SPRITE / cols;
      for (let i = 0; i < (haze ? 6 : 12); i++) { set.bloom.push(codeBloomSprite(RG, haze, step)); yield; }
      for (let i = 0; i < (haze ? 2 : 4); i++) { set.side.push(codeBloomSprite(RG, haze, step)); yield; }
      for (let i = 0; i < 3; i++) { set.bud.push(glyphify(budSprite(R0, haze), cols - 6, RG, br)); yield; }
      for (let i = 0; i < (haze ? 3 : 5); i++) { set.pod.push(codePodSprite(RG, haze, step)); yield; }
    }
  }
  const pick = <T,>(a: T[], R: () => number) => a[(R() * a.length) | 0];

  function* build(): Generator<unknown> {
    const rect = el.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    const cw = Math.round(W * dpr);
    const ch = Math.round(H * dpr);
    const R = rng(1969);
    const scale = Math.max(0.6, Math.min(1.15, W / 1300));
    const small = W < 700;
    const HZ = H * 0.2; // canvas extends above the horizon so mist can fade into the sky
    const F = H - HZ;

    // ---- static backdrop ----
    const bd = canvas(cw, ch);
    const b = bd.getContext('2d')!;
    b.scale(dpr, dpr);
    const gr = b.createLinearGradient(0, HZ - F * 0.06, 0, H);
    gr.addColorStop(0, rgba(GROUND_TOP, 0));
    gr.addColorStop(0.16, rgba(GROUND_TOP, 0.92));
    gr.addColorStop(0.45, rgba(mix(GROUND_TOP, GROUND_BOTTOM, 0.6), 1));
    gr.addColorStop(1, rgba(GROUND_BOTTOM, 1));
    b.fillStyle = gr;
    b.fillRect(0, HZ - F * 0.06, W, H);

    // far field: dense, tiny, clumped, then blurred
    const farC = canvas(cw, ch);
    const f = farC.getContext('2d')!;
    f.scale(dpr, dpr);
    const nFar = Math.round((W * F) / (small ? 300 : 240));
    const drifts = Array.from({ length: 14 }, () => [R() * W, 0.4 + R() * 0.9] as const);
    for (let i = 0; i < nFar; i++) {
      const z = Math.pow(R(), 1.5) * 0.5;
      const d = drifts[(R() * drifts.length) | 0];
      const x = R() < 0.6 ? d[0] + (R() - 0.5) * W * 0.35 * d[1] : R() * W;
      const y = HZ + F * (0.015 + Math.pow(z * 2, 1.6) * 0.34) + R() * 2;
      const s = (1 + 8 * Math.pow(z * 2, 2.2)) * scale;
      const spr = R() < 0.8 ? pick(far.bloom, R) : pick(far.pod, R);
      f.globalAlpha = 0.22 + z * 0.9;
      f.drawImage(spr, ((x % W) + W) % W - s, y - s, s * 2, s * 2);
      if (i % 300 === 299) yield;
    }
    yield;
    b.filter = `blur(${0.9 * dpr}px)`;
    b.setTransform(1, 0, 0, 1, 0, 0);
    b.drawImage(farC, 0, 0);
    b.filter = 'none';
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    yield;

    // mist hugging the horizon
    for (let i = 0; i < 7; i++) {
      const mx = R() * W;
      const my = HZ + F * (0.02 + R() * 0.08);
      const rx = W * (0.3 + R() * 0.3);
      b.save();
      b.translate(mx, my);
      b.scale(1, 0.16);
      const m = b.createRadialGradient(0, 0, 0, 0, 0, rx);
      m.addColorStop(0, `rgba(184,200,234,${0.05 + R() * 0.04})`);
      m.addColorStop(1, 'rgba(184,200,234,0)');
      b.fillStyle = m;
      b.fillRect(-rx, -rx, rx * 2, rx * 2);
      b.restore();
    }
    // moonlit sheen across the field toward the moon
    b.globalCompositeOperation = 'screen';
    b.save();
    b.translate(W * moonX, HZ - F * 0.04);
    b.scale(0.6, 1);
    const sheen = b.createRadialGradient(0, 0, 0, 0, 0, F * 1.05);
    sheen.addColorStop(0, 'rgba(160,180,225,0.18)');
    sheen.addColorStop(0.45, 'rgba(160,180,225,0.07)');
    sheen.addColorStop(1, 'rgba(160,180,225,0)');
    b.fillStyle = sheen;
    b.fillRect(-W * 2, -HZ, W * 4, H);
    b.restore();
    b.globalCompositeOperation = 'source-over';

    // fade the very top of the canvas to nothing so it melts into the CSS sky
    b.globalCompositeOperation = 'destination-in';
    const fade = b.createLinearGradient(0, 0, 0, H);
    fade.addColorStop(0, 'rgba(0,0,0,0)');
    fade.addColorStop(HZ / H, 'rgba(0,0,0,1)');
    fade.addColorStop(1, 'rgba(0,0,0,1)');
    b.fillStyle = fade;
    b.fillRect(0, 0, W, H);
    b.globalCompositeOperation = 'source-over';

    // dark heart-shaped leaves along the bottom
    const nLeaves = Math.round(W / 36);
    for (let i = 0; i < nLeaves; i++) {
      const lx = R() * W;
      const ly = HZ + F * (0.86 + R() * 0.2);
      const ls = (14 + R() * 22) * scale;
      b.save();
      b.translate(lx, ly);
      b.rotate((R() - 0.5) * 1.3);
      b.beginPath();
      b.moveTo(0, ls * 0.5);
      b.bezierCurveTo(-ls * 0.9, 0, -ls * 0.5, -ls * 0.9, 0, -ls * 0.45);
      b.bezierCurveTo(ls * 0.5, -ls * 0.9, ls * 0.9, 0, 0, ls * 0.5);
      b.fillStyle = rgba(mix(STEM, GROUND_BOTTOM, 0.6), 0.8);
      b.fill();
      b.restore();
    }

    // ---- animated plants: clumped mid rows + a few large foreground blooms ----
    const pl: Plant[] = [];
    const clumps = Array.from({ length: Math.max(6, Math.round(W / 110)) }, () => [R() * W, 20 + R() * 90] as const);
    const nMid = Math.round((W / (small ? 5 : 6.5)) * Math.min(1, F / 380));
    const nNear = Math.max(5, Math.round(W / 130));
    const add = (z: number, isNear: boolean) => {
      const t = (z - 0.45) / 0.55;
      let x: number;
      if (!isNear && R() < 0.7) {
        const cl = clumps[(R() * clumps.length) | 0];
        x = cl[0] + (R() + R() - 1) * cl[1] * (0.6 + t);
      } else x = R() * (W + 60) - 30;
      const y = isNear ? HZ + F * (0.5 + R() * 0.36) : HZ + F * (0.24 + Math.pow(t, 1.25) * 0.58);
      const roll = R();
      const kind: Kind = isNear
        ? roll < 0.55 ? 'bloom' : roll < 0.72 ? 'side' : roll < 0.86 ? 'bud' : 'pod'
        : roll < 0.62 ? 'bloom' : roll < 0.74 ? 'side' : roll < 0.84 ? 'bud' : 'pod';
      const set = isNear || t > 0.75 ? near : mid;
      const sprite = pick(set[kind], R);
      const base = isNear ? (small ? 30 : 38) + R() * (small ? 26 : 40) : 4 + 26 * Math.pow(t, 2);
      const size = base * scale * (kind === 'bud' ? 0.6 : kind === 'pod' ? 0.55 : kind === 'side' ? 0.9 : 1);
      pl.push({
        x,
        y,
        z: isNear ? 0.9 + R() * 0.1 : z,
        size,
        stem: isNear ? (150 + R() * 170) * scale : size * (2.6 + R() * 1.6) + 6,
        lean: (R() - 0.5) * 0.35,
        phase: R() * TAU,
        speed: 0.55 + R() * 0.5,
        rot: (R() - 0.5) * 0.5,
        sprite,
        kind,
        glint: kind === 'bloom' || kind === 'pod' ? (R() < (isNear ? 0.5 : 0.12) ? R() * TAU : -1) : -1,
        branch: isNear && R() < 0.5 ? (R() - 0.5) * 1.6 : 0,
      });
    };
    for (let i = 0; i < nMid; i++) add(0.45 + Math.pow(R(), 0.85) * 0.5, false);
    for (let i = 0; i < nNear; i++) add(1, true);
    pl.sort((a, b) => a.y - b.y);
    // swap in the finished scene at once
    el.width = cw;
    el.height = ch;
    backdrop = bd;
    plants = pl;
  }

  function draw(t: number) {
    if (!ctx || !backdrop) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.drawImage(backdrop, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // a gust wave travels across the field every ~14 s
    const period = 14000;
    const gp = (t % period) / period;
    const gustX = -0.3 * W + gp * 1.8 * W;
    const gustW = W * 0.22;
    for (const p of plants) {
      const gust = Math.exp(-Math.pow((p.x - gustX) / gustW, 2));
      const amp = (0.014 + 0.05 * p.z * p.z) * (1 + gust * 1.6);
      const ang =
        p.lean * 0.4 +
        amp * Math.sin(t * 0.0011 * p.speed + p.phase) +
        amp * 0.35 * Math.sin(t * 0.0027 * p.speed + p.phase * 1.7) +
        gust * 0.06 * (0.4 + p.z);
      const bx = p.x;
      const by = p.y + p.stem;
      const hx = bx + Math.sin(ang) * p.stem;
      const hy = by - Math.cos(ang) * p.stem;
      ctx.strokeStyle = rgba(mix(STEM, STEM_LIT, p.z), 0.3 + p.z * 0.5);
      ctx.lineWidth = Math.max(0.6, p.size * 0.045);
      // stems are dotted glyph columns
      ctx.setLineDash([Math.max(1, p.size * 0.04), Math.max(2, p.size * 0.09)]);
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.quadraticCurveTo(bx + Math.sin(ang) * p.stem * 0.35, by - p.stem * 0.55, hx, hy);
      ctx.stroke();
      // a short side branch with a bud on some foreground stems
      if (p.branch) {
        const k = 0.45;
        const sx = bx + Math.sin(ang) * p.stem * (1 - k) * 0.9;
        const sy = by - p.stem * (1 - k);
        const ex = sx + Math.sin(ang + p.branch) * p.stem * 0.28;
        const ey = sy - Math.cos(ang + p.branch) * p.stem * 0.28;
        ctx.lineWidth = Math.max(0.5, p.size * 0.025);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo((sx + ex) / 2, sy - p.stem * 0.12, ex, ey);
        ctx.stroke();
        const bs = p.size * 0.4;
        ctx.save();
        ctx.translate(ex, ey);
        ctx.rotate(ang + p.branch * 0.6);
        ctx.drawImage(near.bud[0], -bs, -bs * 1.2, bs * 2, bs * 2);
        ctx.restore();
      }
      ctx.setLineDash([]);
      ctx.save();
      ctx.translate(hx, hy);
      ctx.rotate(p.rot + ang * 1.3);
      ctx.globalAlpha = 0.5 + p.z * 0.48;
      const s = p.size;
      ctx.drawImage(p.sprite, -s, p.kind === 'bloom' || p.kind === 'pod' ? -s : -s * 1.25, s * 2, s * 2);
      ctx.restore();
      ctx.globalAlpha = 1;
      if (p.glint >= 0) {
        const tw = Math.pow(Math.max(0, Math.sin(t * 0.0008 * p.speed + p.glint)), 22);
        // glint: a bright glyph that flips 0 ↔ 1
        if (tw > 0.05) {
          ctx.font = `700 ${Math.min(15, Math.max(8, s * 0.22))}px ${GLYPH_FONT}`;
          ctx.textAlign = 'center';
          ctx.fillStyle = `rgba(252,253,255,${Math.min(1, tw * (0.8 + gust * 0.4))})`;
          ctx.shadowColor = 'rgba(230,238,255,0.9)';
          ctx.shadowBlur = 8;
          ctx.fillText(Math.floor(t / 900 + p.glint * 3) % 2 ? '1' : '0', hx + s * 0.2, hy - s * 0.35);
          ctx.shadowBlur = 0;
        }
      }
    }
  }

  let t0 = 0;
  const loop = (now: number) => {
    if (!t0) t0 = now;
    draw(now - t0 + 5000);
    raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
  };
  const play = () => {
    if (!reduce && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
  };

  function* setup() {
    yield* sprites();
    yield* build();
  }
  run(setup(), () => {
    draw(5000);
    el.classList.add('is-ready');
    if (!reduce) begin();
  });

  function begin() {
  new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
    if (visible) play();
  }).observe(el);
  document.addEventListener('visibilitychange', play);
  let lastW = W;
  let timer = 0;
  addEventListener('resize', () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (Math.abs(el.getBoundingClientRect().width - lastW) < 2) return;
      run(build(), () => {
        lastW = W;
        draw(5000);
      });
    }, 200);
  });
  play();
  }
}
