'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  isSectionId,
  setScrollTarget,
  SECTION_NAV_HOLD_KEY,
} from '@/app/lib/sectionNavigation';

export default function GoToSectionPage() {
  const { section } = useParams<{ section: string }>();
  const router = useRouter();

  useEffect(() => {
    try {
      sessionStorage.setItem(SECTION_NAV_HOLD_KEY, '1');
    } catch {
      /* ignore */
    }

    if (isSectionId(section)) {
      setScrollTarget(section);
    }
    router.replace('/');
  }, [section, router]);

  return null;
}
