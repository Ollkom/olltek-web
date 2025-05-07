"use client";
import cx from "classnames";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { IconUk, IconTurkey, IconChina, IconSaudiArabia, IconChevronDown, IconLangSwitcher } from "@/assets/images";
import { useState, useTransition } from "react";

function LocaleSwitcher({ isMobile = false }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Language configuration with names and icons
  const languageConfig = {
    en: { name: t("en"), icon: IconUk },
    tr: { name: t("tr"), icon: IconTurkey },
    // cn: { name: t("cn"), icon: IconChina },
    // ar: { name: t("ar"), icon: IconSaudiArabia }
  };

  const currentLocaleString = languageConfig[locale]?.name;
  const handleLanguageChange = (newLocale) => {
    startTransition(() => {
      router.push(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative md:min-w-32">
      {/* Desktop locale switcher */}
      <div className="hidden md:flex items-center gap-2 cursor-pointer"
        onClick={toggleDropdown}
        aria-label={currentLocaleString}
      >
        <IconLangSwitcher className={cx("text-lightBlue", {
          "animate-pulse text-lightBlue": isPending
        })} />
        <span className={cx("text-black text-sm md:text-base font-medium", {
          "animate-pulse text-lightBlue": isPending
        })}>
          {currentLocaleString}
        </span>
        <IconChevronDown className={cx("transition-transform", {
          "rotate-180": isOpen
        })} />
      </div>
      {/* Mobile locale switcher */}
      {isMobile && (
        <li className="md:hidden group">
          <button
            onClick={() => toggleDropdown()}
            className="flex items-center justify-between w-full px-6"
          >
            {currentLocaleString && <span className="text-base font-medium text-darkGrayText">{t("language")}: {currentLocaleString}</span>}
            <IconChevronDown className={cx("rotate-[270deg] transition-transform duration-200 text-darkGrayText", {
              "rotate-0": isOpen
            })} />
          </button>
        </li>
      )}

      <div className={cx("transition-all duration-300 ease-in-out", {
        "opacity-0 invisible h-0": !isOpen,
        "opacity-100 visible": isOpen,
        "absolute top-12 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 min-w-60 2xl:min-w-80 overflow-hidden": !isMobile,
        "flex flex-col gap-4 py-5 pe-5": isMobile
      })}>
        {routing?.locales?.map((lang) => {
          const Icon = languageConfig?.[lang]?.icon;
          if (!languageConfig?.[lang]) return null;

          return (
            <div
              key={lang}
              className={cx("flex items-center hover:bg-gray-50 cursor-pointer transition-colors duration-200 w-full", {
                "gap-4 py-5 px-6": !isMobile,
                "gap-2 px-6 py-2": isMobile
              })}
              onClick={() => handleLanguageChange(lang)}
            >
              {Icon && <Icon className="w-6 h-6 md:w-10 md:h-10" />}
              <span className={cx("text-sm md:text-base text-nowrap", {
                "font-medium text-darkGrayText": locale !== lang,
                "font-semibold text-lightBlue": locale === lang,
              })}>
                {languageConfig?.[lang]?.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocaleSwitcher;