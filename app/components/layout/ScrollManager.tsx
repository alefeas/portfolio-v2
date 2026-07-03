'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SCROLL_TO_KEY } from '@/app/lib/sectionNavigation';

const MAX_ATTEMPTS = 24;
const RETRY_MS = 50;

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
      return;
    }

    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
        sessionStorage.removeItem(SCROLL_TO_KEY);
        return;
      }

      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        setTimeout(tryScroll, RETRY_MS);
      }
    };

    setTimeout(tryScroll, RETRY_MS);
  }, [pathname]);

  return null;
}
