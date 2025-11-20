'use client';

import { usePathname } from 'next/navigation';
import FloatingNav from './FloatingNav';

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith('/projects/');

  if (isProjectPage) {
    return null;
  }

  return <FloatingNav />;
}
