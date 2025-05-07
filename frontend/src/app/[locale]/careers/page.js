import { getGlobal, getPageBySlug } from "@/utils/api-loaders";
import { subSectionRenderer } from "@/utils/sub-section-renderer";
import { InternalContact } from "@/components/forms";
import { Testimonials } from "@/components/common";
import { AllCareers } from "@/components/careers";

export default async function PageRoute({ searchParams }) {
    const pageSlug = "careers";
    const pageArticles = "/careers";
    const { role, location, team, limit } = await searchParams;

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
                subSectionRenderer(section, index, "careers")
            )}
            <AllCareers
                pageSlug={pageSlug}
                pageArticles={pageArticles}
                role={role}
                location={location}
                team={team}
                limit={limit}
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