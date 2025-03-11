import { Pagination, SectionHeader } from "@/components/common"
import { PostCardSkeleton, PostCategoryFilter, PostCategoryFilterSkeleton, PostGrid } from "@/components/blog";
import { Suspense } from "react"
import { getPageArticles } from "@/utils/api-loaders";

async function AllBlogPosts({ pageSlug, pageArticles, category, title, limit }) {

    const posts = await getPageArticles(pageArticles, category, 0, limit);

    const currentPostsCount = posts?.data?.length;
    const totalPosts = posts?.meta?.pagination?.total;

    if (!currentPostsCount) return null;

    return (
        <div className="container px-4 md:px-0 py-4 md:py-8">
            <div className="py-6 md:py-8">
                <SectionHeader title={title} />
            </div>
            <Suspense fallback={<PostCategoryFilterSkeleton itemCount={4} />}>
                <PostCategoryFilter activeCategory={category} />
            </Suspense>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-1 md:px-0">
                <Suspense fallback={<PostCardSkeleton itemCount={6} />}>
                    <PostGrid
                        pageSlug={pageSlug}
                        pageArticles={pageArticles}
                        category={category}
                        posts={posts?.data}
                        title={title}
                    />
                </Suspense>
            </div>
            <Pagination
                totalItems={totalPosts}
                currentItems={currentPostsCount}
                buttonText={"View More"}
                collectionName={"posts"}
            />
        </div>
    )
}

export default AllBlogPosts