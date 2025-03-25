"use client";
import cx from "classnames";
import { useState } from "react";

export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(
    children && children[0]?.props?.label
  );

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="mx-auto">
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-nowrap md:gap-x-4 gap-x-2 min-w-max border-b border-[#D5D5D5]">
          {children?.map((child) => {
            return (
              <button
                key={child?.key}
                className={cx(`cursor-pointer whitespace-nowrap py-2 text-sm font-medium transition-colors`, {
                  "text-lightBlue border-b-2 border-lightBlue font-semibold -mb-px": activeTab === child?.props?.label,
                  "text-lightGrayText hover:text-lightBlue": activeTab !== child?.props?.label,
                })}
                onClick={(e) => handleClick(e, child?.props?.label)}
              >
                {child?.props?.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="py-4 md:py-8">
        {children?.map((child) => {
          if (child?.props?.label === activeTab) {
            return (
              <div key={child?.key}>
                {child?.props?.children}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
