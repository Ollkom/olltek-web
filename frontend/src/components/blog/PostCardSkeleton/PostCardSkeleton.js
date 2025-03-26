function PostCardSkeleton({ itemCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-1 md:px-0">
      {Array(itemCount)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col">
            {/* Image skeleton */}
            <div className="aspect-square w-full bg-neutral-100 dark:bg-neutral-200 animate-pulse" />

            {/* Content wrapper */}
            <div className="flex flex-col gap-2 pt-3">
              {/* Title skeleton */}
              <div className="h-4 md:h-5 w-3/4 bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />

              {/* Description skeleton - two lines */}
              <div className="space-y-2">
                <div className="h-3 md:h-4 w-full bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />
                <div className="h-3 md:h-4 w-full bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />
                <div className="h-3 md:h-4 w-2/3 bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />
              </div>
            </div>

            {/* Read more link skeleton */}
            <div className="pt-3">
              <div className="h-5 md:h-7 w-28 bg-neutral-100 dark:bg-neutral-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostCardSkeleton;
