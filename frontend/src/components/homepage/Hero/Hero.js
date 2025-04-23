import { Button } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { getGlobal } from "@/utils/api-loaders";
import Image from "next/image";
import Link from "next/link";
import { CountryScroll } from "@/components/homepage";

const Hero = async (props) => {
  const { data } = props;
  const globalData = await getGlobal();
  const countries = globalData?.data?.attributes?.countries;

  const { picture, pictureMobile, title, description, buttons } = data;
  const heroImage = picture?.data?.attributes;
  const heroImageMobile = pictureMobile?.data?.attributes;

  if (!data) return null;
  return (
    <div className="relative w-full flex justify-center md:px-0 bg-black" role="banner">

      <div className="absolute container flex flex-col items-start justify-center gap-2 md:gap-3 text-white w-full h-full z-10">
        <div className="md:max-w-2xl px-6 md:px-0 flex flex-col gap-2 md:gap-3">
          {title && (
            <h2 className="font-bold text-2xl text-left md:text-[52px] leading-tight md:leading-[1.1] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
              Cross-Border Solutions to <span className="inline-block italic">GCC</span> from
              <CountryScroll countries={countries} />
            </h2>
          )}
          {description && (
            <p className="text-base md:text-2xl text-left font-medium [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{description}</p>
          )}
          {buttons?.length > 0 && (
            <div className="flex justify-start items-center flex-wrap gap-2 md:gap-3 pt-2">
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
      </div>
      <div className="relative w-full max-h-[640px] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div>
        {heroImage?.url && (
          heroImage.url.endsWith('.mp4') || heroImage.url.endsWith('.webm') ? (
            <video
              src={getStrapiMedia(heroImage.url)}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Hero Video"
              className="w-full h-[480px] md:h-[500px] 2xl:h-[640px] object-cover hidden md:block"
            />
          ) : (
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
          )
        )}
        {heroImageMobile?.url && (
          heroImageMobile.url.endsWith('.mp4') || heroImageMobile.url.endsWith('.webm') ? (
            <video
              src={getStrapiMedia(heroImageMobile.url)}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[480px] md:h-[500px] 2xl:h-[640px] object-cover block md:hidden"
            />
          ) : (
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
          )
        )}
      </div>
    </div>
  );
};

export default Hero;
