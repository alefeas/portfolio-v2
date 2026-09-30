'use client';

import { usePathname } from 'next/navigation';
import FloatingNav from './FloatingNav';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNav = pathname.startsWith('/projects/') || pathname.startsWith('/go/');

  if (hideNav) {
    return null;
  }

  return <FloatingNav />;
}
