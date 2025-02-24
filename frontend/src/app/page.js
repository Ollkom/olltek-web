import { sectionRenderer } from "@/utils/section-renderer";
import { Testimonials } from "@/components/common";
import { getGlobal, getPageBySlug } from "@/utils/api-loaders";

export default async function RootRoute({ params, context }) {
  try {
    const page = await getPageBySlug("home");
    const testimonial = await getGlobal();

    if (page.error && page.error.status == 401)
      throw new Error(
        "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
      );

    if (page.data.length === 0) return null;
    const contentSections = page.data[0].attributes.contentSections;
    const testimonialBlock = testimonial?.data?.attributes?.testimonials;

    return (
      <>
        {contentSections.map((section, index) =>
          sectionRenderer(section, index)
        )}
        <div className="bg-[#F6F6F6]">
          <Testimonials data={testimonialBlock} />
        </div>
      </>
    );
  } catch (error) {
    window.alert("Missing or invalid credentials");
  }
}
