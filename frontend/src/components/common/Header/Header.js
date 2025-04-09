"use client";
import Link from "next/link";
import { NavBar, Logo } from "@/components/common";
import { Button } from "@/components/ui";
import { useCallback } from "react";

const Header = (props) => {
  const {
    links,
    navbarLogo,
    contactButton,
    navbarLogoMobile,
    advertisements,
  } = props;

  const handleContactClick = useCallback((e) => {
    e.preventDefault();
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="relative z-50 bg-white border-b border-[#E5E5E7] h-[86px] flex items-center justify-center w-full">
      <div className=" w-full">
        <div className="flex items-center pl-6 pr-4 md:justify-between md:gap-5 md:pr-0 md:pl-0 md:py-0 container">
          <Logo navbarLogo={navbarLogo} navbarLogoMobile={navbarLogoMobile} />
          <div className="ml-auto">
            <NavBar
              links={links}
              advertisements={advertisements}
            />
          </div>
          {/* Desktop contact button */}
          <div className="hidden md:block ml-6">
            <Button type="button" variant={contactButton?.type} icon={false} onClick={handleContactClick}>
              {contactButton?.text}
            </Button>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
