import { notFound } from "next/navigation";
import { getLocations, getPageBySlug, getSolutions } from "@/utils/api-loaders";
import { OurPartners } from "@/components/partners";

export default async function PageRoute() {
  const [page, locations, solutions] = await Promise.all([getPageBySlug("partners"), getLocations("/locations"), getSolutions("/solutions")])

  const contentSections = page?.data[0]?.attributes?.contentSections;
  const pageHeader = contentSections?.find(item => item.__component === "layout.page-header") || null;

  if (page?.data?.length === 0) return notFound();

  return (
    <>
      {solutions && <OurPartners pageHeader={pageHeader} locations={locations} solutions={solutions} />}
    </>
  );
}