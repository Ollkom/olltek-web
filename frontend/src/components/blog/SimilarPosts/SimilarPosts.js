import { MotionContainer } from "@/components/ui";
import { PostCard } from "@/components/blog";
import { getPageArticles } from "@/utils/api-loaders";
import { Pagination, SectionHeader } from "@/components/common";

async function SimilarPosts({ postId, categorySlug, searchParams }) {

  const { limit } = await searchParams;


  const similarPosts = await getPageArticles(
    "/articles",
    categorySlug,
    0,
    limit,
    null,
    postId
  );

  const currentPostsCount = similarPosts?.data?.length;
  const totalPosts = similarPosts?.meta?.pagination?.total;

  if (similarPosts?.data?.length === 0) return null;

  return (
    <section className="py-8 md:py-16">
      <MotionContainer>
        <div className="px-5 md:px-0 container mx-auto">
          <SectionHeader title="Related Posts" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mt-8">
            {similarPosts?.data?.map((post) => (
              <div key={post?.id}>
                <PostCard card={post} />
              </div>
            ))}
          </div>
          <Pagination
            totalItems={totalPosts}
            currentItems={currentPostsCount}
            buttonText="View More"
            collectionName="posts"
            range={limit}
          />
        </div>
      </MotionContainer>
    </section>
  );
}

export default SimilarPosts;
