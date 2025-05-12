import { notFound } from "next/navigation";
import { getGlobal, getLocations, getPageBySlug, getSolutions } from "@/utils/api-loaders";
import { OurPartners } from "@/components/partners";
import { InternalContact } from "@/components/forms";

export default async function PageRoute() {
  const [page, locations, solutions, global] = await Promise.all([getPageBySlug("partners"), getLocations("/locations"), getSolutions("/solutions"), getGlobal()])

  const contentSections = page?.data[0]?.attributes?.contentSections;
  const pageHeader = contentSections?.find(item => item.__component === "layout.page-header") || null;
  const leadForm = global?.data?.attributes?.leadForm;
  if (page?.data?.length === 0) return notFound();

  return (
    <>
      {solutions && <OurPartners pageHeader={pageHeader} locations={locations} solutions={solutions} />}
      {leadForm && <InternalContact
        leadForm={leadForm}
      />}
    </>
  );
}