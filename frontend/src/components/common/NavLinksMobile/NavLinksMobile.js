"use client";
import Link from "next/link";
import { NavDetails } from "@/components/common";
import cx from "classnames";
import { IconChevronDown } from "@/assets/images";

const NavLinksMobile = (props) => {
  const {
    links,
    closeMenu,
    advertisements,
    activeMenu,
    setActiveMenu,
  } = props;

  // open submenu and set the clicked links menu as active menu
  const openSubmenu = (link) => {
    setActiveMenu(link);
    setTimeout(() => {
      setActiveMenu(link);
    }, 10);
  };

  // close submenu only
  const closeSubmenu = () => {
    setActiveMenu(null);
    setTimeout(() => {
      if (!activeMenu) setActiveMenu(null);
    }, 500);
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
                  onClick={() => openSubmenu(link)}
                  className="flex items-center justify-between w-full px-6"
                >
                  {link?.title && <span className="text-base font-medium text-darkGrayText group-active:text-lightBlue">{link?.title}</span>}
                  <IconChevronDown className="rotate-[270deg] text-darkGrayText group-active:text-lightBlue" />
                </button>
              ) : (
                <Link
                  href={link?.url || "#"}
                  className="block px-6 text-base font-medium text-darkGrayText"
                  onClick={closeMenu}
                >
                  {link?.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Submenu */}
      <div className={cx("absolute inset-0 bg-white flex flex-col h-full transition-transform duration-500", {
        "translate-x-0": activeMenu,
        "translate-x-full": !activeMenu
      })}>
        <NavDetails
          menu={activeMenu}
          closeSubmenu={closeSubmenu}
          closeMenu={closeMenu}
          advertisements={advertisements}
        />
      </div>

    </div>
  );
};

export default NavLinksMobile;
