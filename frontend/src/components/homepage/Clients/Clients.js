"use client";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { SectionHeader } from "@/components/common";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Clients = (props) => {
  const { data } = props;
  const { heading, Client, subtitle, enable } = data;

  const OPTIONS = {
    loop: true,
    align: "start",
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false })
  ]);

  // TODO: Need to find solution for autoplay for 7 slider per view

  const isCarouselRequired = Client?.length > 6;
  if (enable === false) return;
  if (Client?.length === 0) return null;
  return (
    <section className="py-12 px-5 md:px-0 mx-auto bg-lightGrayBackground border-b border-lightGrayBackground">
      <div className="container-custom">
        <SectionHeader title={heading} header={subtitle} />
        <div
          ref={isCarouselRequired ? emblaRef : null}
          className="overflow-hidden">
          <div className="flex items-center">
            {Client?.map((item) => {
              const client = item?.media?.data?.attributes;
              if (!client?.url) return null;
              return (
                <div key={item?.id} className="min-w-0 flex-[0_0_33%] md:flex-[0_0_17%] ps-3">
                  <Image
                    src={getStrapiMedia(client?.url)}
                    alt={
                      client?.alternativeText ||
                      client?.title ||
                      `Client ${item?.id}`
                    }
                    width={client?.width}
                    height={client?.height}
                    className="mx-auto"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
