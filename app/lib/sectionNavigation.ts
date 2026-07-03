import { floatingNavItems } from '@/app/constants/floatingNav';

export const SCROLL_TO_KEY = 'scrollTo';

export const SECTION_IDS = floatingNavItems.map((item) => item.id);

export type SectionId = (typeof SECTION_IDS)[number];

export function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value);
}

export function setScrollTarget(id: string) {
  if (!isSectionId(id)) return;
  sessionStorage.setItem(SCROLL_TO_KEY, id);
}

export function buildSectionUrl(baseUrl: string, section: SectionId): string {
  const normalized = baseUrl.replace(/\/$/, '');
  return `${normalized}/go/${section}`;
}
