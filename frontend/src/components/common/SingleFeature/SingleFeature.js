import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { MotionContainer } from "@/components/ui";
import { SectionHeader } from "@/components/common";
import cx from "classnames";

const SingleFeature = (props) => {
    const { data } = props;
    const { title, service, description } = data;
    const { name, description: serviceDescription, type, feature, picture } = service || {};
    const pictureData = picture?.data?.attributes;
    return (
        <section className="py-10 bg-lightGrayBackground">
            <div className="pb-4">
                <SectionHeader
                    title={title}
                    description={description}
                />
            </div>
            {service && (
                <MotionContainer className="grid grid-cols-1 md:grid-cols-5 group px-5 md:px-0">
                    <div className="flex justify-center items-center order-2 md:order-1 py-8 2xl:py-10 col-span-3 container">
                        <div className="flex flex-col gap-4 max-w-lg 2xl:max-w-3xl">
                            {/* service name and description */}
                            <div className="flex flex-col gap-2">
                                {name && (
                                    <h2 className="text-base 2xl:text-[22px] font-medium text-darkGrayText">{name}</h2>
                                )}
                                {serviceDescription && (
                                    <p className="text-sm md:text-base text-lightGrayText">
                                        {serviceDescription}
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
                                                "flex gap-2 md:gap-4": type === 'icon',
                                                "items-center": !description,
                                                "items-start": description
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
                        <div className="flex justify-center items-center col-span-2 h-auto order-1 md:order-2">
                            <div className="relative w-full h-full flex justify-start items-center">
                                <Image
                                    src={getStrapiMedia(pictureData?.url)}
                                    alt={name || `service ${service?.id}`}
                                    width={pictureData?.width}
                                    height={pictureData?.height}
                                    className="object-contain md:max-h-[500px] 2xl:max-h-[670px] w-auto"
                                />
                            </div>
                        </div>
                    )}
                </MotionContainer>
            )}
        </section>
    );
};

export default SingleFeature;