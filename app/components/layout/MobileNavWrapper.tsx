'use client';

import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';

export default function MobileNavWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith('/projects/') || pathname.startsWith('/go/')) {
    return null;
  }

  return <MobileNav />;
}
