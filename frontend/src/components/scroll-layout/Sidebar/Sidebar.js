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
    <div className="bg-white shadow-sm sticky top-0 z-50 px-5 md:py-10 md:w-[20%] md:min-h-dvh md:z-auto md:shadow-inherit md:px-0 md:mx-0">
      <div className="md:pt-4 sticky top-0">
        {title && (
          <h4 className="hidden text-xl 2xl:text-2xl font-bold pb-4 md:block">
            {title}
          </h4>
        )}
        <ul className="flex space-x-10 font-medium md:text-xl 2xl:text-2xl md:space-x-0 md:block">
          {menuItem?.map((item) => (
            <li
              key={item}
              className={cx("cursor-pointer md:pl-2", {
                "text-[#4CACEA]": activeSection === item,
              })}
              onClick={() => scrollToSection(item)}
            >
              <span className="py-4 inline-block relative">
                {item}
                {activeSection === item && (
                  <span className="block h-1 bg-[#4CACEA] absolute bottom-0 w-full" />
                )}
              </span>
            </li>
          ))}
        </ul>
        {description && (
          <p className="hidden px-2 py-5 mt-24 text-xl border-t-2 border-[#D9D9D9] 2xl:text-2xl md:block">
            {description}
          </p>
        )}
        {button && (
          <Link
            href={button?.url}
            className="hidden md:block"
            variant={button?.variant}
          >
            <Button>{button?.text}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
