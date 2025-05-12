import { notFound } from "next/navigation";
import { getGlobal, getIndustries, getLocations, getPageBySlug } from "@/utils/api-loaders";
import { OurBrands } from "@/components/brands";
import { InternalContact } from "@/components/forms";

export default async function PageRoute() {
  const [page, locations, industries, global] = await Promise.all([getPageBySlug("brands"), getLocations("/locations"), getIndustries("/industries"), getGlobal()])

  const contentSections = page?.data?.[0]?.attributes?.contentSections;
  const pageHeader = contentSections?.find(item => item.__component === "layout.page-header") || null;
  const leadForm = global?.data?.attributes?.leadForm;
  if (contentSections?.length === 0) return notFound();

  return (
    <>
      {industries && <OurBrands pageHeader={pageHeader} locations={locations} industries={industries} />}
      {leadForm && <InternalContact
        leadForm={leadForm}
      />}
    </>
  );
}
