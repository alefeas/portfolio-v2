'use client';

export default function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen text-foreground">
      {/* Back Button Skeleton */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 mt-16 md:mt-20">
        {/* Badges */}
        <div className="flex items-center gap-2 md:gap-3 mb-6 flex-wrap">
          <div className="h-8 w-24 bg-muted rounded-full animate-pulse" />
          <div className="h-8 w-20 bg-muted rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <div className="mb-4">
          <div className="h-12 w-3/4 bg-muted rounded animate-pulse" />
        </div>

        {/* Subtitle */}
        <div className="mb-8 md:mb-12 space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        </div>

        {/* Carousel Skeleton */}
        <div className="mb-20">
          <div className="w-full rounded-3xl overflow-hidden bg-muted border border-border" style={{ aspectRatio: '2/1' }}>
            <div className="w-full h-full bg-muted animate-pulse" />
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 w-40 bg-muted rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
