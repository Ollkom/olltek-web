"use client";
import cx from "classnames";
import { NavLinks, NavLinksMobile } from "@/components/common";
import { HamburgerButton } from "@/components/ui";
import { useScrollLock, useNavbar } from "@/hooks";

const NavBar = (props) => {
  const { links, advertisements } = props;
  const { menuState, toggleDrawer, toggleSubmenu } = useNavbar();
  const { isOpen } = menuState;

  useScrollLock({ lock: isOpen });

  return (
    <nav>
      <div className="flex">
        <div className="z-50 md:w-auto w-full flex justify-between md:hidden relative ml-auto">
          <HamburgerButton
            menuState={menuState}
            toggleDrawer={toggleDrawer}
          />
        </div>
        {/* Desktop nav */}
        <ul className="md:flex hidden items-center gap-8">
          <NavLinks links={links} advertisements={advertisements} />
        </ul>
        {/* Mobile nav */}
        {
          <div
            className={cx(
              "md:hidden fixed bottom-0 top-[86px] z-40 w-full bg-white transition-all duration-500 left-0",
              {
                "-translate-x-full": !isOpen,
              }
            )}
          >
            <ul className="relative h-full overflow-y-auto">
              <NavLinksMobile
                links={links}
                advertisements={advertisements}
                menuState={menuState}
                toggleDrawer={toggleDrawer}
                toggleSubmenu={toggleSubmenu}
              />
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};

export default NavBar;
