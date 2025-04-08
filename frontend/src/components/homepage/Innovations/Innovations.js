"use client"
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import cx from "classnames";

const Innovations = (props) => {
  const { data } = props;
  const { description, feature, title, picture } = data;
  const [selectedIndex, setSelectedIndex] = useState(0);


  const OPTIONS = {
    loop: true,
    align: "start",
    skipSnaps: false,
  };

  const [mainRef, mainApi] = useEmblaCarousel(OPTIONS);

  // manual selection of item
  const onThumbClick = useCallback(
    (index) => {
      if (!mainApi) return;
      setSelectedIndex(index);
      mainApi.scrollTo(index);
    },
    [mainApi]
  );

  // set autoplay interval
  useEffect(() => {
    if (!mainApi) return;

    const autoplayInterval = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % (feature?.length || 1);
      setSelectedIndex(nextIndex);
      mainApi.scrollTo(nextIndex);
    }, 3000);

    // Clear interval on unmount
    return () => clearInterval(autoplayInterval);
  }, [mainApi, selectedIndex, feature?.length]);

  const onSelect = useCallback(() => {
    if (!mainApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
  }, [mainApi]);

  // manual navigation
  useEffect(() => {
    if (!mainApi) return;

    onSelect();
    mainApi.on("select", onSelect);

    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, onSelect]);

  if (feature?.length === 0) return null;
  return (
    <section className="py-12 text-white relative">
      {picture?.data?.attributes?.url && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src={getStrapiMedia(picture.data.attributes.url)}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273665E5]/90"></div>
        </div>
      )}
      <div className="container px-5 md:px-0 relative z-10">
        {/* TODO: Use SectionHeader component with text-white update */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center pb-4 md:pb-12">
          {title && (
            <h2 className="text-white font-medium text-2xl md:text-3xl">
              {title}
            </h2>
          )}
          {description && <p className="text-white font-normal text-sm md:text-lg">{description}</p>}
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 items-center max-w-7xl mx-auto">
          {/* steps */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col items-start">
              {feature?.map((item, index) => {

                return (
                  <div key={item.id} className="flex flex-col items-start justify-center">
                    {/* Item content */}
                    <div
                      className={cx(
                        "inline-flex w-fit items-start cursor-pointer transition-all duration-300 ease-in-out border hover:border-[#E5E5E7]/50 rounded-full",
                        {
                          "border-[#E5E5E7] bg-white shadow-md transform scale-[1.02] translate-x-[1%]": index === selectedIndex,
                          "border-transparent opacity-80 hover:opacity-100": index !== selectedIndex
                        }
                      )}
                      onClick={() => onThumbClick(index)}
                    >
                      <div className="flex items-center">
                        <div className={cx(
                          "flex items-center justify-center w-8 h-8 rounded-full mr-2 md:mr-4 border-t border-r border-b border-[#E5E5E7] font-medium transition-all duration-300 ease-in-out flex-shrink-0 text-xs md:text-sm",
                          {
                            "text-white font-semibold bg-darkBlue": index === selectedIndex,
                            "bg-[#FFFFFF] text-[#525D6A]": index !== selectedIndex
                          }
                        )}
                        >
                          {index + 1}
                        </div>
                        {item?.title && <h3 className={cx(
                          "pe-4 md:pe-6 py-2 transition-all duration-300 ease-in-out text-xs md:text-sm",
                          {
                            "font-semibold text-lightBlue": index === selectedIndex,
                            "font-normal text-white": index !== selectedIndex
                          }
                        )}
                        >
                          {item.title}
                        </h3>}
                      </div>
                    </div>

                    {/* Divider */}
                    {index < feature.length - 1 && (
                      <div className="h-6 w-[2px] bg-[#FFFFFF] ml-4 my-2 transition-all duration-300 ease-in-out"></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Image display */}
          <div className="w-full md:w-1/2">
            <div className="overflow-hidden" ref={mainRef}>
              <div className="flex">
                {feature?.map((item) => {
                  const itemMedia = item?.media?.data?.attributes;

                  return (
                    <div key={item.id} className="flex-[0_0_100%] min-w-0">
                      {item?.media?.data && (
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={getStrapiMedia(itemMedia?.url)}
                            alt={item?.title || `feature ${item.id}`}
                            width={itemMedia?.width}
                            height={itemMedia?.height}
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovations;
