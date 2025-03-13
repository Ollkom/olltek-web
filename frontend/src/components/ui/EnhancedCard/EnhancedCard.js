import Image from "next/image";
import Link from "next/link";
import { formatDate, getStrapiMedia } from "@/utils/api-helpers";
import { IconLinkArrow } from "@/assets/images";
import cx from "classnames";

const EnhancedCard = ({
  title,
  description,
  media,
  url,
  text,
  publishedAt,
  type = "image"
}) => {

  const DynamicTag = url ? Link : "div";
  return (
    <DynamicTag
      {...(url && { href: url })}
      className={cx("h-full flex flex-col overflow-hidden rounded-md group", {
        "p-4 border border-[#E5E5E7]": type === "icon"
      })}>
      {media?.url && (
        <div className={cx("relative overflow-hidden", {
          "w-full aspect-[4/3]": type === "image",
          "w-16 h-16": type === "icon"
        })}>
          <Image
            src={getStrapiMedia(media?.url)}
            width={media?.width}
            height={media?.height}
            className="object-cover h-full w-full"
            alt={media?.alternativeText || title || "Enhanced Card"}
          />
        </div>
      )}
      <div
        className="bg-white py-4 flex-grow flex flex-col gap-y-3"
      >
        {title && (
          <h4 className={cx("text-darkGrayText text-xl font-medium line-clamp-2", {
            "group-hover:text-lightBlue transition-colors duration-200": url
          })}>
            {title}
          </h4>
        )}
        {description && (
          <p className="text-lightGrayText text-sm 2xl:text-base font-normal flex-grow line-clamp-4">
            {description}
          </p>
        )}
        {publishedAt && (
          <p className="font-semibold text-darkGrayText text-xs md:test-md">
            {formatDate(publishedAt)}
          </p>
        )}
        {text && url && (
          <div className="flex items-center text-lightBlue font-semibold text-base">
            {text}
            <IconLinkArrow className="ms-2 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </div>
        )}
      </div>
    </DynamicTag>
  );
};

export default EnhancedCard;
