import { SectionHeader } from "@/components/common";
import { MotionCardStaggered, MotionContainer } from "@/components/ui";
import { formatDate, getStrapiMedia } from "@/utils/api-helpers";
import { getPageArticles } from "@/utils/api-loaders";
import Image from "next/image";
import Link from "next/link";

const BlogPosts = async (props) => {
    const { data } = props;
    const { title, description, type } = data;

    const blogPosts = await getPageArticles(
        "/articles",
        null,
        0,
        5,
        type
    );

    if (!blogPosts?.data || blogPosts.data.length === 0) return null;

    const featuredPost = blogPosts.data[0];
    const featuredPostImage = featuredPost?.attributes?.cover?.data?.attributes;
    const sidebarPosts = blogPosts.data.slice(1);

    return (
        <section className="py-8 md:py-16">
            <MotionContainer>
                <div className="px-5 md:px-0 container mx-auto">
                    <SectionHeader title={title} description={description} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                        {/* Featured Article */}
                        <MotionCardStaggered>
                            <div className="lg:col-span-1">
                                <Link href={`/blog/${featuredPost.attributes.slug}` || "/"}
                                    className="rounded-md overflow-hidden flex flex-col gap-2">
                                    <div className="relative aspect-video">
                                        {featuredPostImage?.url &&
                                            <Image
                                                src={getStrapiMedia(featuredPostImage?.url)}
                                                alt={featuredPost?.attributes?.title}
                                                width={featuredPostImage?.width}
                                                height={featuredPostImage?.height}
                                                className="w-full h-auto object-cover rounded-md"
                                            />}
                                    </div>
                                    <div className="flex flex-col justify-between gap-1">
                                        <div className="flex flex-col gap-1">
                                            {featuredPost?.attributes?.title && (
                                                <h2 className="text-lg md:text-2xl font-medium text-darkGrayText hover:text-lightBlue">
                                                    {featuredPost?.attributes?.title}
                                                </h2>)}

                                            {featuredPost?.attributes?.description && (
                                                <p className="text-lightGrayText font-normal text-sm md:text-base line-clamp-3">
                                                    {featuredPost?.attributes?.description}
                                                </p>
                                            )}
                                        </div>
                                        {featuredPost?.attributes?.publishedAt && (
                                            <p className="font-semibold text-darkGrayText text-xs md:text-base">
                                                {formatDate(featuredPost?.attributes?.publishedAt)}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </MotionCardStaggered>
                        {/* Related Articles - Vertical stack */}
                        <div className="lg:col-span-1">
                            <div className="space-y-6">
                                {sidebarPosts.map((post, index) => {
                                    const postImage = post?.attributes?.cover?.data?.attributes;
                                    return (
                                        <MotionCardStaggered key={post.id} index={index}>
                                            <div className="flex flex-col md:flex-row gap-x-4 gap-y-2">
                                                <div className="flex-shrink-0">
                                                    {postImage &&
                                                        <Image
                                                            src={getStrapiMedia(postImage?.url)}
                                                            alt={post?.attributes?.title}
                                                            width={postImage?.width}
                                                            height={postImage?.height}
                                                            className="w-full md:max-h-[118px] md:w-[120px] 2xl:w-[188px] object-cover rounded-md"
                                                        />}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between min-w-0 gap-1">
                                                    <div className="flex flex-col gap-1">
                                                        {post?.attributes?.title &&
                                                            <Link href={`/blog/${post?.attributes?.slug}`}>
                                                                <h3 className="text-md 2xl:text-xl font-medium text-darkGrayText line-clamp-2 hover:text-lightBlue">
                                                                    {post?.attributes?.title}
                                                                </h3>
                                                            </Link>}
                                                        {post?.attributes?.description && <p className="text-sm 2xl:text-base text-lightGrayText line-clamp-2">
                                                            {post?.attributes?.description}
                                                        </p>}
                                                    </div>
                                                    {post?.attributes?.publishedAt && <p className="text-xs 2xl:text-sm font-semibold text-darkGrayText ">
                                                        {formatDate(post?.attributes?.publishedAt)}
                                                    </p>}
                                                </div>
                                            </div>
                                        </MotionCardStaggered>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </MotionContainer >
        </section >
    );
};

export default BlogPosts