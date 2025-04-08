import { SectionHeader } from "@/components/common"
import { PostCardSkeleton, PostCategoryFilter, PostCategoryFilterSkeleton, PostGrid } from "@/components/blog";
import { Suspense } from "react"

async function AllBlogPosts({ pageSlug, pageArticles, category, title, limit }) {


    return (
        <div className="container px-4 md:px-0 py-4 md:py-8">
            <div className="py-6 md:py-8">
                <SectionHeader title={title} />
            </div>
            <Suspense fallback={<PostCategoryFilterSkeleton itemCount={4} />}>
                <PostCategoryFilter activeCategory={category} />
            </Suspense>
            <Suspense fallback={<PostCardSkeleton itemCount={6} />}>
                <PostGrid
                    pageSlug={pageSlug}
                    pageArticles={pageArticles}
                    category={category}
                    limit={limit}
                />
            </Suspense>
        </div>
    )
}

export default AllBlogPosts