import { fetchAPI } from "@/utils/fetch-api";
import { notFound } from "next/navigation";
import { Post } from "@/components/common";
import { getPostBySlug } from "@/utils/api-loaders";

export default async function PostRoute({ params }) {
  const { slug } = params;
  const data = await getPostBySlug(slug, "retails");

  if (data?.data?.length === 0) return notFound();

  return (
    <>
      <Post data={data?.data[0]} />
    </>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/retails`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(path, "", options);
  return articleResponse?.data?.map((article) => ({
    slug: article.attributes.slug,
  }));
}
