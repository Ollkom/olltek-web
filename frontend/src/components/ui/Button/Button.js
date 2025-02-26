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

            "text-[#1010B7] bg-white px-6 py-2 md:py-3 hover:bg-[#F8F9FB] border border-transparent hover:border-[#E5E5E7] active:border-[#E5E5E7]":
              variant === "secondary",
            "hover:bg-[#070751] py-2.5 px-8 border-2 border-black hover:text-white transition-colors duration-300 ease-in-out 2xl:text-2xl":
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
