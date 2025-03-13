import { getGlobal, getPageBySlug } from "@/utils/api-loaders";
import { AllBlogPosts } from "@/components/blog";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { InternalContact } from "@/components/forms";
import { Testimonials } from "@/components/common";

export default async function PageRoute({ searchParams }) {
  const pageSlug = "blog";
  const pageArticles = "/articles";
  const { category, limit } = await searchParams;

  const [page, global] = await Promise.all([
    getPageBySlug(pageSlug),
    getGlobal()
  ]);
  const contentSections = page?.data?.[0]?.attributes?.contentSections;
  const contactBackground = global?.data?.attributes?.contactBackground;
  const testimonials = global?.data?.attributes?.testimonials;
  return (
    <>
      {contentSections?.map((section, index) =>
        subSectionRenderer(section, index, "blog")
      )}
      <AllBlogPosts
        pageSlug={pageSlug}
        pageArticles={pageArticles}
        category={category}
        limit={limit}
        title="All Blog Posts"
      />
      <InternalContact
        data={{
          title: "Contact Us For Further Assistance",
          description: "We're here to help—reach out to our team today!",
          picture: contactBackground
        }}
      />
      <Testimonials
        data={testimonials}
      />
    </>
  );
}
