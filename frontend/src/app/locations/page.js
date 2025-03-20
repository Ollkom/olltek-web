import { notFound } from "next/navigation";
import { getLocations, getPageBySlug } from "@/utils/api-loaders";
import { OurLocations } from "@/components/locations";

export default async function PageRoute() {
  const [page, locations] = await Promise.all([getPageBySlug("locations"), getLocations("/locations")])

  const contentSections = page?.data[0]?.attributes?.contentSections;
  const pageHeader = contentSections?.find(item => item.__component === "layout.page-header") || null;


  if (locations?.data?.length === 0) return notFound();
  return (
    <>
      {locations && <OurLocations data={locations} pageHeader={pageHeader} />}
    </>
  );
}
