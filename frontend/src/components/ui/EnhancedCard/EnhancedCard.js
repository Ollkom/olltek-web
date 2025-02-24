import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { MotionCard } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IconLinkArrow } from "@/assets/images";

const EnhancedCard = ({
  title,
  description,
  bgColor = "bg-white",
  smallClamp,
  media,
  url,
}) => {
  const cardContent = (
    <div>
      {media && (
        <Image
          src={getStrapiMedia(media?.url)}
          width={media?.width}
          height={media?.height}
          alt={media?.alternativeText}
        />
      )}
      <div
        className={cx(`${bgColor} px-6 py-8 relative`, {
          "min-h-60": description,
        })}
      >
        {title && (
          <h4
            className={cx("text-[#333333] text-xl font-bold", {
              "pb-3": description,
            })}
          >
            {title}
          </h4>
        )}
        {description && (
          <p
            className={cx({
              "line-clamp-6": smallClamp,
              "line-clamp-[7]": !smallClamp,
            })}
          >
            {description}
          </p>
        )}
        {url && <IconLinkArrow className="absolute bottom-4 right-4" />}
      </div>
    </div>
  );
  return url ? (
    <MotionCard className="hover:shadow-md">
      <Link href={url}>{cardContent}</Link>
    </MotionCard>
  ) : (
    <>{cardContent}</>
  );
};

export default EnhancedCard;
