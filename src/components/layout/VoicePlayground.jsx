import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../../lib/hooks";
import "../../styles/playground.css";

/*
 * Icons only, no words. `size` is a multiple of the base size, `shape` and `tone` pick the CSS.
 * `label` is only for screen readers.
 */
const PIECES = [
  { id: "phone", label: "phone", icon: "phone", shape: "squircle", tone: "mint", size: 1.05 },
  { id: "calendar", label: "calendar", icon: "calendar", shape: "squircle", tone: "white", size: 0.96 },
  { id: "heart", label: "heart", icon: "heart", shape: "circle", tone: "navy", size: 0.9 },
  { id: "voice", label: "voice", icon: "voice", shape: "circle", tone: "teal", size: 1 },
  { id: "chat", label: "chat", icon: "chat", shape: "bubbleL", tone: "mintLight", size: 1.04 },
  { id: "stethoscope", label: "stethoscope", icon: "stethoscope", shape: "arch", tone: "wash", size: 0.92 },
  { id: "bell", label: "bell", icon: "bell", shape: "circle", tone: "blue", size: 0.82 },
  { id: "pill", label: "pill", icon: "pill", shape: "squircle", tone: "navy", size: 0.86 },
  { id: "clipboard", label: "clipboard", icon: "clipboard", shape: "arch", tone: "mint", size: 0.94 },
  { id: "clock", label: "clock", icon: "clock", shape: "circle", tone: "white", size: 0.88 },
  { id: "shield", label: "shield", icon: "shield", shape: "squircle", tone: "blue", size: 0.9 },
  { id: "microphone", label: "microphone", icon: "microphone", shape: "bubbleR", tone: "teal", size: 0.92 },
  { id: "cross", label: "medical cross", icon: "cross", shape: "circle", tone: "mintLight", size: 0.84 },
  { id: "globe", label: "globe", icon: "globe", shape: "circle", tone: "navy", size: 0.86 },
  { id: "person", label: "person", icon: "person", shape: "arch", tone: "white", size: 0.9 },
  { id: "envelope", label: "envelope", icon: "envelope", shape: "squircle", tone: "mint", size: 0.84 },
  { id: "headset", label: "headset", icon: "headset", shape: "bubbleL", tone: "wash", size: 0.96 },
  { id: "check", label: "check mark", icon: "check", shape: "circle", tone: "teal", size: 0.8 },
  { id: "clinic", label: "clinic", icon: "clinic", shape: "arch", tone: "blue", size: 0.98 },
  { id: "sparkle", label: "sparkle", icon: "sparkle", shape: "bubbleR", tone: "mintLight", size: 0.82 },
];

const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: "false" };
const ICONS = {
  phone: <path d="M16 10l11 12-7 8c5 9 10 13 18 17l8-7 12 11c-3 10-10 11-16 8C26 52 12 40 8 24c-1-6 1-11 8-14Z" />,
  calendar: <><rect x="9" y="14" width="46" height="42" rx="9" /><path d="M9 28h46M22 8v12M42 8v12M24 42l7 7 13-14" /></>,
  heart: <path d="M32 55C15 43 7 34 7 24a12.5 12.5 0 0 1 25-3 12.5 12.5 0 0 1 25 3c0 10-8 19-25 31Z" />,
  voice: <path d="M4 34h10l6-13 8 28 10-40 10 50 9-35 6 10h8" />,
  chat: <><path d="M10 12h44a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H32L19 55V44h-9a5 5 0 0 1-5-5V17a5 5 0 0 1 5-5Z" /><path d="M21 28h.1M32 28h.1M43 28h.1" strokeWidth="6" /></>,
  stethoscope: <><path d="M17 8v17a11 11 0 0 0 22 0V8" /><path d="M28 36v6a11 11 0 0 0 22 0v-5" /><circle cx="50" cy="31" r="5" /></>,
  bell: <><path d="M32 8c-11 0-18 8-18 19v10l-6 10h48l-6-10V27C50 16 43 8 32 8Z" /><path d="M25 52c1 5 4 7 7 7s6-2 7-7" /></>,
  pill: <g transform="rotate(-40 32 32)"><rect x="5" y="19" width="54" height="26" rx="13" /><path d="M32 19v26" /></g>,
  clipboard: <><rect x="12" y="11" width="40" height="48" rx="7" /><path d="M23 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" /><path d="M22 37l8 8 14-16" /></>,
  clock: <><circle cx="32" cy="32" r="23" /><path d="M32 17v16l11 6" /></>,
  shield: <><path d="M32 7l24 8v19c0 15-10 26-24 31C18 60 8 49 8 34V15Z" /><path d="M21 33l8 8 15-16" /></>,
  microphone: <><rect x="23" y="6" width="18" height="33" rx="9" /><path d="M14 30a18 18 0 0 0 36 0M32 48v9M23 57h18" /></>,
  cross: <path d="M25 8h14v17h17v14H39v17H25V39H8V25h17Z" />,
  globe: <><circle cx="32" cy="32" r="23" /><path d="M9 32h46M32 9c-10 8-10 38 0 46M32 9c10 8 10 38 0 46" /></>,
  person: <><circle cx="32" cy="22" r="13" /><path d="M8 58c2-14 12-21 24-21s22 7 24 21" /></>,
  envelope: <><rect x="7" y="13" width="50" height="38" rx="7" /><path d="M9 18l23 19 23-19" /></>,
  headset: <><path d="M11 37V31a21 21 0 0 1 42 0v6" /><rect x="7" y="35" width="11" height="17" rx="5" /><rect x="46" y="35" width="11" height="17" rx="5" /><path d="M51 52c0 6-7 8-15 8" /></>,
  check: <path d="M12 34l14 14 26-30" strokeWidth="7" />,
  clinic: <><path d="M8 29L32 9l24 20v27H8Z" /><path d="M27 56V41h10v15M32 20v10M27 25h10" /></>,
  sparkle: <path d="M32 6l7 18 18 7-18 7-7 18-7-18-18-7 18-7Z" />,
};

function PieceArt({ icon }) {
  return <svg viewBox="0 0 64 64" {...stroke} strokeWidth="4.5">{ICONS[icon]}</svg>;
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(n, Math.max(lo, hi)));
const rand = (a, b) => a + Math.random() * (b - a);

/**
 * A bounded toy. Pieces drop in when it scrolls into view, tumble, collide and settle over the big wordmark.
 * Drag to throw one, tap for a hop, arrow keys to push, Home to drop them all again. They are light: a piece
 * that is tossed up hangs for a moment before it comes down.
 * The animation loop runs only while something is moving and the stage is on screen.
 * It is never navigation, and the surrounding page always scrolls.
 */
export default function VoicePlayground() {
  const stageRef = useRef(null);
  const elements = useRef([]);
  const api = useRef({});
  const reduced = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    const nodes = elements.current;
    const bodies = PIECES.map(() => ({ x: 0, y: 0, lx: 0, ly: 0, vx: 0, vy: 0, a: 0, w: 0, r: 0, size: 0, im: 1, inPlay: false, drag: false }));
    let W = 0, H = 0, base = 100, g = 0.3;
    let raf = 0, last = 0, acc = 0, calm = 0, age = 0;
    let visible = false, started = false, sleeping = true;
    let drag = null, suppressClick = null;

    const setState = (s) => { stage.dataset.state = s; };
    const paint = (i) => {
      const b = bodies[i];
      nodes[i].style.transform = `translate3d(${(b.x - b.size / 2).toFixed(1)}px, ${(b.y - b.size / 2).toFixed(1)}px, 0) rotate(${b.a.toFixed(3)}rad)`;
    };
    const paintAll = () => bodies.forEach((_, i) => paint(i));

    const measure = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      base = clamp(W * 0.1, 62, 132);
      g = 0.3 * (base / 120); // light, so things hang in the air
      bodies.forEach((b, i) => {
        b.size = base * PIECES[i].size;
        b.r = b.size * 0.46;
        b.im = 1 / (b.r * b.r);
        nodes[i].style.setProperty("--s", `${b.size}px`);
        nodes[i].style.width = `${b.size}px`;
        nodes[i].style.height = `${b.size}px`;
      });
    };

    // ---- simulation -------------------------------------------------------------------------
    const collide = (p, q) => {
      const dx = q.x - p.x, dy = q.y - p.y;
      const min = p.r + q.r;
      const d2 = dx * dx + dy * dy;
      if (d2 >= min * min || d2 === 0) return;
      const d = Math.sqrt(d2);
      const nx = dx / d, ny = dy / d;
      const pim = p.drag ? 0 : p.im, qim = q.drag ? 0 : q.im;
      const total = pim + qim;
      if (total === 0) return;
      const push = (min - d) / total;
      p.x -= nx * push * pim; p.y -= ny * push * pim;
      q.x += nx * push * qim; q.y += ny * push * qim;
      const rvx = q.vx - p.vx, rvy = q.vy - p.vy;
      const vn = rvx * nx + rvy * ny;
      if (vn >= 0) return;
      const e = -vn > g * 5 ? 0.5 : 0; // gentle contacts do not bounce, so piles settle
      const j = (-(1 + e) * vn) / total;
      p.vx -= j * nx * pim; p.vy -= j * ny * pim;
      q.vx += j * nx * qim; q.vy += j * ny * qim;
      const vt = rvx * -ny + rvy * nx; // a little spin from the sliding contact
      p.w -= (vt / p.r) * 0.04; q.w -= (vt / q.r) * 0.04;
    };

    const step = () => {
      let moving = 0;
      age += 1;
      // After a few seconds, friction wins so a busy pile always comes to rest.
      const settleAssist = age > 300 ? 0.9 : 1;
      bodies.forEach((b) => {
        if (b.drag) return;
        b.lx = b.x; b.ly = b.y;
        b.vy += g;
        b.vy *= 0.994; // a little air resistance: the float on the way down
        b.x += b.vx; b.y += b.vy; b.a += b.w;
        b.w *= 0.996; b.vx *= 0.9985;
        if (settleAssist < 1) { b.vx *= settleAssist; b.vy *= settleAssist; b.w *= settleAssist; }
        if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.55; }
        if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.55; }
        if (b.inPlay && b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.4; }
        if (!b.inPlay && b.y - b.r >= 0) b.inPlay = true;
        if (b.y + b.r >= H) {
          b.y = H - b.r;
          b.vy = b.vy > g * 3 ? -b.vy * 0.5 : 0;
          b.vx *= 0.985;
          b.w += (b.vx / b.r - b.w) * 0.12; // rolling
        }
      });
      for (let pass = 0; pass < 3; pass += 1) {
        for (let i = 0; i < bodies.length; i += 1) for (let k = i + 1; k < bodies.length; k += 1) collide(bodies[i], bodies[k]);
      }
      bodies.forEach((b) => {
        if (b.drag) return;
        const speed = Math.abs(b.vx) + Math.abs(b.vy);
        if (speed < 0.3) { b.vx *= 0.9; b.w *= 0.9; }
        // Judge rest by how far the piece really moved this step. A piece resting under gravity keeps a tiny
        // velocity that the floor or its neighbour cancels, so velocity alone never reads as calm.
        if (Math.hypot(b.x - b.lx, b.y - b.ly) > 0.35 || Math.abs(b.w) > 0.006) moving += 1; // under half a pixel is rest
      });
      calm = moving === 0 && bodies.every((b) => b.inPlay) && !drag ? calm + 1 : 0;
      // A big pile can keep trembling by a fraction of a pixel. Twelve seconds after the last touch, call it done.
      if (age > 720 && bodies.every((b) => b.inPlay) && !drag) calm = 46;
    };

    const tick = (t) => {
      raf = 0;
      if (!visible || document.hidden || sleeping) { last = 0; return; }
      const dt = last ? Math.min((t - last) / 16.667, 3) : 1;
      last = t;
      acc += dt;
      let n = 0;
      while (acc >= 1 && n < 4) { step(); acc -= 1; n += 1; }
      paintAll();
      if (calm > 45) { sleeping = true; last = 0; setState("settled"); return; }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      sleeping = false; calm = 0; age = 0;
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; last = 0; };

    // ---- layouts ----------------------------------------------------------------------------
    const drop = () => {
      stop(); drag = null; measure();
      const order = bodies.map((_, i) => i).sort(() => Math.random() - 0.5);
      order.forEach((idx, n) => {
        const b = bodies[idx];
        const slot = (n + 0.5) / bodies.length;
        b.x = clamp(W * slot + rand(-0.4, 0.4) * base, b.r, W - b.r);
        b.y = -b.r - n * base * 0.5 - 24;
        b.vx = rand(-1.4, 1.4); b.vy = 0;
        b.a = rand(-0.8, 0.8); b.w = rand(-0.05, 0.05);
        b.inPlay = false; b.drag = false;
        nodes[idx].removeAttribute("data-dragging");
      });
      paintAll();
      setState("falling");
      wake();
    };
    // Reduce Motion: pieces simply rest on the floor, in rows, and can still be moved by hand.
    const settleStatic = () => {
      stop(); drag = null; measure(); sleeping = true;
      const cols = Math.max(3, Math.floor(W / (base * 0.9)));
      bodies.forEach((b, i) => {
        const row = Math.floor(i / cols), col = i % cols;
        const inRow = Math.min(cols, bodies.length - row * cols);
        const gap = Math.max(0, (W - inRow * base) / (inRow + 1));
        b.x = clamp(gap + base / 2 + col * (base + gap), b.r, W - b.r);
        b.y = H - b.r - row * base * 0.9;
        b.vx = 0; b.vy = 0; b.w = 0; b.a = ((i % 3) - 1) * 0.1; b.inPlay = true; b.drag = false;
      });
      paintAll();
      setState("settled");
    };
    const place = () => (reduced ? settleStatic() : drop());

    // ---- interaction ------------------------------------------------------------------------
    const down = (e, i) => {
      if (!e.isPrimary || e.button !== 0 || drag) return;
      const b = bodies[i];
      const rect = stage.getBoundingClientRect();
      drag = { i, id: e.pointerId, ox: e.clientX - rect.left - b.x, oy: e.clientY - rect.top - b.y, sx: e.clientX, sy: e.clientY, vx: 0, vy: 0, lt: e.timeStamp, distance: 0 };
      b.drag = true; b.vx = 0; b.vy = 0; b.w = 0; b.inPlay = true;
      suppressClick = null;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.setAttribute("data-dragging", "true");
      setState("dragging");
      wake();
    };
    const move = (e, i) => {
      if (!drag || drag.i !== i || drag.id !== e.pointerId) return;
      const b = bodies[i];
      const rect = stage.getBoundingClientRect();
      const nx = clamp(e.clientX - rect.left - drag.ox, b.r, W - b.r);
      const ny = clamp(e.clientY - rect.top - drag.oy, b.r, H - b.r);
      const dt = Math.max(8, e.timeStamp - drag.lt);
      drag.vx = drag.vx * 0.5 + ((nx - b.x) / dt) * 16.667 * 0.5;
      drag.vy = drag.vy * 0.5 + ((ny - b.y) / dt) * 16.667 * 0.5;
      b.x = nx; b.y = ny;
      drag.lt = e.timeStamp;
      drag.distance = Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy);
      paint(i);
    };
    const end = (e, i, cancelled = false) => {
      if (!drag || drag.i !== i || drag.id !== e.pointerId) return;
      const b = bodies[i];
      b.drag = false;
      const fresh = e.timeStamp - drag.lt < 100;
      if (cancelled || reduced || !fresh) { b.vx = 0; b.vy = 0; }
      else { b.vx = clamp(drag.vx, -26, 26); b.vy = clamp(drag.vy, -26, 26); b.w = (b.vx / b.r) * 0.3; }
      if (drag.distance > 5 || cancelled) suppressClick = i;
      drag = null;
      e.currentTarget.removeAttribute("data-dragging");
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
      setState(reduced ? "settled" : "falling");
      if (!reduced) wake();
    };
    const nudge = (i) => {
      if (suppressClick === i) { suppressClick = null; return; }
      const b = bodies[i];
      if (reduced) { b.x = clamp(b.x + (b.x < W / 2 ? 24 : -24), b.r, W - b.r); paint(i); return; }
      b.vy = -Math.sqrt(2 * g * base * rand(1.6, 2.4)); // a tall, floaty hop
      b.vx = rand(-3, 3); b.w = rand(-0.15, 0.15);
      setState("falling"); wake();
    };
    const key = (e, i) => {
      if (e.key === "Home") { e.preventDefault(); place(); return; }
      // Only one piece is a tab stop, so these keys step through the rest.
      if (e.key === "]" || e.key === "[") {
        e.preventDefault();
        nodes[(i + (e.key === "]" ? 1 : nodes.length - 1)) % nodes.length]?.focus();
        return;
      }
      const dirs = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      if (!dirs[e.key]) return;
      e.preventDefault();
      const b = bodies[i];
      const [dx, dy] = dirs[e.key];
      const boost = e.shiftKey ? 1.7 : 1;
      if (reduced) {
        b.x = clamp(b.x + dx * 16 * boost, b.r, W - b.r);
        b.y = clamp(b.y + dy * 16 * boost, b.r, H - b.r);
        paint(i); return;
      }
      b.vx += dx * 6 * boost;
      if (dy < 0) b.vy = -Math.sqrt(2 * g * base * 2 * boost);
      else if (dy > 0) b.vy += 5 * boost;
      setState("falling"); wake();
    };
    api.current = { down, move, end, nudge, key, reset: place };

    // ---- lifecycle --------------------------------------------------------------------------
    measure();
    bodies.forEach((b, i) => { b.y = -b.r * 2; paint(i); }); // parked above the stage until it is seen
    setState("idle");

    const resize = new ResizeObserver(() => {
      measure();
      if (!started) return;
      bodies.forEach((b) => { b.x = clamp(b.x, b.r, W - b.r); b.y = Math.min(b.y, H - b.r); });
      if (reduced) settleStatic();
      else { paintAll(); if (stage.dataset.state === "settled") setState("falling"); wake(); }
    });
    resize.observe(stage);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { stop(); return; }
      if (!started) { started = true; place(); } else if (!sleeping) wake();
    }, { threshold: 0.3 });
    observer.observe(stage);

    const onVisibility = () => { if (document.hidden) stop(); else if (!sleeping) wake(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { stop(); resize.disconnect(); observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); api.current = {}; };
  }, [reduced]);

  return (
    <section className="voice-playground" aria-labelledby="playground-title">
      <h2 id="playground-title" className="sr-only">Playground</h2>
      <p id="playground-help" className="sr-only">
        A playful extra. Drag a piece or tap it to toss it. With a piece focused, the arrow keys push it, the left and right bracket keys move to another piece, and Home drops them all again. Tab leaves the playground.
      </p>
      <div className="container">
        <div className="voice-playground__stage" ref={stageRef} data-state="idle">
          <div className="voice-playground__wordmark" aria-hidden="true">vocalis</div>
          {PIECES.map((piece, i) => (
            <button
              key={piece.id}
              type="button"
              ref={(el) => { elements.current[i] = el; }}
              tabIndex={i === 0 ? 0 : -1}
              className={`voice-piece voice-piece--${piece.shape} voice-piece--${piece.tone}`}
              aria-label={`Move ${piece.label} piece`}
              aria-describedby="playground-help"
              onPointerDown={(e) => api.current.down?.(e, i)}
              onPointerMove={(e) => api.current.move?.(e, i)}
              onPointerUp={(e) => api.current.end?.(e, i)}
              onPointerCancel={(e) => api.current.end?.(e, i, true)}
              onLostPointerCapture={(e) => api.current.end?.(e, i, true)}
              onClick={() => api.current.nudge?.(i)}
              onKeyDown={(e) => api.current.key?.(e, i)}
            >
              <PieceArt icon={piece.icon} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
