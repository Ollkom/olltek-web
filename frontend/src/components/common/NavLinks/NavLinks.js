"use client";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IconChevronDown,
} from "@/assets/images";
import { getStrapiMedia } from "@/utils/api-helpers";
import cx from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useDotButton } from "@/hooks";

const NavLinks = (props) => {
  const { links, advertisements } = props;
  const [hoverMenuItem, setHoverMenuItem] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  }, [
    Autoplay({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false, delay: 3000 })
  ]);

  const isCarouselRequired = advertisements?.Advert?.length > 1
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const hoverEnterTimeout = useRef(null);
  const hoverLeaveTimeout = useRef(null);

  // Reset Embla carousel when active menu toggles so that each carosuel is unique
  useEffect(() => {
    if (emblaApi && hoverMenuItem) {
      emblaApi.reInit();
    }
  }, [emblaApi, hoverMenuItem]);

  useEffect(() => {
    return () => {
      clearTimeout(hoverEnterTimeout.current);
      clearTimeout(hoverLeaveTimeout.current);
    };
  }, []);

  // set hover menu item and delay to show the hover menu
  const onHoverEnterHandler = useCallback(
    (linkId) => {
      clearTimeout(hoverLeaveTimeout.current);

      hoverEnterTimeout.current = setTimeout(() => {
        setHoverMenuItem(linkId);
      }, 50);
    },
  );

  // reset hover menu item and delay to hide the hover menu
  const onHoverLeaveHandler = useCallback(() => {
    clearTimeout(hoverEnterTimeout.current);

    hoverLeaveTimeout.current = setTimeout(() => {
      setHoverMenuItem(null);
    }, 500);
  }, []);

  return (
    <>
      {links?.map((link) => {
        const hasNavigationLinks = link?.navigations?.data?.length > 0;
        const isMenuOpen = hoverMenuItem === link?.id;

        return (
          <li
            className="group"
            onMouseEnter={() => onHoverEnterHandler(link?.id)}
            onMouseLeave={onHoverLeaveHandler}
            key={link?.id}
          >
            {/* Level 0 */}
            <Link
              href={link?.url}
              className="text-darkGrayText text-base font-semibold inline-flex items-center group-hover:text-[#0774F5]"
            >
              {link.title}
              {hasNavigationLinks > 0 && <IconChevronDown className="ml-2" />}
            </Link>
            {hasNavigationLinks > 0 && (
              <div
                className={cx(
                  "absolute top-[101%] left-0 right-0 z-50 w-full flex justify-end md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1080px] 2xl:max-w-[1680px] mx-auto transition ease-out duration-500 transform",
                  {
                    "opacity-100 visible": hoverMenuItem === link?.id,
                    "opacity-0 invisible": hoverMenuItem !== link?.id,
                  }
                )}
              >
                <div className="w-full bg-white rounded-md shadow-md overflow-hidden max-w-[824px]">
                  <div className="flex flex-col md:flex-row px-14 py-8">
                    {/* Left side navigation */}
                    <div className="w-full flex flex-col md:flex-wrap md:h-[340px] gap-12 overflow-hidden">
                      {link?.navigations?.data?.map((sublink) => {
                        const { heading, slug, media } = sublink?.attributes;
                        const iconUrl = media?.file?.data?.attributes?.url;
                        return (
                          <Link
                            key={sublink.id}
                            href={slug || "/"}
                            className="group/sublink flex flex-shrink-0 items-center gap-4 transition-colors md:w-[45%]"
                            onClick={onHoverLeaveHandler}
                          >
                            {iconUrl && (
                              <div className="w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center bg-darkGrayText group-hover/sublink:bg-lightBlue">

                                <Image
                                  src={getStrapiMedia(iconUrl)}
                                  width={24}
                                  height={24}
                                  alt={heading || `Icon ${sublink.id}`}
                                  className="w-6 h-6"
                                />

                              </div>
                            )}
                            {heading && (
                              <span className="text-base font-medium text-darkGrayText group-hover/sublink:text-lightBlue">
                                {heading}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right side featured content */}
                    {advertisements?.Advert?.length > 0 && (
                      <div className="relative flex justify-center px-10">
                        <div ref={isCarouselRequired && isMenuOpen ? emblaRef : null}
                          className="overflow-hidden w-[240px] h-[320px] rounded-md">
                          <div className="flex h-full">
                            {advertisements?.Advert?.map((advert) => (
                              <div key={advert.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                                {advert?.media?.data?.attributes?.url && (
                                  <Image
                                    src={getStrapiMedia(advert?.media?.data?.attributes?.url)}
                                    alt={advert?.title || `Advertisement ${advert?.id}`}
                                    width={advert?.media?.data?.attributes?.width}
                                    height={advert?.media?.data?.attributes?.height}
                                    className="object-cover rounded-md h-full w-full"
                                  />)}
                                <div className="absolute inset-0 bg-black/60"></div>
                                <div className="absolute top-0 left-0 right-0 pt-6">
                                  {advert?.MediaHover?.data?.attributes?.url && (
                                    <Image
                                      src={getStrapiMedia(advert?.MediaHover?.data?.attributes?.url)}
                                      alt={advert?.title || `Advertisement ${advert?.id}`}
                                      width={120}
                                      height={16}
                                      className="object-contain mx-auto"
                                    />
                                  )}
                                </div>
                                {advert?.title && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-4 pt-2 pb-8">
                                    <h3 className="text-base font-normal text-white">{advert?.title}</h3>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Indicator dots */}
                          {isCarouselRequired && (
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </li>
        )
      })}
    </>
  );
};

export default NavLinks;
