import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IconChevronDown } from "@/assets/images";
import { AdvertisementSlider } from "@/components/common";

const NavDetails = (props) => {
  const { menu, closeSubmenu, closeMenu, advertisements } = props || {};

  return (
    <div className="flex flex-col h-full">
      {/* Submenu items */}
      <div className="flex flex-col px-6 pt-4 pb-8 gap-8">
        {/* Back button - calling closeSubmenu without arguments since it doesn't need a link */}
        <button
          onClick={() => closeSubmenu()}
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

      <div className="w-full relative flex justify-center px-2 pb-5">
        <AdvertisementSlider
          advertisements={advertisements}
          isMenuOpen={true}
          isMobileMenu={true}
          hoverMenuItem={true}
          closeMenu={closeMenu}
        />
      </div>
    </div>
  );
};

export default NavDetails;
