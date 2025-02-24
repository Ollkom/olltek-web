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
  const page = await getPageBySlug(params?.slug, params?.lang);
  const testimonial = await getGlobal();

  const ShouldDisplayTestimonials = ["technology"];

  if (page?.data?.length === 0) return notFound();
  const contentSections = page?.data[0]?.attributes?.contentSections;
  const testimonialBlock = testimonial?.data?.attributes?.testimonials;
  const InternalContactForm = contentSections.find(
    (item) => item.__component === "sections.internal-contact-form"
  );
  return (
    <>
      {contentSections.map((section, index) =>
        subSectionRenderer(section, index)
      )}
      {!ShouldDisplayTestimonials.includes(params?.slug) && (
        <div className="bg-[#F6F6F6]">
          <Testimonials data={testimonialBlock} />
        </div>
      )}
      {InternalContactForm && (
        <InternalContact data={InternalContactForm} department="retail" />
      )}
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
        "retail",
        "marketing",
        "technology",
      ],
    },
  };
  const articleResponse = await fetchAPI(path, urlParamsObject, options);
  return articleResponse?.data?.map((article) => ({
    slug: article.attributes.slug,
  }));
}
