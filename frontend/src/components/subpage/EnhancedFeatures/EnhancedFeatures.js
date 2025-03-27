import Link from "next/link";
import { EnhancedCard, MotionCardStaggered } from "@/components/ui";
import { SectionHeader } from "@/components/common";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { IconLinkArrow } from "@/assets/images";
import cx from "classnames";

const EnhancedFeatures = (props) => {
  const { data } = props;
  const {
    enable,
    title,
    description,
    feature,
    ctaTitle,
    Button,
    columns
  } = data;

  // apply default when columns is null or undefined
  const columnLayout = columns ?? "fourColumn";

  if (enable === false) return null;
  return (
    <section
      className="py-10 md:py-14">
      <div className="px-5 md:px-0 container">
        {/* Section Header */}
        {(title || description) && (
          <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12">
            <SectionHeader title={title} description={description} />
          </div>
        )}

        {/* Feature Cards Grid */}
        <div className={cx("grid grid-cols-1 gap-2 md:gap-6", {
          "md:grid-cols-3": columnLayout === "threeColumn",
          "md:grid-cols-4": columnLayout === "fourColumn",
          "md:grid-cols-5": columnLayout === "fiveColumn",
          "md:grid-cols-6": columnLayout === "sixColumn"
        })}>
          {feature?.map((item, index) => {
            const media = item?.media?.data?.attributes;
            const url = item?.url || null;

            return (
              <MotionCardStaggered
                key={item?.id}
                index={index}
              >
                <EnhancedCard
                  url={url}
                  title={item?.title}
                  description={item?.description}
                  media={media}
                  text={item?.text}
                  type={item?.type}
                />
              </MotionCardStaggered>
            );
          })}
          {/* Contact CTA Section */}
          {(ctaTitle || Button?.text) && (
            <MotionCardStaggered
              index={feature?.length}
            >
              <div className="flex flex-col items-center justify-center gap-4 bg-[#445EAB33] rounded-md p-8 text-center aspect-[4/3]">
                {Button?.icon && (
                  <Image
                    src={getStrapiMedia(Button.icon.data.attributes.url)}
                    alt={Button.icon.data.attributes.name}
                    width={Button.icon.data.attributes.width}
                    height={Button.icon.data.attributes.height}
                    className="w-10 h-10"
                  />
                )}
                {ctaTitle && (
                  <h3 className="md:text-base 2xl:text-xl font-medium text-darkGrayText">{ctaTitle}</h3>
                )}
                {Button?.text && (
                  <Link
                    href={Button.url || "/"}
                    target={Button.newTab ? "_blank" : "_self"}
                    className="flex items-center text-lightBlue font-semibold text-base group"
                  >
                    {Button.text}
                    <IconLinkArrow className="ms-2 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                )}
              </div>
            </MotionCardStaggered>
          )}
        </div>

      </div>
    </section>
  );
};

export default EnhancedFeatures;
