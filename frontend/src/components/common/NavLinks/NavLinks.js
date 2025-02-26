"use client";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IconMenuCaret,
  IconMenuCaretActive,
  IconMenuLevelZeroCaret,
} from "@/assets/images";
import { getStrapiMedia } from "@/utils/api-helpers";

const NavLinks = (props) => {
  const { links, setShowMenuOverlay } = props;
  const [hoverMenuItem, setHoverMenuItem] = useState(null);
  const hoverTimeout = useRef(null);

  const onHoverEnterHandler = useCallback(
    (categoryName, menuLength) => {
      hoverTimeout.current = setTimeout(() => {
        setHoverMenuItem(categoryName);
        setShowMenuOverlay(menuLength > 0);
      }, 200); // 200ms delay to simulate hover intent
    },
    [setShowMenuOverlay]
  );

  const onHoverLeaveHandler = useCallback(() => {
    clearTimeout(hoverTimeout.current); // Clear timeout if mouse leaves early
    setHoverMenuItem(null);
    setShowMenuOverlay(false);
  }, [setShowMenuOverlay]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <>
      {links?.map((link) => (
        <li
          className="block group"
          onMouseEnter={onHoverEnterHandler.bind(
            null,
            link?.title,
            link?.navigations?.data.length
          )}
          onMouseLeave={onHoverLeaveHandler}
          key={link?.title}
        >
          {/* Level 0 */}
          <Link
            href={link?.url}
            onClick={onHoverLeaveHandler}
            className="text-[#333] px-10 text-xl font-normal inline-block 2xl:text-2xl group-hover:text-[#0774F5]"
          >
            <span className="relative block py-7">
              {link.title}
              <IconMenuLevelZeroCaret className="h-0 absolute left-0 right-0 mx-auto bottom-0 group-hover:block opacity-0 md:group-hover:opacity-100 md:group-hover:h-3 transition-all duration-300 ease-in-out" />
              <div className="bg-[#0774F5] absolute bottom-0 h-0 w-full group-hover:opacity-0 md:group-hover:opacity-100 md:group-hover:h-1 transition-all duration-300 ease-in-out"></div>
            </span>
          </Link>
          {link?.navigations?.data.length > 0 && (
            <div
              className={`absolute top-30 left-0 z-50 w-full transition ease-out duration-500 transform shadow-md ${hoverMenuItem === link?.title
                ? "opacity-100 visible"
                : "opacity-0 invisible"
                }`}
            >
              {/* Below div is for left side menu bg */}
              <div className="bg-[#070751] relative">
                {/* Below div is for right side menu bg */}
                <div className="bg-[#F2F4F8] absolute right-0 w-[50%] h-full"></div>
                <div className="container-custom top-0 mx-auto left-0 right-0 bg-[#F2F4F8] relative z-20">
                  <div className="flex">
                    <div className="w-[35%] bg-[#070751] py-10 pr-20">
                      {link?.title && (
                        <h2 className="text-3xl uppercase tracking-widest text-white">
                          {link?.title}
                        </h2>
                      )}
                      {link?.description && (
                        <p className="py-4 text-white text-xl 2xl:text-2xl">
                          {link?.description}
                        </p>
                      )}
                      {link?.media?.file?.data?.attributes?.url && (
                        <Image
                          src={getStrapiMedia(
                            link?.media?.file?.data?.attributes?.url
                          )}
                          width={link?.media?.file?.data?.attributes?.width}
                          height={link?.media?.file?.data?.attributes?.height}
                          alt={
                            link?.media?.file?.data?.attributes?.alternativeText ||
                            link?.title ||
                            `Nav ${link?.id}`
                          }
                        />
                      )}
                    </div>
                    <div className="w-[75%] mr-auto pl-20 py-7">
                      {link?.subtitle && (
                        <h3 className="tracking-widest text-xl font-bold py-5">
                          {link?.subtitle}
                        </h3>
                      )}
                      <ul className="grid grid-cols-2">
                        {link?.navigations?.data?.map((sublinks) => {
                          const { heading, slug } = sublinks?.attributes;
                          return (
                            <li
                              className="py-3 group/links pr-3"
                              key={sublinks?.id}
                            >
                              <Link
                                href={slug ? slug : "/"}
                                className="text-[#333333] hover:text-[#0774F5] flex items-center text-lg 2xl:text-xl font-medium transition-all duration-300 ease-in-out relative"
                                onClick={onHoverLeaveHandler}
                              >
                                <IconMenuCaret className="absolute opacity-100 md:group-hover/links:opacity-0 transition-all duration-300 ease-in-out" />
                                <IconMenuCaretActive className="absolute group-hover/links:block opacity-0 md:group-hover/links:opacity-100 transition-all duration-300 ease-in-out" />
                                <span className="pl-5">{heading}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      {link?.footNote && (
                        <div className="mt-4">
                          <p className="border-t border-[#D2D2D2] py-8 text-center text-lg 2xl:text-xl">
                            {link?.footNote}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </>
  );
};

export default NavLinks;
