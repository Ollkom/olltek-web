"use client";
import { useState, useEffect } from "react";
import { IconPolygonWhite } from "@/assets/images";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`md:fixed md:bottom-5 md:right-5 z-50 transition-opacity duration-300 cursor-pointer bg-lightBlue border border-white w-12 h-12 rounded-full flex items-center mx-auto md:mx-0 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
      onClick={scrollToTop}
    >
      <IconPolygonWhite className="mx-auto" />
    </div>
  );
};

export default ScrollToTop;
