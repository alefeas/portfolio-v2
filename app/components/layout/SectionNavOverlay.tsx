'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  SECTION_NAV_HOLD_KEY,
  SECTION_NAV_SETTLED_EVENT,
} from '@/app/lib/sectionNavigation';

export default function SectionNavOverlay() {
  const pathname = usePathname();
  const [held, setHeld] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onGoRoute = pathname.startsWith('/go/');
  const visible = onGoRoute || held;
  // SSR + first paint on /go: show overlay before client hydration of held state
  const show = onGoRoute || (mounted && held);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(SECTION_NAV_HOLD_KEY) === '1') {
        setHeld(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (onGoRoute) {
      setHeld(true);
    }
  }, [onGoRoute]);

  useEffect(() => {
    const onSettled = () => {
      try {
        sessionStorage.removeItem(SECTION_NAV_HOLD_KEY);
      } catch {
        /* ignore */
      }
      setHeld(false);
    };

    window.addEventListener(SECTION_NAV_SETTLED_EVENT, onSettled);
    return () => window.removeEventListener(SECTION_NAV_SETTLED_EVENT, onSettled);
  }, []);

  useLayoutEffect(() => {
    if (!show) return;
    document.body.dataset.chromeHold = '1';
    return () => {
      delete document.body.dataset.chromeHold;
    };
  }, [show]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background"
      aria-hidden
    >
      <div className="section-nav-spinner" />
    </div>
  );
}
