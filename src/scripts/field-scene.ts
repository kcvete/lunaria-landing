/**
 * Moonlit field of Lunaria (honesty) flowers, buds and silver seed pods on a 2D canvas.
 *
 * - Deterministic: everything comes from a seeded PRNG.
 * - Blooms, side views, buds and pods are pre-rendered once into sprites (obovate petals
 *   with a narrow claw, translucent gradient, faint veins, moon-side rim light, a glint),
 *   each with its own 3D tilt baked in, so frames are just drawImage + one stem stroke.
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

const WHITE: RGB = [246, 248, 255];
const PEARL: RGB = [226, 233, 247];
const LILAC: RGB = [196, 184, 232];
const VEIN: RGB = [128, 118, 178];
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

/** Obovate petal with a narrow claw, pointing up (-y) from the origin. */
function petalPath(g: CanvasRenderingContext2D, len: number, wid: number, bend: number) {
  g.beginPath();
  g.moveTo(-wid * 0.12, 0);
  g.bezierCurveTo(-wid * 0.3, -len * 0.16, -wid * 1.02 + bend, -len * 0.32, -wid * 0.98 + bend, -len * 0.7);
  g.bezierCurveTo(-wid * 0.9 + bend, -len * 1.06, wid * 0.9 + bend, -len * 1.06, wid * 0.98 + bend, -len * 0.7);
  g.bezierCurveTo(wid * 1.02 + bend, -len * 0.32, wid * 0.3, -len * 0.16, wid * 0.12, 0);
  g.closePath();
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

/**
 * A four-petalled bloom, tilted in 3D: the flower plane is squashed by cos(pitch) along
 * an axis at `axis`, so blooms are seen face-on, at an angle or nearly side-on.
 * Petals near the viewer (lower in the sprite) are drawn last.
 */
function bloomSprite(R: () => number, haze: number) {
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  const pitch = Math.pow(R(), 1.1) * 1.05; // 0 face-on … ~60° tilted
  const axis = R() * Math.PI;
  const s = SPRITE * 0.42;
  const spin = R() * TAU;
  const petals = [0, 1, 2, 3].map((i) => {
    const a = spin + (i * Math.PI) / 2 + (R() - 0.5) * 0.25;
    return { a, len: s * (0.82 + R() * 0.14), wid: s * (0.44 + R() * 0.08), bend: (R() - 0.5) * s * 0.1 };
  });
  // depth order: petal tips that point "down" after tilt are nearer
  const toScreenY = (a: number) => {
    const x = Math.sin(a);
    const y = -Math.cos(a);
    const ca = Math.cos(axis);
    const sa = Math.sin(axis);
    const u = x * ca + y * sa;
    const v = (-x * sa + y * ca) * Math.cos(pitch);
    return u * sa + v * ca;
  };
  petals.sort((p, q) => toScreenY(p.a) - toScreenY(q.a));
  const base = mix(WHITE, HAZE, haze * 0.7);
  const edge = mix(PEARL, HAZE, haze * 0.75);
  const claw = mix(LILAC, HAZE, haze * 0.5);
  g.translate(C, C);
  g.rotate(axis);
  g.scale(1, Math.cos(pitch));
  g.rotate(-axis);
  for (const p of petals) {
    g.save();
    g.rotate(p.a);
    petalPath(g, p.len, p.wid, p.bend);
    const grad = g.createLinearGradient(0, 0, 0, -p.len);
    grad.addColorStop(0, rgba(claw, 0.95));
    grad.addColorStop(0.28, rgba(mix(claw, base, 0.6), 0.9));
    grad.addColorStop(0.62, rgba(base, 0.88));
    grad.addColorStop(1, rgba(edge, 0.78));
    g.fillStyle = grad;
    g.fill();
    // cupping: a soft shadow down one side of the blade
    const cup = g.createLinearGradient(-p.wid, 0, p.wid, 0);
    cup.addColorStop(0, 'rgba(40,50,90,0.0)');
    cup.addColorStop(0.75, 'rgba(40,50,90,0.0)');
    cup.addColorStop(1, 'rgba(40,50,90,0.22)');
    g.fillStyle = cup;
    g.fill();
    // veins
    g.strokeStyle = rgba(VEIN, 0.2);
    g.lineWidth = 0.7;
    for (const k of [-0.35, 0, 0.35]) {
      g.beginPath();
      g.moveTo(0, -p.len * 0.12);
      g.quadraticCurveTo(k * p.wid * 0.6 + p.bend * 0.5, -p.len * 0.5, k * p.wid * 0.9 + p.bend, -p.len * 0.86);
      g.stroke();
    }
    petalPath(g, p.len, p.wid, p.bend);
    g.strokeStyle = rgba(mix(HAZE, [44, 54, 92], 0.5), 0.35);
    g.lineWidth = 0.8;
    g.stroke();
    rim(g, 0.9 - haze * 0.5);
    g.restore();
  }
  // centre and stamens
  g.fillStyle = rgba(mix([150, 128, 205], HAZE, haze * 0.4), 0.95);
  g.beginPath();
  g.arc(0, 0, s * 0.11, 0, TAU);
  g.fill();
  g.fillStyle = rgba(WHITE, 0.85);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    g.beginPath();
    g.arc(Math.cos(a) * s * 0.07, Math.sin(a) * s * 0.07, s * 0.022, 0, TAU);
    g.fill();
  }
  // specular glint near the top of the bloom
  g.setTransform(1, 0, 0, 1, 0, 0);
  const gx = C + (R() - 0.5) * s * 0.6;
  const gy = C - s * (0.35 + R() * 0.3) * Math.cos(pitch * 0.6);
  const spec = g.createRadialGradient(gx, gy, 0, gx, gy, s * 0.22);
  spec.addColorStop(0, `rgba(255,255,255,${0.55 - haze * 0.4})`);
  spec.addColorStop(1, 'rgba(255,255,255,0)');
  g.globalCompositeOperation = 'source-atop';
  g.fillStyle = spec;
  g.fillRect(0, 0, SPRITE, SPRITE);
  return c;
}

/** A bloom seen side-on: a cup of petals rising from a short calyx. */
function sideSprite(R: () => number, haze: number) {
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  g.translate(C, C * 1.2);
  const s = SPRITE * 0.4;
  const base = mix(WHITE, HAZE, haze * 0.7);
  const claw = mix(LILAC, HAZE, haze * 0.5);
  const fans = [-0.75, -0.25, 0.25, 0.75].map((k) => k * (0.9 + R() * 0.3));
  // calyx
  g.fillStyle = rgba(mix([60, 86, 84], HAZE, haze * 0.5), 0.95);
  g.beginPath();
  g.ellipse(0, 0, s * 0.09, s * 0.2, 0, 0, TAU);
  g.fill();
  fans.forEach((ang, i) => {
    g.save();
    g.rotate(ang);
    const len = s * (0.95 + R() * 0.15);
    const wid = s * (i === 1 || i === 2 ? 0.34 : 0.18); // outer petals are seen edge-on
    petalPath(g, len, wid, 0);
    const grad = g.createLinearGradient(0, 0, 0, -len);
    grad.addColorStop(0, rgba(claw, 0.95));
    grad.addColorStop(0.35, rgba(base, 0.9));
    grad.addColorStop(1, rgba(mix(base, LILAC, 0.25), 0.8));
    g.fillStyle = grad;
    g.fill();
    g.strokeStyle = rgba(VEIN, 0.18);
    g.lineWidth = 0.7;
    g.beginPath();
    g.moveTo(0, -len * 0.15);
    g.lineTo(0, -len * 0.85);
    g.stroke();
    petalPath(g, len, wid, 0);
    rim(g, 0.85 - haze * 0.5);
    g.restore();
  });
  return c;
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

/** A flat, translucent seed pod seen at an angle: bright rim, septum, seed silhouettes, sheen. */
function podSprite(R: () => number, haze: number) {
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  const rx = SPRITE * 0.36;
  const ry = SPRITE * (0.33 + R() * 0.04);
  const tilt = 0.25 + R() * 0.7; // foreshortening of the flat disc
  const axis = R() * Math.PI;
  g.translate(C, C);
  g.rotate(axis);
  g.scale(1, tilt);
  g.rotate(-axis);
  const tone = mix(PEARL, HAZE, haze * 0.7);
  g.beginPath();
  g.ellipse(0, 0, rx, ry, 0, 0, TAU);
  g.fillStyle = rgba(tone, 0.13);
  g.fill();
  // sheen: one diagonal streak of moonlight across the membrane
  g.save();
  g.clip();
  const sh = g.createLinearGradient(-rx, -ry, rx, ry);
  sh.addColorStop(0.3, 'rgba(255,255,255,0)');
  sh.addColorStop(0.42, `rgba(255,255,255,${0.2 - haze * 0.12})`);
  sh.addColorStop(0.52, 'rgba(255,255,255,0)');
  g.fillStyle = sh;
  g.fillRect(-rx, -ry, rx * 2, ry * 2);
  g.restore();
  g.strokeStyle = rgba(tone, 0.3);
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(0, -ry);
  g.lineTo(0, ry);
  g.stroke();
  [-0.52, -0.18, 0.18, 0.52].forEach((k, i) => {
    g.fillStyle = rgba([52, 62, 94], 0.42);
    g.beginPath();
    g.ellipse(i % 2 ? rx * 0.1 : -rx * 0.1, k * ry, rx * 0.13, ry * 0.12, 0, 0, TAU);
    g.fill();
  });
  g.beginPath();
  g.ellipse(0, 0, rx, ry, 0, 0, TAU);
  g.strokeStyle = rgba(tone, 0.45);
  g.lineWidth = 1.2;
  g.stroke();
  rim(g, 0.95 - haze * 0.5, 1.8);
  return c;
}

function soften(src: HTMLCanvasElement, px: number) {
  const c = canvas(SPRITE, SPRITE);
  const g = c.getContext('2d')!;
  g.filter = `blur(${px}px)`;
  g.drawImage(src, 0, 0);
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
  const bokeh: HTMLCanvasElement[] = [];
  function* sprites() {
    for (const [set, haze] of [[near, 0], [mid, 0.35], [far, 0.75]] as const) {
      for (let i = 0; i < (haze ? 6 : 12); i++) { set.bloom.push(bloomSprite(R0, haze)); yield; }
      for (let i = 0; i < (haze ? 2 : 4); i++) { set.side.push(sideSprite(R0, haze)); yield; }
      for (let i = 0; i < 3; i++) { set.bud.push(budSprite(R0, haze)); yield; }
      for (let i = 0; i < (haze ? 3 : 5); i++) { set.pod.push(podSprite(R0, haze)); yield; }
    }
    for (let i = 0; i < 3; i++) { bokeh.push(soften(near.bloom[i], 2.2)); yield; }
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
    const nNear = Math.max(5, Math.round(W / 100));
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
      let sprite = pick(set[kind], R);
      const nearest = isNear && R() < 0.12;
      if (nearest && kind === 'bloom') sprite = pick(bokeh, R);
      const base = isNear ? (small ? 30 : 38) + R() * (small ? 26 : 40) : 4 + 26 * Math.pow(t, 2);
      const size = base * scale * (kind === 'bud' ? 0.6 : kind === 'pod' ? 0.8 : kind === 'side' ? 0.9 : 1) * (nearest ? 1.15 : 1);
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

  function star(x: number, y: number, r: number, a: number) {
    if (!ctx || a < 0.03) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 0.9);
    g.addColorStop(0, `rgba(255,255,255,${a * 0.6})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.fillStyle = `rgba(252,253,255,${a})`;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r * 0.12, y - r * 0.12);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x + r * 0.12, y + r * 0.12);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r * 0.12, y + r * 0.12);
    ctx.lineTo(x - r, y);
    ctx.lineTo(x - r * 0.12, y - r * 0.12);
    ctx.closePath();
    ctx.fill();
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
      ctx.strokeStyle = rgba(mix(STEM, STEM_LIT, p.z * 0.6), 0.35 + p.z * 0.6);
      ctx.lineWidth = Math.max(0.6, p.size * 0.035);
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
        star(hx + s * 0.25, hy - s * 0.4, s * 0.28, Math.min(1, tw * (0.75 + gust * 0.5)));
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
