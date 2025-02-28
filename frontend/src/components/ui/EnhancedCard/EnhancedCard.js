import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IconLinkArrow } from "@/assets/images";

const EnhancedCard = ({
  title,
  description,
  media,
  url,
  text,
}) => {
  const DynamicTag = url ? Link : "div";
  return (
    <DynamicTag
      {...(url && { href: url })}
      className="h-full flex flex-col overflow-hidden rounded-md group">
      {media?.url && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={getStrapiMedia(media?.url)}
            width={media?.width}
            height={media?.height}
            className="object-cover"
            alt={media?.alternativeText || title || "Enhanced Card"}
          />
        </div>
      )}
      <div
        className="bg-white py-4 flex-grow flex flex-col"
      >
        {title && (
          <h4 className="text-darkGrayText text-xl font-medium mb-2">
            {title}
          </h4>
        )}
        {description && (
          <p className="text-lightGrayText text-sm 2xl:text-base font-normal flex-grow">
            {description}
          </p>
        )}
        {text && url && (
          <div className="mt-4 flex items-center text-lightBlue font-semibold text-base">
            {text}
            <IconLinkArrow className="ms-2 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </div>
        )}
      </div>
    </DynamicTag>
  );
};

export default EnhancedCard;
