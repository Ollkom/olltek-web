import { notFound } from "next/navigation";
import { getBrands, getIndustries, getLocations, getPageBySlug } from "@/utils/api-loaders";
import { OurBrands } from "@/components/brands";

export default async function PageRoute() {
  const [page, locations, industries] = await Promise.all([getPageBySlug("brands"), getLocations("/locations"), getIndustries("/industries")])

  const contentSections = page?.data[0]?.attributes?.contentSections;
  const pageHeader = contentSections?.find(item => item.__component === "layout.page-header") || null;

  if (page?.data?.length === 0) return notFound();

  return (
    <>
      {industries && <OurBrands pageHeader={pageHeader} locations={locations} industries={industries} />}
    </>
  );
}
