"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavBar, Logo } from "@/components/common";
import { Button } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";

const Header = (props) => {
  const {
    links,
    navbarLogo,
    contactButton,
    socialLinks,
    menuLinks,
    footerLogo,
    navbarLogoMobile,
  } = props;
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);

  return (
    <header>
      <div className="bg-[#212237] hidden md:block relative z-50">
        <div className="flex px-6 py-2 items-center md:px-0 container-custom">
          <div className="md:ml-auto">
            <ul>
              {menuLinks.map((links) => (
                <li
                  key={links?.id}
                  className="text-white inline px-6 md:px-8 last:hidden first:pl-0 md:nth-child-3:pr-2.5 hover:underline"
                >
                  <Link href={links?.url}>{links?.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white relative z-50">
        <div className="bg-[#212237] flex items-center pl-6 pr-4 py-5 md:justify-between md:pr-0 md:pl-0 md:py-0 2xl:py-3 md:bg-white container-custom">
          <Logo navbarLogo={navbarLogo} navbarLogoMobile={navbarLogoMobile} />
          <div className="ml-auto">
            <NavBar
              links={links}
              topLinks={menuLinks}
              setShowMenuOverlay={setShowMenuOverlay}
            />
          </div>
          {/* Desktop contact button */}
          <div className="hidden md:block ml-6">
            <Link href={contactButton?.url}>
              <Button type="button" variant={contactButton?.type} icon={false}>
                {contactButton?.text}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {showMenuOverlay && (
        <div className="bg-black opacity-50 fixed h-full z-20 w-full top-0 left-0"></div>
      )}
    </header>
  );
};

export default Header;
