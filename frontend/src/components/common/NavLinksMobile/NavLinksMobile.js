"use client";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher, NavDetails } from "@/components/common";
import cx from "classnames";
import { IconChevronDown } from "@/assets/images";

const isArabicEnabled = process.env.NEXT_PUBLIC_LOCALE_ENABLE === "true";

const NavLinksMobile = (props) => {
  const {
    links,
    advertisements,
    menuState,
    toggleDrawer,
    toggleSubmenu
  } = props;

  const { activeMenu, isAnimating } = menuState;

  return (
    <div className="h-full flex flex-col">
      {/* Main menu (Level 0) */}
      <div className={cx("flex-1 overflow-y-auto", {
        "hidden": activeMenu
      })}>
        <ul className="flex flex-col gap-8 py-10 pe-5">
          {links?.map((link) => {
            const DynamicTag = link?.url ? Link : "div";
            return (
              <li key={link?.id} className="group">
                {link?.navigations?.data?.length > 0 ? (
                  <button
                    onClick={() => toggleSubmenu(link)}
                    className="flex items-center justify-between w-full px-6"
                  >
                    {link?.title && <span className="text-base font-medium text-darkGrayText group-active:text-lightBlue">{link?.title}</span>}
                    <IconChevronDown className="rotate-[270deg] text-darkGrayText group-active:text-lightBlue" />
                  </button>
                ) : (
                  <DynamicTag
                    {...(link?.url && { href: link?.url })}
                    className={cx("block px-6 text-base font-medium text-darkGrayText", {
                      "cursor-pointer": link?.url,
                      "cursor-default": !link?.url
                    })}
                    onClick={toggleDrawer}
                  >
                    {link?.title}
                  </DynamicTag>
                )}
              </li>
            );
          })}
          {isArabicEnabled && <LocaleSwitcher isMobile={true} />}
        </ul>
      </div>
      {/* Submenu */}
      <div className={cx("absolute inset-0 bg-white flex flex-col h-full transition-transform duration-300", {
        "translate-x-0": activeMenu,
        "translate-x-full": isAnimating || !activeMenu
      })}>
        <NavDetails
          menu={activeMenu}
          closeSubmenu={toggleSubmenu}
          toggleDrawer={toggleDrawer}
          advertisements={advertisements}
        />
      </div>
    </div>
  );
};

export default NavLinksMobile;
