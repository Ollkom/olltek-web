import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
// import { getGlobal } from "@/utils/api-loaders";
// TODO: testimonials to be removed later
// import { Testimonials } from "@/components/homepage";
const Hero = async (props) => {
  const { data } = props;
  const { picture, title, description } = data;
  const heroImage = picture?.data?.attributes;
  // const testimonial = await getGlobal();
  // TODO: testimonials to be removed later
  // const testimonialBlock = testimonial?.data?.attributes?.testimonials;

  return (
    <div className="px-6 relative w-full flex justify-center md:px-0 md:bg-black">
      <div className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container-custom w-full hidden md:block">
        <div className="max-w-[740px]">
          {title && (
            <h2 className="text-3xl md:text-[40px] 2xl:text-5xl pb-4 md:leading-[48px] 2xl:leading-[62px] font-medium">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm md:text-xl 2xl:text-2xl">{description}</p>
          )}
        </div>
      </div>
      <div className="py-12 md:hidden">
        {title && (
          <h2 className="text-3xl md:text-[40px] 2xl:text-5xl pb-4 md:leading-[48px] 2xl:leading-[62px] font-medium">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm md:text-xl 2xl:text-2xl">{description}</p>
        )}
      </div>
      {heroImage && (
        <Image
          src={getStrapiMedia(heroImage?.url)}
          alt={
            heroImage?.alternativeText ||
            title ||
            "Hero"
          }
          width={heroImage?.width}
          height={heroImage?.height}
          loading="eager"
          priority
          className="hidden md:block"
        />
      )}
    </div>
  );
};

export default Hero;
