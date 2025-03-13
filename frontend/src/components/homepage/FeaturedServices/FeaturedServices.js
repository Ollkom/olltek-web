import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { MotionContainer } from "@/components/ui";
import { SectionHeader } from "@/components/common";
import cx from "classnames";

const FeaturedServices = (props) => {
  const { data } = props;
  const { title, service, description } = data;

  return (
    <section>
      <div className="pt-16 px-4">
        <SectionHeader
          title={title}
          description={description}
        />
      </div>
      {service?.map((item, index) => {
        const { name, description, type, feature, picture } = item;
        const pictureData = picture?.data?.attributes;
        const isEven = index % 2 === 0;

        return (
          <MotionContainer key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 group bg-lightGrayBackground">
            <div className={cx("mx-auto flex justify-center items-center px-4 py-8 2xl:py-10", {
              "md:order-2": !isEven
            })}>
              <div className="flex flex-col gap-4 max-w-lg 2xl:max-w-2xl">
                {/* service name and description */}
                <div className="flex flex-col gap-2">
                  {name && (
                    <h2 className="text-base 2xl:text-[22px] font-medium text-darkGrayText">{name}</h2>
                  )}
                  {description && (
                    <p className="text-sm md:text-base text-lightGrayText">
                      {description}
                    </p>
                  )}
                </div>
                {/* features list */}
                {feature?.length > 0 && (
                  <ul className={cx("flex flex-col",
                    {
                      "gap-4 md:gap-6 list-none": type === 'icon',
                      "gap-2 list-disc pl-5 [&>li::marker]:text-lightGrayText": type === 'bullet',
                    })}>
                    {feature?.map((item) => {
                      const { title, description, icon } = item;
                      const media = icon?.data?.attributes;
                      return (
                        <li key={item?.id} className={cx("", {
                          "flex items-start gap-2 md:gap-4": type === 'icon'
                        })}>
                          {media?.url && type === 'icon' && (
                            <Image
                              src={getStrapiMedia(media?.url)}
                              alt={title}
                              width={media?.width}
                              height={media?.height}
                              className="w-8 h-8 2xl:w-10 2xl:h-10"
                            />
                          )}
                          <div className="flex flex-col 2xl:gap-2">
                            {title && (
                              <h3 className={cx("",
                                {
                                  "text-base 2xl:text-[22px] font-medium text-darkGrayText": type === 'icon',
                                  "text-sm 2xl:text-base font-normal text-lightGrayText": type === 'bullet',
                                })}>{title}</h3>
                            )}
                            {description && type === 'icon' && (
                              <p className="text-sm 2xl:text-base text-lightGrayText">
                                {description}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            {pictureData?.url && (
              <div className={cx("mx-auto", {
                "md:order-1": !isEven
              })}>
                <Image
                  src={getStrapiMedia(pictureData?.url)}
                  alt={name || `service ${item?.id}`}
                  width={pictureData?.width}
                  height={pictureData?.height}
                  className="mx-auto w-full h-full object-cover"
                />
              </div>
            )}
          </MotionContainer>
        );
      })}
    </section>
  );
};

export default FeaturedServices;
