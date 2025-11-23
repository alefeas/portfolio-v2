import { SectionHeaderProps } from '@/app/types';

export default function SectionHeader({
  icon,
  badge,
  title,
  description,
  highlightText,
}: SectionHeaderProps) {
  const badgeText = typeof badge === 'string' ? badge : Array.isArray(badge) ? badge[0] : badge;
  const titleText = typeof title === 'string' ? title : Array.isArray(title) ? title[0] : title;
  const descText = typeof description === 'string' ? description : Array.isArray(description) ? description[0] : description;
  const highlightStr = typeof highlightText === 'string' ? highlightText : Array.isArray(highlightText) ? highlightText[0] : highlightText;

  return (
    <>
      {/* Section Badge */}
      <div className="mb-8">
        <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
          {icon}
          <h1 className="text-sm font-semibold tracking-wide max-sm:text-xs">{badgeText}</h1>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-16">
        <h2 className="heading-2 text-white mb-3">{titleText}</h2>
        <p className="text-slate-400 text-base max-w-2xl">
          {descText}
          {highlightStr && (
            <span className="text-primary-400 font-medium"> {highlightStr}</span>
          )}
        </p>
      </div>
    </>
  );
}
