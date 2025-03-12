import { notFound } from "next/navigation";
import { getGlobal, getPageArticles, getPostBySlug } from "@/utils/api-loaders";
import { Post, PostHeader, SimilarPosts } from "@/components/blog";
import { InternalContact } from "@/components/forms";
import { Testimonials } from "@/components/common";

export default async function PostRoute({ params, searchParams }) {
  const { post } = await params;

  const [data, global] = await Promise.all([
    getPostBySlug(post, "articles"),
    getGlobal()
  ]);
  const { title, cover, description, category, publishedAt } = data?.data?.[0]?.attributes || [];
  const contactBackground = global?.data?.attributes?.contactBackground;
  const testimonials = global?.data?.attributes?.testimonials;
  if (data?.data?.length === 0) return notFound();
  console.log("global", global);
  return (
    <>
      <PostHeader
        title={title}
        category={category}
        cover={cover?.data?.attributes}
        description={description}
        publishedAt={publishedAt}
      />
      <div className="container px-4 md:px-0 py-4 md:py-8">
        <Post data={data?.data?.[0]} />
        <SimilarPosts postId={data?.data?.[0]?.id} categorySlug={category?.data?.attributes?.slug} searchParams={searchParams} />
      </div>
      <InternalContact
        data={{
          title: "Contact Us",
          description: "We're here to help you with any questions or concerns you may have. Please fill out the form below and we'll get back to you as soon as possible.",
          picture: contactBackground
        }}
      />
      <Testimonials
        data={testimonials}
      />
    </>
  );
}

export async function generateStaticParams() {
  const data = await getPageArticles("/articles");
  const { data: posts } = data;
  const postSlugs = posts?.map((post) => ({ post: post?.attributes?.slug }));
  return postSlugs;
}
