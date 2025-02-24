import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { ScrollToTop } from "@/components/ui";

const Footer = (props) => {
  const { footer } = props;
  const { FooterMenu, socialLinks, footerLogo, menuLinks } = footer;
  const logo = footerLogo?.logoImg?.data?.attributes;
  const logoText = footerLogo?.logoText;
  return (
    <footer className="bg-[#212237] text-white">
      <div className="px-6 md:px-0 container-custom">
        <div className="py-7 grid grid-cols-1 gap-0 border-b border-[#647182] md:grid-cols-6 md:gap-5 md:pt-14 md:pb-4">
          <div className="lg:first-of-type:col-span-2 md:pr-14 2xl:pr-20">
            {logo?.url && (
              <div className="w-[220px]">
                <Image
                  src={getStrapiMedia(logo?.url)}
                  alt={logo?.alternativeText}
                  width={logo?.width}
                  height={logo?.height}
                />
              </div>
            )}
            <p className="my-5 font-light">{logoText}</p>
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="pr-3 font-light">Follow Us On</span>
              {socialLinks?.map((link) => (
                <span
                  className="py-2 text-[#777B89] items-center"
                  key={link?.id}
                >
                  {link?.icon?.data && (
                    <Link href={link?.url} target={link ? "_blank" : ""}>
                      <Image
                        src={getStrapiMedia(link?.icon?.data?.attributes?.url)}
                        alt="logo"
                        width={link?.icon?.data?.attributes?.width}
                        height={link?.icon?.data?.attributes?.height}
                        className="mr-4"
                      />
                    </Link>
                  )}
                </span>
              ))}
            </div>
          </div>

          {FooterMenu?.map((item, index) => (
            <div
              className={`mb-6 md:mb-0 md:flex items-start ${
                index === FooterMenu?.length - 2 ? "mb-0" : ""
              }`}
              key={item?.id}
            >
              <div>
                <p
                  className={`mb-5 normal-case border-b border-[#647182] pb-3 font-semibold md:text-lg 2xl:text-xl`}
                >
                  <span>
                    {item?.slug ? (
                      <Link href={item?.slug} className="hover:underline">
                        {item?.Heading}
                      </Link>
                    ) : (
                      item?.Heading
                    )}
                  </span>
                </p>
                {item?.FooterLinks?.map((link) => (
                  <div
                    className="flex flex-wrap md:flex-col flex-col py-2"
                    key={link?.id}
                  >
                    <Link
                      href={link?.url}
                      target={link?.newTab ? "_blank" : ""}
                      className="hover:underline text-sm font-normal 2xl:text-lg"
                    >
                      {link?.text}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-0 md:grid-cols-6 py-6">
          <div className="lg:first-of-type:col-span-2"></div>
          {menuLinks.map((links) => (
            <div
              key={links?.id}
              className="pb-3 pl-2 md:pb-0 text-sm 2xl:text-lg hover:underline"
            >
              <Link href={links?.url}>{links?.text}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 md:px-0 py-6  border-t border-[#647182]">
        <p className="text-xs text-center md:text-sm 2xl:text-lg">
          2024 © Ollkom Technologies All rights reserved.
        </p>
      </div>

      <ScrollToTop />
    </footer>
  );
};

export default Footer;
