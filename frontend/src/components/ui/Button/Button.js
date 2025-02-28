"use client";
import cx from "classnames";
import { ButtonIcon } from "@/assets/images";

const Button = (props) => {
  const {
    variant = "primary",
    icon = false,
    className,
    disabled,
    children,
    ...rest
  } = props;
  return (
    <div
      className={cx({
        "flex relative": icon,
      })}
    >
      <button
        className={cx(
          "rounded-full font-medium text-base text-black",
          {
            "pointer-events-none opacity-50": disabled,

            "text-darkGrayText bg-white px-4 py-2.5 hover:bg-lightBlue border border-white hover:border-lightBlue hover:text-white active:bg-darkBlue transition-colors duration-300 ease-in-out":
              variant === "secondary",
            "bg-darkBlue text-white px-4 py-2.5 border border-darkBlue hover:border-white hover:bg-white hover:text-darkBlue active:bg-lightGrayBackground transition-colors duration-300 ease-in-out":
              variant === "primary",
            "bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] py-1.5 px-8 text-white text-2xl 2xl:text-3xl":
              variant === "subsecondary",
            "bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] py-0.5 px-0.5  text-white text-2xl 2xl:text-3xl hover:text-white":
              variant === "gradient",
            "pr-10 md:pr-14": icon,
          },
          className
        )}
        disabled={disabled}
        {...rest}
      >
        {variant === "gradient" ? (
          <span className="flex w-full md:w-auto bg-white text-white rounded-full transition-colors duration-300 ease-in-out  hover:text-white hover:bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF]">
            <span className="w-full md:w-max inline-block bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] bg-clip-text text-transparent px-6 py-1 hover:text-white transition-colors duration-300 ease-in-out">
              {children}
            </span>
          </span>
        ) : (
          children
        )}
      </button>

      {icon && (
        <ButtonIcon className="absolute top-[17px] right-3 md:right-6" />
      )}
    </div>
  );
};

Button.displayName = "Button";

export default Button;
