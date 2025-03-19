"use client";
import Image from "next/image";
import { Sidebar, Section } from "@/components/scroll-layout";
import { getStrapiMedia } from "@/utils/api-helpers";
import { PageHeader } from "@/components/common";
import { useState, useCallback } from "react";
import { IconChevronDown } from "@/assets/images";
const Grid = ({ items }) => {
  if (items?.length === 0) return <div className="text-center text-gray-500 py-10">Stay tuned for more brands!</div>;
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 md:grid-cols-4 py-5">
      {items?.map((item) => {
        const { media } = item;
        return (
          <div
            key={item.id}
            className="rounded-md bg-white flex items-center md:py-4 md:px-6 mx-auto"
          >
            {media && (
              <Image
                src={getStrapiMedia(media?.file?.data?.attributes?.url)}
                width={media?.file?.data?.attributes?.width}
                height={media?.file?.data?.attributes?.height}
                alt={
                  media?.file?.data?.attributes?.alternativeText ||
                  item?.title ||
                  `Brand ${item?.id}`
                }
                className="w-full h-full min-w-[105px] object-contain"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const OurBrands = ({ data, pageHeader, locations }) => {

  const { title, Button, description, BrandsCategory } = data;
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredBrands, setFilteredBrands] = useState(BrandsCategory);

  const handleLocationChange = useCallback((e) => {
    const locationValue = e.target.value;
    setSelectedLocation(locationValue);

    if (!locationValue) {
      setFilteredBrands(BrandsCategory);
    } else {
      const filtered = BrandsCategory.map(category => {
        const filteredCategory = { ...category };

        filteredCategory.Brand = category.Brand?.filter(brand =>
          brand.locations?.data?.some(location =>
            location.attributes?.name === locationValue
          )
        );

        return filteredCategory;
      }).filter(category => category.Brand?.length > 0);

      setFilteredBrands(filtered);
    }
  }, [BrandsCategory]);

  const menuItem = BrandsCategory?.map((item) => item?.title);

  if (BrandsCategory?.length === 0) return null;
  return (
    <section className="bg-white">
      <div className="md:ps-[60px] 2xl:ps-[86px]">
        {pageHeader && <div className="md:hidden"><PageHeader data={pageHeader} /></div>}
        <div className="flex flex-col md:flex-row">
          <Sidebar
            title={title}
            menuItem={menuItem}
            Button={Button}
            description={description}
          />
          <div className="bg-lightGrayBackground md:w-[80%] 2xl:w-[85%]">
            <div className="hidden md:block">
              {pageHeader && <PageHeader data={pageHeader} />}
            </div>
            {/* LocationFilter */}
            {locations?.data?.length > 0 &&
              <div className="py-8 bg-white px-5 xl:px-0">
                <div className="mx-auto md:max-w-[800px] 2xl:max-w-[1200px]">
                  <label htmlFor="location" className="block font-medium text-darkGrayText text-sm mb-2">Location</label>
                  <div className="relative">
                    <select
                      className="w-full p-2.5 border border-lightGrayBorder bg-lightGrayBackground rounded-md appearance-none pr-10"
                      onChange={handleLocationChange}
                      name="location"
                      id="location"
                    >
                      <option value="">All Locations</option>
                      {locations?.data?.map((location) => (
                        <option key={location?.id} value={location?.attributes?.name}>
                          {location?.attributes?.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <IconChevronDown />
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className="ps-5 pe-5 md:ps-12 md:pe-[86px] py-8">
              {filteredBrands?.map((section) => (
                <Section
                  key={section?.id}
                  title={section?.title}
                  subtitle={section?.description}
                  id={section?.title}
                  grid={<Grid items={section?.Brand} />}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBrands;
