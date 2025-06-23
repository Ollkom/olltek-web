import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

export default function PageHeader({ data }) {
  const { title, description, media, logo } = data || {};

  const mediaData = media?.file?.data?.attributes;
  const logoData = logo?.file?.data?.attributes;

  return (
    <section className="w-full bg-blue-900 text-white min-h-[180px] 2xl:min-h-[240px] relative flex items-center justify-center py-8 sm:py-10">
      {/* Background Image */}
      {mediaData?.url && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={getStrapiMedia(mediaData.url)}
            alt={mediaData.alternativeText || "Page header background"}
            width={mediaData.width}
            height={mediaData.height}
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-[#273665E5]/80"></div>
        </div>
      )}

      {/* Content */}
      <div className="container-custom px-4 w-full h-full relative flex items-center justify-center">

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
          {logoData?.url && (
            <div className="bg-lightBlue rounded-full border-2 border-white p-3 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <Image
                src={getStrapiMedia(logoData.url)}
                alt={logoData.alternativeText || "Logo"}
                width={logoData.width}
                height={logoData.height}
                className="object-contain w-10 h-10 md:w-12 md:h-12"
              />
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-center text-center md:text-start md:divide-x-2 md:divide-white rtl:md:divide-x-reverse">
            {title && <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-medium px-4 2xl:px-6 mb-2 md:mb-0">{title}</h1>}
            {description && <p className="text-sm md:text-lg font-normal max-w-xl text-[#F9F9F9] px-4 2xl:px-6">{description}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
