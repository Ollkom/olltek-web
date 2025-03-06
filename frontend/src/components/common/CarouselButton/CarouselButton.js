"use client";

import { IconForwardArrow } from "@/assets/images";
import cx from "classnames";

const CarouselButton = ({
  direction,
  children,
  className,
  variant = "carousel",
  ...restProps
}) => {
  const isPrev = direction === "prev";

  return (
    <button
      className={cx(
        "group p-2.5 text-[#181818] disabled:border-lightgray disabled:bg-white flex-shrink-0 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 hover:text-lightBlue",
        className
      )}
      type="button"
      aria-label={direction}
      {...restProps}
    >
      <IconForwardArrow
        className={cx("fill-current", {
          "-rotate-180": isPrev,
        })}
      />
      {children}
    </button>
  );
};

export default CarouselButton;
