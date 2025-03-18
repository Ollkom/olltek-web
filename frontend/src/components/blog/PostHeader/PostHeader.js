import { Media } from "@/components/ui";
import { formatDate } from "@/utils/api-helpers";
import Link from "next/link";

export default function PostHeader({ title, cover, description, publishedAt }) {
  return (
    <section className="py-10 bg-lightGrayBackground">
      <div className="container flex flex-col md:flex-row md:items-center md:gap-8 px-4 md:px-0 py-4 md:py-8">
        {/* Left side - Cover Image */}
        {cover?.url && <div className="w-full md:w-1/2 rounded-lg overflow-hidden">
          <Media
            media={cover}
            mediaId={cover?.id}
            fallbackAlt={title}
            className="object-cover w-full h-full rounded-lg" />
        </div>}

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <div className="flex flex-col gap-y-4 md:gap-y-6 max-w-2xl">
            {/* Title */}
            {title && <h1 className="text-4xl 2xl:text-5xl font-medium 2xl:leading-snug text-darkGrayText ">{title}</h1>}

            {/* Description */}
            <div className="">
              {description && <p className="text-base md:text-lg text-lightGrayText">{description}</p>}
            </div>

            {/* Date */}
            {publishedAt && (
              <p className="font-semibold text-darkGrayText text-xs md:test-md">
                {formatDate(publishedAt)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
