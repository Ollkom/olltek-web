"use client";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IconChevronDown,
} from "@/assets/images";
import { getStrapiMedia } from "@/utils/api-helpers";
import cx from "classnames";
import { AdvertisementSlider } from "@/components/common";

const NavLinks = (props) => {
  const { links, advertisements } = props;
  const [hoverMenuItem, setHoverMenuItem] = useState(null);

  const hoverEnterTimeout = useRef(null);
  const hoverLeaveTimeout = useRef(null);


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
              className="text-darkGrayText text-base font-semibold inline-flex items-center group-hover:text-lightBlue"
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
                              <div className="w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center bg-darkGrayText group-hover/sublink:bg-lightBlue group-active/sublink:bg-lightBlue">

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
                              <span className="text-base font-medium text-darkGrayText group-hover/sublink:text-lightBlue group-active/sublink:text-lightBlue">
                                {heading}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right side featured content */}
                    <AdvertisementSlider
                      advertisements={advertisements}
                      isMenuOpen={isMenuOpen}
                      hoverMenuItem={hoverMenuItem} />
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
