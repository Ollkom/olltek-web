"use client";
import cx from "classnames";
import { useState, useCallback } from "react";
import { NavLinks, NavLinksMobile } from "@/components/common";
import { HamburgerButton } from "@/components/ui";
import { useScrollLock } from "@/hooks";

const NavBar = (props) => {
  const { links, advertisements } = props;
  const [open, setOpen] = useState(false);
  const [menuState, setMenuState] = useState({
    activeMenu: null,
    isAnimating: false
  });

  useScrollLock({ lock: open });

  // toggle opening of mobile drawer and reset menu state
  const closeMenu = useCallback(() => {
    setOpen(!open);

    // trigger animation then close menu
    if (open) {
      setMenuState(prev => ({ ...prev, isAnimating: true }));

      // reset menu state after animation completes
      setTimeout(() => {
        setMenuState({ activeMenu: null, isAnimating: false });
      }, 500); // Match the animation duration
    }
  }, [open]);

  return (
    <nav>
      <div className="flex">
        <div className="z-50 md:w-auto w-full flex justify-between md:hidden relative ml-auto">
          <HamburgerButton closeMenu={closeMenu} setOpen={setOpen} open={open} />
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
                "-translate-x-full": !open,
              }
            )}
          >
            <ul className="relative h-full overflow-y-auto">
              <NavLinksMobile
                links={links}
                advertisements={advertisements}
                closeMenu={closeMenu}
                menuState={menuState}
                setMenuState={setMenuState}
              />
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};

export default NavBar;
