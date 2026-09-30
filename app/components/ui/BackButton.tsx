'use client';

import { useRouter } from 'next/navigation';
import { BackButtonProps } from '@/app/types';
import { isSectionId } from '@/app/lib/sectionNavigation';

export default function BackButton({ scrollToId, title = "Back" }: BackButtonProps & { scrollToId?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (scrollToId && isSectionId(scrollToId)) {
      router.push(`/go/${scrollToId}`);
      return;
    }
    router.back();
  };

  return (
    <button
      onClick={handleClick}
      className="chrome-enter fixed top-6 left-6 z-50 h-[50px] px-4 py-2 flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-300 cursor-pointer"
      title={title}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="text-sm font-normal">Back</span>
    </button>
  );
}
