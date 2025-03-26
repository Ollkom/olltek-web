"use client"
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountryScroll = ({ countries }) => {
    const countryArray = countries?.country || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!countryArray || countryArray.length === 0) return null;
    const isAnimationRequired = countryArray.length > 1;

    useEffect(() => {
        if (!isAnimationRequired) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % countryArray.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [countryArray.length, isAnimationRequired]);
    // TODO: implement solution for max div width using framer motion
    return (
        <span className="inline-flex items-start justify-start min-w-[185px] md:min-w-[372px] relative ms-1">
            <div className="overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={countryArray[currentIndex].id}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center w-full"
                    >

                        {countryArray[currentIndex]?.title &&
                            <span className="italic">{countryArray[currentIndex].title}</span>
                        }
                        {countryArray[currentIndex]?.media?.file?.data?.attributes?.url && (
                            <span className="inline-block ms-2">
                                <Image
                                    src={getStrapiMedia(countryArray[currentIndex].media.file.data.attributes.url)}
                                    alt={countryArray[currentIndex].media.file.data.attributes.alternativeText || "Icon"}
                                    width={countryArray[currentIndex].media.file.data.attributes.width || 40}
                                    height={countryArray[currentIndex].media.file.data.attributes.height || 40}
                                    className="w-[26px] h-[26px] md:w-[40px] md:h-[40px]"
                                />
                            </span>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>
        </span>
    );
};

export default CountryScroll;