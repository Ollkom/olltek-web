"use client"
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const CountryScroll = ({ countries }) => {
    const countryArray = countries?.country || [];

    const OPTIONS = {
        loop: true,
        axis: "y",
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
        Autoplay({
            playOnInit: true,
            delay: 3000
        })
    ]);

    // Return early if no countries
    if (!countryArray || countryArray.length === 0) return null;
    const isCarouselRequired = countryArray.length > 1;
    return (
        <span className="inline-flex items-start justify-start relative ml-1">
            <div
                className="overflow-hidden h-[40px] md:h-[52px] w-full"
                ref={isCarouselRequired ? emblaRef : null}
            >
                <div className="flex flex-col h-[40px] md:h-[55px]">
                    {countryArray.map((country) => {
                        const countryMedia = country.media.file.data.attributes
                        return (
                            <div key={country.id}
                                className="flex flex-[0_0_100%] items-center min-h-0"
                            >
                                {country?.title && <span className="italic">{country.title}</span>}
                                {countryMedia?.url && (
                                    <span className="inline-block ms-2">
                                        <Image
                                            src={getStrapiMedia(countryMedia.url)}
                                            alt={countryMedia.alternativeText || "Icon"}
                                            width={countryMedia.width || 40}
                                            height={countryMedia.height || 40}
                                            className="w-[26px] h-[26px] md:w-[40px] md:h-[40px]"
                                        />
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </span>
    )
}

export default CountryScroll