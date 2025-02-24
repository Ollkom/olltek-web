import Image from "next/image";
import { Sidebar, Section } from "@/components/scroll-layout";
import { getStrapiMedia } from "@/utils/api-helpers";

const Grid = ({ items }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 py-10">
    {items?.map((item) => {
      const { media } = item;
      return (
        <div
          key={item.id}
          className="drop-shadow-lg rounded-xl bg-white flex items-center"
        >
          {media && (
            <span className="py-8 px-6 mx-auto">
              <Image
                src={getStrapiMedia(media?.file?.data?.attributes?.url)}
                width={media?.file?.data?.attributes?.width}
                height={media?.file?.data?.attributes?.height}
                alt={media?.file?.data?.attributes?.alternativeText}
              />
            </span>
          )}
        </div>
      );
    })}
  </div>
);

const OurBrands = ({ data }) => {
  const { title, Button, description, BrandsCategory } = data;

  const menuItem = BrandsCategory?.map((item) => item?.title);

  return (
    <section className="bg-white">
      <div className="container-custom">
        <div className="md:flex md:space-x-4">
          <Sidebar
            title={title}
            menuItem={menuItem}
            Button={Button}
            description={description}
          />
          <div className="bg-[#F4F8FF] px-5 md:py-10 md:px-10 md:w-[80%]">
            {BrandsCategory?.map((section) => (
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
    </section>
  );
};

export default OurBrands;
