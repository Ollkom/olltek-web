import { notFound } from "next/navigation";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { getGlobal, getPageBySlug } from "@/utils/api-loaders";
import { Testimonials } from "@/components/common";
import { InternalContact } from "@/components/forms";
import { fetchAPI } from "@/utils/fetch-api";
import { FALLBACK_SEO } from "@/utils/constants";

export async function generateMetadata(props) {
  const params = await props.params;
  const page = await getPageBySlug(params?.slug);

  if (!page?.data[0]?.attributes?.seo) return FALLBACK_SEO;
  const metadata = page?.data[0].attributes.seo;

  return {
    title: metadata?.metaTitle,
    description: metadata?.metaDescription,
  };
}

export default async function PageRoute(props) {
  const params = await props.params;
  const [page, global] = await Promise.all([
    getPageBySlug(params?.slug),
    getGlobal()
  ]);
  const contentSections = page?.data?.[0]?.attributes?.contentSections;
  const backgroundImage = global?.data?.attributes?.backgroundImage;
  const testimonials = global?.data?.attributes?.testimonials;

  if (page?.data?.length === 0) return notFound();
  return (
    <>
      {contentSections.map((section, index) =>
        subSectionRenderer(section, index)
      )}

      <InternalContact
        data={{
          title: "Contact Us",
          description: "We're here to help you with any questions or concerns you may have. Please fill out the form below and we'll get back to you as soon as possible.",
          picture: backgroundImage
        }}
      />
      <Testimonials
        data={testimonials}
      />
    </>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/pages`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const urlParamsObject = {
    filters: {
      slug: [
        "contact-us",
        "careers",
        "about-us",
        "logistics",
        "technology",
        "blog",
        "legal",
        "payment",
        "warehousing",
        "customer-service",
        "brands",
        "partners",
        "locations"
      ],
    },
  };
  const articleResponse = await fetchAPI(path, urlParamsObject, options);
  return articleResponse?.data?.map((article) => ({
    slug: article.attributes.slug,
  }));
}
