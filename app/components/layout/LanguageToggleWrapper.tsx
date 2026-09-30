'use client';

import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';

export default function LanguageToggleWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith('/go/')) {
    return null;
  }

  return <LanguageToggle />;
}
