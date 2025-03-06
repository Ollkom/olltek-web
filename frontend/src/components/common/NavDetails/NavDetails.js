import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useDotButton } from "@/hooks";
import cx from "classnames";
import { IconChevronDown } from "@/assets/images";

const NavDetails = (props) => {
  const { menu, onBack, closeMenu, advertisements } = props || {};

  // New mobile drawer implementation
  const OPTIONS = {
    loop: true,
    align: "start",
    slidesToScroll: 1,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false, delay: 3000 })
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <div className="flex flex-col h-full">
      {/* Submenu items */}
      <div className="flex flex-col px-4 pt-4 pb-8 gap-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="group flex items-center gap-4 text-darkGrayText"
        >
          <div className="w-10 h-10 rounded-full border border-darkGrayText group-active:border-lightBlue flex items-center justify-center">
            <IconChevronDown className="rotate-90 group-active:text-lightBlue" />
          </div>
          <span className="text-base font-medium group-active:text-lightBlue">Back</span>
        </button>
        {/* Submenu items */}
        <ul className="flex flex-col gap-8">
          {menu?.navigations?.data?.map((sublink) => {
            const { heading, slug, media } = sublink?.attributes;
            const icon = media?.file?.data?.attributes;

            if (!heading && !icon?.url) return null;
            return (
              <li key={sublink.id}>
                <Link
                  href={slug || "/"}
                  className="group flex items-center gap-4"
                  onClick={closeMenu}
                >
                  {icon?.url && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-darkGrayText flex items-center justify-center group-active:bg-lightBlue">
                      <Image
                        src={getStrapiMedia(icon?.url)}
                        width={icon?.width}
                        height={icon?.height}
                        alt={heading || `Icon ${sublink.id}`}
                        className="w-6 h-6"
                      />
                    </div>
                  )}
                  {heading && <span className="text-base font-medium text-darkGrayText group-active:text-lightBlue">
                    {heading}
                  </span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Advertisement carousel */}
      <div className="w-full relative flex justify-center px-2 pb-5">
        {advertisements?.Advert?.length > 0 && (
          <div
            ref={emblaRef}
            className="overflow-hidden h-[457px] rounded-md">
            <div className="flex h-full">
              {advertisements?.Advert?.map((advert) => (
                <Link key={advert.id} href={advert?.url || "/"} className="flex-[0_0_100%] min-w-0 relative h-full">
                  {advert?.media?.data?.attributes?.url && (
                    <Image
                      src={getStrapiMedia(advert?.media?.data?.attributes?.url)}
                      alt={advert?.title || `Advertisement ${advert?.id}`}
                      width={advert?.media?.data?.attributes?.width}
                      height={advert?.media?.data?.attributes?.height}
                      className="object-cover rounded-md h-full w-full"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/60"></div>
                  {advert?.MediaHover?.data?.attributes?.url && (
                    <div className="absolute top-0 left-0 right-0 pt-6">
                      <Image
                        src={getStrapiMedia(advert?.MediaHover?.data?.attributes?.url)}
                        alt={advert?.title || `Advertisement ${advert?.id}`}
                        width={advert?.MediaHover?.data?.attributes?.width}
                        height={advert?.MediaHover?.data?.attributes?.height}
                        className="object-contain mx-auto"
                      />
                    </div>
                  )}
                  {advert?.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-4 pt-2 pb-16 ">
                      <h3 className="text-2xl font-light text-white">{advert?.title}</h3>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Indicator dots */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {scrollSnaps?.map((_, index) => (
                <div
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={cx("w-2 h-2 rounded-full cursor-pointer", {
                    "bg-white": index === selectedIndex,
                    "bg-lightGrayText": index !== selectedIndex,
                  })}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavDetails;
