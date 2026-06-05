'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
  const pathname = usePathname();

  // On mount: disable browser scroll restoration so F5 always goes to top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // When navigating to home, check if we need to scroll to a section
  useEffect(() => {
    if (pathname === '/') {
      const target = sessionStorage.getItem('scrollTo');
      if (target) {
        sessionStorage.removeItem('scrollTo');
        // Instant scroll — coming from back button, no animation needed
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'instant' });
        }, 50);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  return null;
}
