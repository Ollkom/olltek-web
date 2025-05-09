import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { SectionHeader } from "@/components/common";
import { IconPlaySM, IconPlayXS } from "@/assets/images";

const Reel = ({ item }) => {
  const desktopImage = item?.desktopMedia?.file?.data?.attributes;
  const mobileImage = item?.mobileMedia?.file?.data?.attributes;
  const url = item?.Button?.url;
  const ReelItem = (
    <div className="mb-4 relative group overflow-hidden rounded-xl md:mb-0">
      {desktopImage?.url && (
        <Image
          src={getStrapiMedia(desktopImage?.url)}
          width={desktopImage?.width}
          height={desktopImage?.height}
          alt={
            desktopImage?.alternativeText ||
            item?.title ||
            `Show Reel ${item?.id}`
          }
          className="hidden rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 md:block"
        />
      )}
      {mobileImage?.url && (
        <Image
          src={getStrapiMedia(mobileImage?.url)}
          width={mobileImage?.width}
          height={mobileImage?.height}
          alt={
            mobileImage?.alternativeText ||
            item?.title ||
            `Show Reel ${item?.id}`
          }
          className="rounded-xl md:hidden mx-auto"
        />
      )}
      {/* Hidden title and background */}
      {item?.title && (
        <>
          <div className="absolute inset-0 bg-[#070751] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80 items-end hidden md:flex">
            <p className="text-white text-lg font-medium p-4 transform transition-transform duration-300 ease-in-out flex items-center group-hover:translate-y-0 translate-y-full">
              <IconPlaySM />
              <span className="pl-4">{item?.title}</span>
            </p>
          </div>
          <div className="block bg-[#070751] absolute bottom-0 w-full md:hidden">
            <p className="text-white text-sm flex items-center p-4">
              <IconPlayXS />
              <span className="pl-4">{item?.title}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
  return url ? <Link href={url}>{ReelItem}</Link> : <>{ReelItem}</>;
};

const ShowReel = ({ data }) => {
  const { title, description, ReelItem } = data;
  return (
    <section className="py-12">
      <div className="px-5 md:px-0 container-custom">
        <SectionHeader title={title} description={description} />
        {[0, 3]?.map((startIndex) => (
          <div className="md:gap-4 md:mb-4 md:flex" key={startIndex}>
            {ReelItem?.slice(startIndex, startIndex + 3)?.map((item) => (
              <Reel item={item} key={item.id} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowReel;
