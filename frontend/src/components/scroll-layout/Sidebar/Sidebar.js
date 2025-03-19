"use client";
import cx from "classnames";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

const Sidebar = ({ menuItem, title, Button: button, description }) => {
  const [activeSection, setActiveSection] = useState(null);
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div className="bg-white shadow-sm sticky md:w-[20%] 2xl:w-[15%] top-0 z-40 ps-5 md:py-10 md:pe-5 md:min-h-dvh md:z-auto md:shadow-inherit border-b border-[#E5E5E7] md:px-0 md:mx-0">
      <div className="md:pt-4 sticky top-0 md:pe-5">
        {title && (
          <h4 className="hidden text-sm font-semibold pb-4 md:block text-darkGrayText">
            {title}
          </h4>
        )}
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible py-4">
          <ul className="flex gap-x-7 min-w-max md:min-w-0 md:block text-lightGrayText border-b border-[#E5E5E7] md:border-none">
            {menuItem?.map((item) => {
              if (!item) return null;
              return (
                <li
                  key={item}
                  className="cursor-pointer last:pe-7 md:last:pe-0"
                  onClick={() => scrollToSection(item)}
                >
                  <span className={cx(`pb-3 md:pb-7 inline-block text-sm md:text-base font-medium transition-colors`, {
                    "text-lightBlue border-b-2 border-lightBlue md:border-none font-semibold md:font-medium -mb-px md:-mb-0": activeSection === item,
                    "text-lightGrayText hover:text-lightBlue": activeSection !== item,

                  })}>
                    {item}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
        {description && (
          <p className="hidden font-medium py-5 pe-4 text-sm border-t border-[#E5E5E7] md:block">
            {description}
          </p>
        )}
        {button && (
          <Link
            href={button?.url || "/"}
            className="hidden md:block"
          >
            <Button variant={button?.type}>
              {button?.text}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
