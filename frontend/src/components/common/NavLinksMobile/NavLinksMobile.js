"use client";
import cx from "classnames";
import { useState } from "react";
import Link from "next/link";
import { ArrowDownSVG } from "@/assets/images";
import { NavDetails } from "@/components/common";
import { Button } from "@/components/ui";

const NavLinks = (props) => {
  const { links, closeMenu } = props;
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links?.map((link) => {
        return (
          <li className="border-b border-[#A9B7BD]" key={link?.title}>
            <div
              onClick={() => {
                heading !== link?.title
                  ? setHeading(link?.title)
                  : setHeading("");
                setSubHeading("");
              }}
              className="relative py-3"
            >
              {link?.__component === "menu.menu-link" ? (
                <Link
                  href={link?.url}
                  className="text-[#333] font-medium"
                  onClick={closeMenu}
                >
                  {link.title}
                </Link>
              ) : (
                <span className="text-[#333] font-medium">{link.title}</span>
              )}

              {link?.navigations?.data?.length > 0 && (
                <ArrowDownSVG
                  className={cx(
                    "absolute top-1/2 -translate-y-1/2 right-0 transition-all duration-300",
                    {
                      "rotate-180": heading === link?.title,
                    }
                  )}
                />
              )}
            </div>
            <div>
              {link?.navigations?.data && (
                <div
                  className={cx("transition-all duration-300 block w-full", {
                    hidden: heading !== link?.title,
                  })}
                >
                  {link?.Button && (
                    <Link href={link?.Button?.url} onClick={closeMenu}>
                      <Button
                        type="button"
                        variant="subsecondary"
                        icon={false}
                        className="mt-2 2xl:leading-[24px]"
                      >
                        <span className="2xl:text-xl">
                          {link?.Button?.text}
                        </span>
                      </Button>
                    </Link>
                  )}
                  <p className="py-4 text-sm font-medium">
                    {link?.description}
                  </p>
                  {link?.navigations?.data?.map((sublinks) => {
                    const image =
                      sublinks?.attributes?.media?.file?.data?.attributes;
                    const button = sublinks?.attributes?.Button;
                    const url = `${sublinks?.attributes?.slug}`;
                    return (
                      <div
                        onClick={() =>
                          subHeading !== sublinks?.attributes?.heading
                            ? setSubHeading(sublinks?.attributes?.heading)
                            : setSubHeading("")
                        }
                        className="border-b border-[#DFDFDF] last:border-0"
                        key={sublinks?.id}
                      >
                        <div className="">
                          <NavDetails
                            title={sublinks?.attributes?.title}
                            description={sublinks?.attributes?.description}
                            media={image}
                            button={button}
                            heading={sublinks?.attributes?.heading}
                            url={url}
                            closeMenu={closeMenu}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
