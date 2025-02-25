import Link from "next/link";
import Image from "next/image";
import cx from "classnames";
import { Typography, Card, Button } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { BrandsFilter } from "@/components/subpage";
// TODO: This component must be removed from codebase after redesign
const Features = (props) => {
  const { data, fontInter } = props;
  const {
    heading,
    description,
    feature,
    variant,
    title,
    bgVariant,
    columns,
    bgColor,
    showFilter,
    Button: button,
    enable,
  } = data;
  const isSecondary = variant === "secondary";
  const isSubSecondary = variant === "subSecondary";
  const isCard = variant === "card";
  const isDefaultCard = variant === "defaultCard";

  if (enable === false) return;

  return (
    <section
      className={cx("py-12 md:py-24", {
        "bg-[#F2F4F8]": bgVariant === "secondary",
      })}
      style={{ backgroundColor: bgColor }}
    >
      <div className="container-custom px-5 md:px-0">
        <div className="text-center">
          {heading && (
            <Typography
              variant="gradient"
              className={cx("tracking-widest", {
                "mb-10": !description && !title,
              })}
            >
              {heading}
            </Typography>
          )}

          {description && (
            <Typography
              variant="heading1"
              className={`mt-6 mb-12 md:w-[800px] mx-auto ${fontInter.className}`}
            >
              {description}
            </Typography>
          )}
          {title && (
            <p className="text-xl 2xl:text-2xl max-w-[970px] mx-auto 2xl:leading-10">
              {title}
            </p>
          )}
        </div>
        {/* Primary Variant Structure */}
        {!isSecondary && !isSubSecondary && !isCard && !isDefaultCard && (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 ${fontInter.className}`}
          >
            {feature?.map((item) => (
              <div className="flex items-center space-x-6" key={item?.id}>
                {item?.media?.data && (
                  <Image
                    src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                    alt={item?.title || "Feature Image"}
                    width={item?.media?.data?.attributes?.width}
                    height={item?.media?.data?.attributes?.height}
                  />
                )}
                <div className="text-left">
                  <div className="mb-1">
                    <p className="text-xl 2xl:text-2xl text-[#333333] font-bold">
                      {item?.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg text-[#333333]">
                      {item?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Secondary Variant Structure */}
        {isSecondary && (
          <>
            {showFilter ? (
              <BrandsFilter items={feature} columns={columns} />
            ) : (
              <div
                className={cx(
                  `grid grid-cols-2 md:grid-cols-4 gap-4 item-center justify-center mx-auto`,
                  {
                    "md:grid-cols-5": columns === "fiveColumn",
                  }
                )}
              >
                {feature?.map((item) => {
                  const imageElement = item?.media?.data && (
                    <Image
                      src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                      alt={item?.title || "Feature Image"}
                      width={item?.media?.data?.attributes?.width}
                      height={item?.media?.data?.attributes?.height}
                      className="mx-auto"
                    />
                  );
                  return (
                    <div
                      className="w-full md:w-auto mt-4 drop-shadow-lg rounded-xl bg-white flex items-center"
                      key={item?.id}
                    >
                      {item?.showLink ? (
                        <Link
                          href={item?.url}
                          target={item?.newTab ? "_blank" : "_self"}
                          className="w-full mx-auto py-8 px-6 md:py-14"
                        >
                          {imageElement}
                        </Link>
                      ) : (
                        <span className="py-8 px-6 md:py-12 mx-auto">
                          {imageElement}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {button && (
              <div className="text-center pt-14">
                <Link href={button?.url}>
                  <Button type="button">{button?.text}</Button>
                </Link>
              </div>
            )}
          </>
        )}
        {/* Sub Secondary Variant Structure */}
        {isSubSecondary && (
          <div
            className={cx(
              `grid grid-cols-1 md:grid-cols-3 gap-10 ${fontInter.className}`,
              {
                "md:grid-cols-4": columns === "fourColumn",
              }
            )}
          >
            {feature?.map((item) => (
              <div className="space-x-6" key={item?.id}>
                <div className="text-center">
                  {item?.media?.data && (
                    <Image
                      src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                      alt={item?.title || "Feature Image"}
                      width={item?.media?.data?.attributes?.width}
                      height={item?.media?.data?.attributes?.height}
                      className="mx-auto"
                    />
                  )}
                  <p className="text-xl 2xl:text-2xl text-[#333333] font-bold py-6">
                    {item?.title}
                  </p>
                  <p className="text-lg text-[#333333]">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {(isCard || isDefaultCard) && (
          <div
            className={cx("grid grid-cols-1 gap-10 md:gap-14", {
              "md:grid-cols-3": !isDefaultCard,
              "md:grid-cols-2": isDefaultCard,
            })}
          >
            {feature?.map((item) => {
              return (
                <Card
                  key={item?.id}
                  title={item?.title}
                  url={item.url}
                  subtitle={item?.subtitle}
                  image={item?.media?.data?.attributes}
                  description={item?.description}
                  variant="features"
                  isDefaultCard={isDefaultCard}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
