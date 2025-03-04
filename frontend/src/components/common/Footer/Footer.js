import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { ScrollToTop } from "@/components/ui";

const Footer = (props) => {
  const { footer } = props;

  const { FooterMenu, socialLinks, footerLogo } = footer;
  const logo = footerLogo?.logoImg?.data?.attributes;
  const logoText = footerLogo?.logoText;

  return (
    <footer className="bg-darkBlue text-white py-12 px-6">
      <div className="container-custom mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row">
          {/* social links */}
          <div className="flex flex-col gap-5 md:pr-8 2xl:pr-16 md:max-w-[310px] mb-8 md:mb-0">
            <div className="flex flex-col gap-4">
              {logo?.url && (
                <Image
                  src={getStrapiMedia(logo?.url)}
                  alt={logo?.alternativeText || "Olltek Logo"}
                  width={logo?.width}
                  height={logo?.height}
                  className="w-32"
                />
              )}
              {logoText && <p className="text-sm md:text-base font-medium">
                {logoText}
              </p>}
            </div>
            {socialLinks?.length > 0 && <div className="flex flex-col gap-3">
              <p className="text-base md:text-lg font-medium">Follow us on</p>
              <div className="flex space-x-3">
                {socialLinks?.map((link) => {
                  const icon = link?.icon?.data?.attributes;
                  if (!icon?.url) return null;
                  return (
                    <Link
                      key={link.id}
                      href={link.url || "/"}
                      target={link.newTab ? "_blank" : ""}
                      className="bg-[#FFFFFF] p-2 rounded-md hover:bg-white/80 transition-colors shadow-md"
                    >
                      {icon?.url && (
                        <Image
                          src={getStrapiMedia(icon?.url)}
                          alt={link.text || `social icon ${link.id}`}
                          width={icon?.width}
                          height={icon?.height}
                          className="w-5 h-5"
                        />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>}
          </div>

          <div className="hidden md:block w-px border-l border-[#979AA0] h-[102px]"></div>
          {/* footer menu */}
          {FooterMenu?.length > 0 && <div className="grid grid-cols-2 md:flex md:flex-row w-full">
            {FooterMenu?.map((item, index) => (
              <>
                <div key={item.id} className="mb-8 md:mb-0 md:px-8 2xl:md:px-16">
                  {item?.Heading && <h3 className="text-base font-semibold mb-4">{item?.Heading}</h3>}
                  {item?.FooterLinks?.length > 0 && (
                    <nav>
                      <ul className="flex flex-col md:flex-row flex-wrap md:max-w-[500px] 2xl:max-w-[700px]">
                        {item?.FooterLinks?.map((link, index) => {

                          if (!link?.text) return null;
                          return (
                            <li key={link.id} className="mb-3">
                              <Link
                                href={link.url || "/"}
                                target={link.newTab ? "_blank" : ""}
                                className="text-sm md:text-base font-medium hover:underline whitespace-nowrap text-[#E5E5E7]"
                              >
                                {link.text}
                              </Link>
                              {index !== item.FooterLinks.length - 1 && <span className="hidden md:inline mx-2 text-white/50">|</span>}
                            </li>
                          )
                        })}
                      </ul>
                    </nav>)}
                </div>
                {index !== FooterMenu.length - 1 && (
                  <div className="hidden md:block w-px border-l border-[#979AA0] h-[102px]"></div>
                )}
              </>
            ))}
          </div>}
        </div>
        <ScrollToTop />

        {/* Divider Line */}
        <div className="border-t border-white/20 mt-4 md:mt-8"></div>
        {/* Copyright */}
        <div className="text-center font-medium text-sm md:text-base mt-3 md:mt-8 text-lightGrayBackground">
          © 2025 Ollkom Technologies All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
