import { getCategories } from "@/utils/api-loaders";
import { PostCategoryFilterTabs } from "@/components/blog";

async function PostCategoryFilter({ activeCategory }) {
  const categories = await getCategories("/categories");

  if (!categories?.data?.length) return null;

  return (
    <PostCategoryFilterTabs
      categories={categories.data}
      activeCategory={activeCategory}
    />
  );
}

export default PostCategoryFilter;
