"use client";
import cx from "classnames";
import { useState, useCallback } from "react";
import { NavLinks, NavLinksMobile } from "@/components/common";
import { HamburgerButton } from "@/components/ui";
import { useScrollLock } from "@/hooks";

const NavBar = (props) => {
  const { links, advertisements } = props;
  const [menuState, setMenuState] = useState({
    isOpen: false,          // main drawer toggle
    activeMenu: null,       // submenu toggle
    isAnimating: false      // animation state
  });

  const { isOpen } = menuState;
  useScrollLock({ lock: isOpen });

  // toggle opening of mobile drawer and reset menu state
  const toggleDrawer = useCallback(() => {
    if (!isOpen) {
      // Opening the drawer
      setMenuState(prev => ({
        ...prev,
        isOpen: true
      }));
    } else {
      // closing the drawer
      setMenuState(prev => ({
        ...prev,
        isAnimating: true,
        isOpen: false
      }));

      // Reset entire menu state after animation completes
      setTimeout(() => {
        setMenuState({
          isOpen: false,
          activeMenu: null,
          isAnimating: false
        });
      }, 500); // Match the animation duration
    }
  }, [isOpen]);

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
              "md:hidden fixed bottom-0 top-[86px] z-40 w-full bg-white transition-all duration-300 left-0",
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
                setMenuState={setMenuState}
                toggleDrawer={toggleDrawer}
              />
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};

export default NavBar;
