import { notFound } from "next/navigation";
import { getLocations, getPageBySlug } from "@/utils/api-loaders";
import { OurBrands } from "@/components/brands";

export default async function PageRoute({ params }) {
  const [page, locations] = await Promise.all([getPageBySlug("brands"), getLocations("/locations")])

  const contentSections = page?.data[0]?.attributes?.contentSections;

  const pageHeader = contentSections?.find(item => item.__component === "layout.page-header") || null;
  const ourBrands = contentSections?.find(item => item.__component === "sections.our-brands") || null;

  if (page?.data?.length === 0 || ourBrands?.data?.length === 0) return notFound();
  return (
    <>
      {ourBrands && <OurBrands data={ourBrands} pageHeader={pageHeader} locations={locations} />}
    </>
  );
}
