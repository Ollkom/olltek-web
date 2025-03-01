import { getStrapiMedia } from "@/utils/api-helpers";
import { getGlobal } from "@/utils/api-loaders";
import Image from "next/image";
import Link from "next/link";
import CountryScroll from "@/components/homepage/CountryScroll";

const Hero = async (props) => {
  const { data } = props;
  const globalData = await getGlobal();
  const countries = globalData?.data?.attributes?.countries;

  const { picture, pictureMobile, title, description, buttons } = data;
  const heroImage = picture?.data?.attributes;
  const heroImageMobile = pictureMobile?.data?.attributes;


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
          <h2 className="text-[28px] text-center md:text-[52px] md:pb-4 font-medium leading-tight md:leading-[1.1]">
            Cross-Border Solutions to GCC from
            <CountryScroll countries={countries} />
          </h2>
        )}
        {description && (
          <p className="text-base md:text-2xl text-center font-normal">{description}</p>
        )}
        {buttons?.length > 0 && (
          <div className="flex justify-center items-center flex-wrap gap-2 md:gap-3 pt-2">
            {buttons.map((button) => {
              if (!button?.text || !button?.url) return null;
              return (
                <Link key={button.id} href={button.url || "/"}>
                  <Button variant={button.type} className="text-sm md:text-base">
                    {button.text}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <div className="relative w-full max-h-[640px] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-[1]"></div>
        {heroImage?.url && (
          <Image
            src={getStrapiMedia(heroImage?.url)}
            alt={
              heroImage?.alternativeText ||
              title ||
              "Hero"
            }
            width={heroImage?.width}
            height={heroImage?.height}
            priority
            className="w-full h-[480px] md:h-[500px] 2xl:h-[640px] object-fill hidden md:block"
          />
        )}
        {heroImageMobile?.url && (
          <Image
            src={getStrapiMedia(heroImageMobile?.url)}
            alt={
              heroImageMobile?.alternativeText ||
              title ||
              "Hero"
            }
            width={heroImageMobile?.width}
            height={heroImageMobile?.height}
            priority
            className="w-full h-[480px] md:h-[500px] 2xl:h-[640px] object-fill block md:hidden"
          />
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
