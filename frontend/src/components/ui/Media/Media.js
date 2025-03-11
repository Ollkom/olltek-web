import { getStrapiMedia } from "@/utils/api-helpers";
import { shimmer, toBase64 } from "@/utils/image-helpers";
import Image from "next/image";

const Media = ({ media, fallbackAlt = "Image", mediaId }) => {
  if (!media || !media?.url) return null;

  return (
    <Image
      src={getStrapiMedia(media?.url)}
      alt={media?.alternativeText || `${fallbackAlt} ${mediaId}`}
      width={media?.width}
      height={media?.height}
      placeholder={`data:image/svg+xml;base64,${toBase64(
        shimmer(media?.width, media?.height)
      )}`}
      className="mx-auto"
    />
  );
};

export default Media;
