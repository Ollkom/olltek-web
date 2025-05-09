import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import React from "react";
import { Link } from "@/i18n/routing";

const FeaturedProductsHorizontal = ({ data }) => {
  const { ProductItem, title, description, Button } = data || {};

  return (
    <section className="py-16 bg-darkBlue px-6">
      <div className="container flex flex-col gap-4 md:gap-0">
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center pb-4 md:pb-8 2xl:pb-12">
          {title && (
            <h2 className="text-white font-medium text-2xl md:text-3xl">
              {title}
            </h2>
          )}
          {description && <p className="text-white font-normal text-sm md:text-lg">{description}</p>}
        </div>
        {ProductItem?.length > 0 && (
          <div className="flex justify-center items-center">
            <div className="inline-flex flex-col items-start justify-center md:flex md:flex-row md:items-center md:justify-between">
              {ProductItem?.map((item, index) => {
                const { media, title } = item || {};
                const image = media?.file?.data?.attributes
                return (
                  <React.Fragment key={item?.id}>
                    <div className="flex md:flex-col md:justify-center items-center text-white gap-2 md:gap-0 md:px-1 2xl:px-2">
                      {media && <div className="bg-transparent w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center md:mb-2">
                        <Image
                          src={getStrapiMedia(image.url)}
                          alt={title}
                          width={image.width}
                          height={image.height}
                        />
                      </div>}
                      {title && <span className="text-sm 2xl:text-base font-normal 2xl:whitespace-nowrap text-center">{title}</span>}
                    </div>
                    {index < ProductItem.length - 1 && (
                      <div className="h-[24px] w-[2px] md:h-[2px] md:w-6 2xl:h-[2px] 2xl:w-14 bg-white ms-5 md:ms-0 my-2"></div>
                    )}
                  </React.Fragment>
                )
              })}

              <div className="h-[24px] w-[2px] md:h-[2px] md:w-6 2xl:h-[2px] 2xl:w-14 bg-white ms-5 md:ms-0 my-2"></div>
              {Button?.url && (
                <Link
                  href={Button?.url || "/"}
                  className="rounded-full font-normal text-sm 2xl:text-base text-darkGrayText bg-white px-5 py-1 hover:bg-lightBlue border border-darkGrayText hover:border-lightBlue hover:text-white active:bg-darkBlue transition-colors duration-300 ease-in-out whitespace-nowrap md:mx-4"
                >
                  {Button?.text}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsHorizontal;
