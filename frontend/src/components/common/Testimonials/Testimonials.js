"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Typography, MotionContainer } from "@/components/ui";
import { IconBlockQuote1, IconBlockQuote2 } from "@/assets/images";

const Slider = dynamic(() => import("react-slick"));

function Testimonial({ text, authorName, picture, authorTitle }) {
  const imageUrl = getStrapiMedia(picture?.data?.attributes?.url);
  return (
    <div className="bg-white p-8 text-[#333] relative">
      <p className="mb-24 text-sm md:text-base 2xl:text-xl min-h-[128px] max-h-[128px] md:min-h-[168px] md:max-h-[168px] 2xl:min-h-[188px] 2xl:max-h-[188px]  line-clamp-6">
        {text}
      </p>
      <div className="mr-auto absolute bottom-0 mb-8 z-10">
        <p className="text-[#070751] text-base 2xl:text-xl">{authorName}</p>
        <p className="text-sm 2xl:text-base text-[#666666]">{authorTitle}</p>
        <div className="w-[130px] mt-3">
          <Image
            src={imageUrl ?? ""}
            alt={picture?.data?.attributes?.alternativeText || "none provided"}
            width={picture?.data?.attributes?.width}
            height={picture?.data?.attributes?.height}
          />
        </div>
      </div>
      <IconBlockQuote2 className="absolute bottom-3 right-3" />
    </div>
  );
}

export default function Testimonials({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="py-12 px-6 relative container-custom md:py-24 md:px-0">
      <MotionContainer>
        <IconBlockQuote1 className="absolute top-32 left-0 hidden md:block 2xl:top-40" />
        <div className="text-center">
          <Typography variant="title" className="capitalize tracking-normal">
            {data?.title}
          </Typography>
          <Typography variant="heading1" className="md:w-[800px] mx-auto">
            {data?.description}
          </Typography>
        </div>
        <div className="testimonial-slider">
          <Slider {...settings}>
            {data?.Testimonial?.map((testimonial) => (
              <Testimonial key={testimonial?.id} {...testimonial} />
            ))}
          </Slider>
        </div>
      </MotionContainer>
    </section>
  );
}
