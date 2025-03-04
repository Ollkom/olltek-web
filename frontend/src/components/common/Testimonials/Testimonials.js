"use client";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Typography, MotionContainer } from "@/components/ui";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselButton, DotButton, SectionHeader } from "@/components/common";

import cx from "classnames";
import { useCarouselButtons, useDotButton } from "@/hooks";

function Testimonial({ text, authorName, picture, authorTitle }) {
  const imageUrl = getStrapiMedia(picture?.data?.attributes?.url);

  return (
    <div className="flex flex-col items-center justify-between flex-grow h-full gap-4 md:gap-6">
      <div className="">
        <Image
          src={imageUrl ?? ""}
          alt={
            picture?.data?.attributes?.alternativeText ||
            authorName ||
            `Testimonial ${picture?.data?.id}`
          }
          width={picture?.data?.attributes?.width}
          height={picture?.data?.attributes?.height}
          className="mx-auto w-36"
        />
      </div>
      <p className="font-semibold text-center text-sm md:text-base text-[#333333]">
        {text}
      </p>
      <div className="mx-auto flex flex-col items-center text-center">
        <p className="text-darkGrayText text-sm md:text-base font-semibold">{authorName}</p>
        <p className="font-normal text-xs md:text-base text-[#666666]">{authorTitle}</p>
      </div>
    </div>
  );
}

export default function Testimonials({ data }) {

  const OPTIONS = {
    loop: true,
    align: "start",
    slidesToScroll: "auto",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false })
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useCarouselButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const isCarouselRequired = data?.Testimonial?.length > 1;

  if (data?.Testimonial?.length === 0) return null;

  return (
    <section className="py-12 px-6 relative container-custom md:px-0">
      <MotionContainer>
        <div className="mx-auto">
          <SectionHeader
            title={data?.title}
            description={data?.description}
          />
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center">
            {isCarouselRequired && (
              <div className="hidden md:flex">
                <CarouselButton
                  direction="prev"
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                />

              </div>
            )}

            <div
              ref={isCarouselRequired ? emblaRef : null}
              className="overflow-hidden">
              <div className="flex">
                {data?.Testimonial?.map((testimonial, index) => (
                  <div
                    key={testimonial?.id}
                    className="min-w-0 flex-[0_0_100%] md:flex-[0_0_33.333%] px-4">
                    <Testimonial {...testimonial} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex">
              <CarouselButton
                direction="next"
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div>
          {isCarouselRequired && (
            <div className="flex justify-center items-center gap-2 mt-10">
              {scrollSnaps?.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={cx("h-[12px] w-[12px] rounded-full", {
                    "bg-lightBlue border-lightBlue": index === selectedIndex,
                    "border-[#E5E5E7] bg-[#E5E5E7]": index !== selectedIndex,
                  })}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </MotionContainer>
    </section>
  );
}
