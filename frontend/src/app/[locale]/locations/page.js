import { notFound } from "next/navigation";
import { getGlobal, getLocations, getPageBySlug } from "@/utils/api-loaders";
import { OurLocations } from "@/components/locations";
import { InternalContact } from "@/components/forms";

export default async function PageRoute() {
  const [page, locations, global] = await Promise.all([getPageBySlug("locations"), getLocations("/locations"), getGlobal()])

  const contentSections = page?.data[0]?.attributes?.contentSections;
  const pageHeader = contentSections?.find(item => item.__component === "layout.page-header") || null;
  const leadForm = global?.data?.attributes?.leadForm;

  if (locations?.data?.length === 0) return notFound();
  return (
    <>
      {locations && <OurLocations data={locations} pageHeader={pageHeader} />}
      {leadForm && <InternalContact
        leadForm={leadForm}
      />}
    </>
  );
}
