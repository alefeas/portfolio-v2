'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  SCROLL_TO_KEY,
  SECTION_NAV_HOLD_KEY,
  SECTION_NAV_SETTLED_EVENT,
} from '@/app/lib/sectionNavigation';

const MAX_ATTEMPTS = 24;
const RETRY_MS = 50;

function notifySettled() {
  try {
    sessionStorage.removeItem(SECTION_NAV_HOLD_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(SECTION_NAV_SETTLED_EVENT));
}

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

    const target = sessionStorage.getItem(SCROLL_TO_KEY);

    if (!target) {
      window.scrollTo(0, 0);
      notifySettled();
      return;
    }

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
        sessionStorage.removeItem(SCROLL_TO_KEY);
        notifySettled();
        return;
      }

      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        timer = setTimeout(tryScroll, RETRY_MS);
      } else {
        sessionStorage.removeItem(SCROLL_TO_KEY);
        notifySettled();
      }
    };

    tryScroll();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
