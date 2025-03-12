function PostCategoryFilterSkeleton({ itemCount }) {
  return (
    <div className="flex flex-wrap gap-3 my-4">
      {Array(itemCount)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-20 h-7 transition-opacity animate-pulse bg-neutral-100 dark:bg-neutral-200"
          />
        ))}
    </div>
  );
}

export default PostCategoryFilterSkeleton;
