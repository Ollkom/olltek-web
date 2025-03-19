import { notFound } from "next/navigation";
import { getLocations, getPageBySlug } from "@/utils/api-loaders";
import { OurBrands } from "@/components/brands";

export default async function PageRoute({ params }) {
  const [page, locations] = await Promise.all([getPageBySlug("partners"), getLocations("/locations")])

  const contentSections = page?.data[0]?.attributes?.contentSections;

  let pageHeader = null
  let ourBrands = null

  contentSections?.forEach((item) => {
    if (item.__component === "layout.page-header") {
      pageHeader = item
    }
    if (item.__component === "sections.our-brands") {
      ourBrands = item
    }

    if (pageHeader && ourBrands) {
      return
    }
  })

  if (page?.data?.length === 0 || ourBrands?.data?.length === 0) return notFound();
  return (
    <>
      {ourBrands && <OurBrands data={ourBrands} pageHeader={pageHeader} locations={locations} />}
    </>
  );
}
