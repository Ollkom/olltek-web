import { Button } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import Link from "next/link";

const Hero = (props) => {
  const { data } = props;
  const { picture, pictureMobile, icon, title, description, buttons } = data;
  const heroImage = picture?.data?.attributes;
  const heroImageMobile = pictureMobile?.data?.attributes;
  const iconImage = icon?.data?.attributes;

  if (!data) return null;
  return (
    <div className="relative w-full flex justify-center md:px-0 bg-black" role="banner">
      <div className="absolute flex flex-col gap-2 md:gap-3 justify-center items-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-[615px] z-10 px-6 md:px-0">
        {title && (
          <h2 className="text-[28px] text-center md:text-[52px] md:pb-4 font-medium leading-tight md:leading-[1.1]">
            {title}
            <span className="inline-block ms-2">
              {iconImage?.url && (
                <Image
                  src={getStrapiMedia(iconImage?.url)}
                  alt={iconImage?.alternativeText || "Icon"}
                  width={iconImage?.width}
                  height={iconImage?.height}
                  className="w-[26px] h-[26px] md:w-[40px] md:h-[40px]"
                />
              )}
            </span>
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
                <Link key={button.id} href={button.url}>
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
    </div>
  );
};

export default Hero;
