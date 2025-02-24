import Link from "next/link";
import Image from "next/image";
import { IconMenuCaret } from "@/assets/images";
import { getStrapiMedia } from "@/utils/api-helpers";

const NavDetails = (props) => {
  const { title, media, heading, url, closeMenu } = props || {};
  return (
    <>
      <Link
        href={url || ""}
        className="flex items-center py-2 md:py-3 text-[#333] md:hover:text-[#0774F5]"
        onClick={closeMenu}
      >
        {media && (
          <Image
            src={getStrapiMedia(media?.url)}
            alt={media?.alternativeText}
            width={media?.width}
            height={media?.height}
            className="mr-2 w-6 md:w-auto"
          />
        )}

        {heading && (
          <div className="flex font-medium items-center text-sm md:text-xl 2xl:text-2xl min-w-28 2xl:min-w-36">
            <IconMenuCaret className="" />
            <span className="pl-2">{heading}</span>
          </div>
        )}

        {title && <div className="text-sm md:text-base">{title}</div>}
      </Link>
    </>
  );
};

export default NavDetails;
