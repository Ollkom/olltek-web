import { PostCard } from "@/components/blog";
import { Pagination } from "@/components/common";
import { getPageArticles } from "@/utils/api-loaders";

const PostGrid = async ({ pageSlug, pageArticles, category, limit }) => {

  const posts = await getPageArticles(pageArticles, category, 0, limit);

  const currentPostsCount = posts?.data?.length;
  const totalPosts = posts?.meta?.pagination?.total;

  if (!currentPostsCount) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-1 md:px-0">
        {posts?.data?.map((card) => (
          <PostCard card={card} key={card?.id} pageSlug={pageSlug} />
        ))}
      </div>
      <Pagination
        totalItems={totalPosts}
        currentItems={currentPostsCount}
        buttonText={"View More"}
        collectionName={"posts"}
      />
    </>
  );
};

export default PostGrid;
