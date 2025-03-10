"use client";
import Link from "next/link";
import { NavDetails } from "@/components/common";
import cx from "classnames";
import { IconChevronDown } from "@/assets/images";

const NavLinksMobile = (props) => {
  const {
    links,
    advertisements,
    menuState,
    setMenuState,
    toggleDrawer
  } = props;

  const { activeMenu, isAnimating } = menuState;

  const toggleSubmenu = (link) => {
    if (!activeMenu) {
      // Opening submenu
      setMenuState(prev => ({
        ...prev,
        activeMenu: link,
        isAnimating: false
      }));
    } else {
      // Closing with animation
      setMenuState(prev => ({
        ...prev,
        isAnimating: true
      }));

      // Reset only submenu state after animation completes
      setTimeout(() => {
        setMenuState(prev => ({
          ...prev,
          activeMenu: null,
          isAnimating: false
        }));
      }, 300); // Match the transition-duration value
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Main menu (Level 0) */}
      <div className={cx("flex-1 overflow-y-auto", {
        "hidden": activeMenu
      })}>
        <ul className="flex flex-col gap-8 py-10 pe-5">
          {links?.map((link) => (
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
                <Link
                  href={link?.url || "#"}
                  className="block px-6 text-base font-medium text-darkGrayText"
                  onClick={toggleDrawer}
                >
                  {link?.title}
                </Link>
              )}
            </li>
          ))}
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
