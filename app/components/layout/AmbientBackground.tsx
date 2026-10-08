'use client';

import { useEffect, useRef } from 'react';

type Node = { bx: number; by: number; x: number; y: number };

const CELL = 52;
const RADIUS = 300;
const STRENGTH = 0.12;
/** Peak line alpha near the cursor — primary navy on light bg */
const PEAK_ALPHA = 0.42;
const FADE_IN = 0.08;
const FADE_OUT = 0.05;

function hexToRgb(hex: string): string {
  const raw = hex.trim().replace('#', '');
  if (raw.length !== 6) return '0, 29, 81';
  const n = Number.parseInt(raw, 16);
  if (Number.isNaN(n)) return '0, 29, 81';
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    // Cursor-only effect — nothing to show without a fine pointer
    if (reduced || coarse) return;

    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();
    const lineRgb = hexToRgb(primary || '#001D51');

    let W = 0;
    let H = 0;
    let nodes: Node[][] = [];
    let rafId = 0;
    let running = true;
    let hoverStr = 0;

    const mouse = { x: -9999, y: -9999, active: false };

    const buildGrid = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;
      for (let r = -1; r <= rows; r++) {
        const row: Node[] = [];
        for (let c = -1; c <= cols; c++) {
          row.push({
            bx: c * CELL,
            by: r * CELL,
            x: c * CELL,
            y: r * CELL,
          });
        }
        nodes.push(row);
      }
    };

    const edgeFade = (bx: number, by: number) => {
      const ex = Math.min(bx, W - bx) / (CELL * 3);
      const ey = Math.min(by, H - by) / (CELL * 3);
      return Math.min(1, ex) * Math.min(1, ey);
    };

    const segmentAlpha = (ax: number, ay: number, bx: number, by: number) => {
      if (hoverStr < 0.01) return 0;
      const dist = Math.min(
        Math.hypot(ax - mouse.x, ay - mouse.y),
        Math.hypot(bx - mouse.x, by - mouse.y),
      );
      if (dist >= RADIUS) return 0;
      const t = dist / RADIUS;
      // Smooth cosine falloff — strong at cursor, gone at edge
      const falloff = (Math.cos(t * Math.PI) + 1) / 2;
      return falloff * PEAK_ALPHA * hoverStr;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      if (!nodes.length || hoverStr < 0.01) return;

      const rows = nodes.length;
      const cols = nodes[0].length;
      ctx.lineWidth = 0.7;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const a = nodes[r][c];
          const b = nodes[r][c + 1];
          const alpha = segmentAlpha(a.x, a.y, b.x, b.y);
          if (alpha < 0.004) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${lineRgb},${alpha.toFixed(3)})`;
          ctx.stroke();
        }
      }

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const a = nodes[r][c];
          const b = nodes[r + 1][c];
          const alpha = segmentAlpha(a.x, a.y, b.x, b.y);
          if (alpha < 0.004) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${lineRgb},${alpha.toFixed(3)})`;
          ctx.stroke();
        }
      }
    };

    const tick = () => {
      if (!running) return;

      if (!document.hidden && nodes.length) {
        const target = mouse.active ? 1 : 0;
        hoverStr += (target - hoverStr) * (mouse.active ? FADE_IN : FADE_OUT);

        const rows = nodes.length;
        const cols = nodes[0].length;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const n = nodes[r][c];
            if (!mouse.active) {
              n.x += (n.bx - n.x) * 0.07;
              n.y += (n.by - n.y) * 0.07;
            } else {
              const dx = mouse.x - n.bx;
              const dy = mouse.y - n.by;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < RADIUS && dist > 0) {
                const t = dist / RADIUS;
                const force = (Math.cos(t * Math.PI) + 1) / 2;
                const pull = force * STRENGTH * edgeFade(n.bx, n.by);
                const targetX = n.bx + (dx / dist) * pull * RADIUS * 0.28;
                const targetY = n.by + (dy / dist) * pull * RADIUS * 0.28;
                n.x += (targetX - n.x) * 0.1;
                n.y += (targetY - n.y) * 0.1;
              } else {
                n.x += (n.bx - n.x) * 0.07;
                n.y += (n.by - n.y) * 0.07;
              }
            }
          }
        }

        draw();
      }

      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    buildGrid();
    window.addEventListener('resize', buildGrid, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener('resize', buildGrid);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
