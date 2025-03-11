import Link from "next/link";
import cx from "classnames";
import { getCategories } from "@/utils/api-loaders";

async function PostCategoryFilter({ activeCategory }) {
  const categories = await getCategories("/categories");

  if (!categories?.data?.length) return null;

  return (
    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-x-7 border-b border-[#E5E5E7] mb-8 min-w-max">
        <Link
          scroll={false}
          replace
          href="/blog"
          className={cx(`py-4 text-sm md:text-base font-medium transition-colors`, {
            "text-lightBlue border-b-2 border-lightBlue font-semibold -mb-px": !activeCategory,
            "text-lightGrayText hover:text-lightBlue": activeCategory,
          })}
        >
          All Posts
        </Link>
        {categories?.data?.map((category) => {
          const { name, slug } = category?.attributes;
          return (
            <Link
              key={category?.id}
              scroll={false}
              replace
              href={`/blog?category=${slug}`}
              className={cx(`py-4 text-sm md:text-base font-medium transition-colors`, {
                "text-lightBlue border-b-2 border-lightBlue font-semibold -mb-px": activeCategory === slug,
                "text-lightGrayText hover:text-lightBlue": activeCategory !== slug,
              })}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PostCategoryFilter;
