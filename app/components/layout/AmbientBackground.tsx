'use client';

import { useEffect, useRef, useState } from 'react';

type Point = { x: number; y: number };

/** Slow follow — soft glow, not a trail */
const LERP = 0.045;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<Point>({ x: -9999, y: -9999 });
  const headRef = useRef<Point>({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const [showGlow, setShowGlow] = useState(false);
  const [glowVisible, setGlowVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;

    if (reduced || coarse) {
      setShowGlow(false);
      return;
    }

    setShowGlow(true);

    const tick = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const target = targetRef.current;
      const head = headRef.current;
      head.x = lerp(head.x, target.x, LERP);
      head.y = lerp(head.y, target.y, LERP);

      const el = glowRef.current;
      if (el) {
        el.style.setProperty('--x', `${head.x}px`);
        el.style.setProperty('--y', `${head.y}px`);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setGlowVisible((v) => (v ? v : true));
    };

    const onLeave = () => {
      setGlowVisible(false);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background" />

      <div
        className="ambient-orb-a absolute top-[-12%] right-[-8%] h-[55vw] w-[55vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-orb-a) 0%, transparent 70%)',
        }}
      />
      <div
        className="ambient-orb-b absolute bottom-[-8%] left-[-10%] h-[48vw] w-[48vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-orb-b) 0%, transparent 70%)',
        }}
      />
      <div
        className="ambient-orb-c absolute top-[28%] left-[38%] h-[36vw] w-[36vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--ambient-orb-c) 0%, transparent 70%)',
        }}
      />

      {showGlow && (
        <div
          ref={glowRef}
          className="absolute inset-0 transition-opacity duration-[800ms]"
          style={{
            opacity: glowVisible ? 1 : 0,
            background:
              'radial-gradient(circle 280px at var(--x) var(--y), var(--ambient-cursor), transparent 70%)',
          }}
        />
      )}

      <div className="ambient-noise" />
    </div>
  );
}
