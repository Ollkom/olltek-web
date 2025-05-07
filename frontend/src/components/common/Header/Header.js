"use client";
import { NavBar, Logo, LocaleSwitcher } from "@/components/common";
import { Button } from "@/components/ui";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const isArabicEnabled = process.env.NEXT_PUBLIC_LOCALE_ENABLE === "true";

const Header = (props) => {
  const {
    links,
    navbarLogo,
    contactButton,
    navbarLogoMobile,
    advertisements,
  } = props;

  const router = useRouter();
  const handleContactClick = useCallback((e) => {
    e.preventDefault();
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(contactButton.url || "/");
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
          {isArabicEnabled && <LocaleSwitcher />}
        </div>
      </div>

    </header>
  );
};

export default Header;
