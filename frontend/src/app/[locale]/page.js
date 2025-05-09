import { sectionRenderer } from "@/utils/section-renderer";
import { Testimonials } from "@/components/common";
import { getGlobal, getPageBySlug } from "@/utils/api-loaders";
import { notFound } from "next/navigation";
import { InternalContact } from "@/components/forms";

export default async function RootRoute() {
  try {
    const [page, global] = await Promise.all([
      getPageBySlug("home"),
      getGlobal()
    ]);


    if (page?.error && page?.error?.status == 401)
      throw new Error(
        "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
      );

    if (page?.data?.length === 0) return notFound();
    const contentSections = page?.data?.[0]?.attributes?.contentSections;
    const testimonialBlock = global?.data?.attributes?.testimonials;
    const leadForm = global?.data?.attributes?.leadForm;

    return (
      <>
        {contentSections?.map((section, index) =>
          sectionRenderer(section, index)
        )}
        <InternalContact
          leadForm={leadForm}
        />
        <Testimonials data={testimonialBlock} />
      </>
    );
  } catch (error) {
    console.error("Missing or invalid credentials", error.message);
    return notFound();
  }
}
