"use client"
import { useDotButton } from "@/hooks";
import { getStrapiMedia } from "@/utils/api-helpers";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import cx from "classnames";

function AdvertisementSlider({ advertisements, hoverMenuItem, isMenuOpen, isMobileMenu }) {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
    }, [
        Autoplay({ playOnInit: true, stopOnMouseEnter: true, stopOnInteraction: false, delay: 3000 })
    ]);

    const isCarouselRequired = advertisements?.Advert?.length > 1
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    // Reset Embla carousel when active menu toggles so that each carosuel is unique
    useEffect(() => {
        if (emblaApi && (hoverMenuItem || isMobileMenu)) {
            emblaApi.reInit();
        }
    }, [emblaApi, hoverMenuItem, isMobileMenu]);

    return (
        <>
            {advertisements?.Advert?.length > 0 && (
                <div className={cx("relative flex justify-center", {
                    "px-10": !isMobileMenu,
                    "w-full": isMobileMenu
                })}>
                    <div
                        ref={isCarouselRequired && isMenuOpen ? emblaRef : null}
                        className={cx("overflow-hidden rounded-md", {
                            "w-[240px] h-[320px]": !isMobileMenu,
                            "h-[457px] w-full": isMobileMenu
                        })}
                    >
                        <div className="flex h-full">
                            {advertisements?.Advert?.map((advert) => (
                                <Link key={advert.id} href={advert?.url || "/"} className="flex-[0_0_100%] min-w-0 relative h-full">
                                    {advert?.media?.data?.attributes?.url && (
                                        <Image
                                            src={getStrapiMedia(advert?.media?.data?.attributes?.url)}
                                            alt={advert?.title || `Advertisement ${advert?.id}`}
                                            width={advert?.media?.data?.attributes?.width}
                                            height={advert?.media?.data?.attributes?.height}
                                            className="object-cover rounded-md h-full w-full"
                                        />)}
                                    <div className="absolute inset-0 bg-black/60"></div>
                                    <div className={cx("absolute top-0 left-0 right-0", {
                                        "pt-6": true
                                    })}>
                                        {advert?.MediaHover?.data?.attributes?.url && (
                                            <Image
                                                src={getStrapiMedia(advert?.MediaHover?.data?.attributes?.url)}
                                                alt={advert?.title || `Advertisement ${advert?.id}`}
                                                width={isMobileMenu ? advert?.MediaHover?.data?.attributes?.width : 120}
                                                height={isMobileMenu ? advert?.MediaHover?.data?.attributes?.height : 16}
                                                className="object-contain mx-auto"
                                            />
                                        )}
                                    </div>
                                    {advert?.title && (
                                        <div className={cx("absolute bottom-0 left-0 right-0 bg-black/30 px-4", {
                                            "pt-2 pb-8": !isMobileMenu,
                                            "pt-2 pb-16": isMobileMenu
                                        })}>
                                            <h3 className={cx("font-normal text-white", {
                                                "text-base": !isMobileMenu,
                                                "text-2xl font-light": isMobileMenu
                                            })}>
                                                {advert?.title}
                                            </h3>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Indicator dots */}
                        {isCarouselRequired && (
                            <div className={cx("absolute left-1/2 transform -translate-x-1/2 flex space-x-2", {
                                "bottom-8": !isMobileMenu,
                                "bottom-10": isMobileMenu
                            })}>
                                {scrollSnaps?.map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => onDotButtonClick(index)}
                                        className={cx("w-2 h-2 rounded-full cursor-pointer", {
                                            "bg-white": index === selectedIndex,
                                            "bg-lightGrayText": index !== selectedIndex,
                                        })}
                                    ></div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default AdvertisementSlider