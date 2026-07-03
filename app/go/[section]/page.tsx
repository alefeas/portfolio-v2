'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { isSectionId, setScrollTarget } from '@/app/lib/sectionNavigation';

export default function GoToSectionPage() {
  const { section } = useParams<{ section: string }>();
  const router = useRouter();

  useEffect(() => {
    if (isSectionId(section)) {
      setScrollTarget(section);
    }
    router.replace('/');
  }, [section, router]);

  return null;
}
