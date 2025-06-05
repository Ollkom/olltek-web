"use client";
import cx from "classnames";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { IconUk, IconTurkey, IconChevronDown, IconLangSwitcher, IconChina } from "@/assets/images";
import { useCallback, useState, useTransition, useRef } from "react";
import { useNavbar } from "@/hooks";
import { useTopLoader } from 'nextjs-toploader';

function LocaleSwitcher({ isMobile = false, toggleDrawer }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { menuState, toggleSubmenu } = useNavbar();
  const { activeMenu, isAnimating } = menuState;
  const dropdownRef = useRef(null);
  const loader = useTopLoader();

  // Language configuration with names and icons
  const languageConfig = {
    en: { name: t("en"), icon: IconUk },
    tr: { name: t("tr"), icon: IconTurkey },
    "zh-CN": { name: t("zh-CN"), icon: IconChina },
    // ar: { name: t("ar"), icon: IconSaudiArabia }
  };

  const currentLocaleString = languageConfig[locale]?.name;

  // Create a submenu item object structure expected by toggleSubmenu
  const localeMenuItem = {
    id: 'locale-switcher',
    title: `${t("language")}: ${currentLocaleString}`
  };

  // Check if locale submenu is active
  const isLocaleMenuActive = activeMenu?.id === 'locale-switcher';

  const handleLanguageChange = useCallback((newLocale) => {
    startTransition(() => {
      loader.start();
      router.push(pathname, { locale: newLocale });
      if (isMobile) {
        toggleDrawer();
      } else {
        setIsOpen(false);
      }
    });
  }, [router, pathname, setIsOpen, isMobile, toggleDrawer]);

  const toggleDropdown = useCallback(() => {
    if (!isOpen) {
      dropdownRef.current?.focus();
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleBlur = useCallback((e) => {
    // Only close if the new focus target is outside our container
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {/* Desktop locale switcher */}
      {!isMobile && (
        <div
          className="relative md:min-w-32"
          ref={dropdownRef}
          tabIndex={-1}
          onBlur={handleBlur}
        >
          <button className="hidden md:flex items-center gap-2 cursor-pointer"
            onClick={toggleDropdown}
            aria-label={currentLocaleString}
            disabled={isPending}
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
          </button>

          {/* Desktop dropdown */}
          <div className={cx("transition-all duration-300 ease-in-out absolute top-12 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 min-w-60 2xl:min-w-80 overflow-hidden", {
            "opacity-0 invisible h-0": !isOpen,
            "opacity-100 visible": isOpen,
            "hidden": isPending
          })}>
            {routing?.locales?.map((lang) => {
              const Icon = languageConfig?.[lang]?.icon;
              if (!languageConfig?.[lang]) return null;

              return (
                <button
                  key={lang}
                  className="flex items-center hover:bg-gray-50 cursor-pointer transition-colors duration-200 w-full gap-4 py-5 px-6"
                  onClick={() => handleLanguageChange(lang)}
                  tabIndex={0}
                  disabled={isPending}
                >
                  {Icon && <Icon className="w-6 h-6 md:w-10 md:h-10" />}
                  <span className={cx("text-sm md:text-base text-nowrap", {
                    "font-medium text-darkGrayText": locale !== lang,
                    "font-semibold text-lightBlue": locale === lang,
                  })}>
                    {languageConfig?.[lang]?.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile locale switcher button */}
      {isMobile && (
        <>
          <li className="group">
            <button
              onClick={() => toggleSubmenu(localeMenuItem)}
              className="flex items-center justify-between w-full px-6"
            >
              <span className="text-base font-medium text-darkGrayText group-active:text-lightBlue">
                {t("language")}: {currentLocaleString}
              </span>
              <IconChevronDown className="rotate-[270deg] text-darkGrayText group-active:text-lightBlue" />
            </button>
          </li>

          {/* Mobile drawer */}
          <div className={cx("absolute inset-0 bg-white flex flex-col h-full transition-transform duration-300 z-10", {
            "translate-x-0": isLocaleMenuActive,
            "translate-x-full": isAnimating || !isLocaleMenuActive
          })}>
            {isLocaleMenuActive && (
              <div className="flex flex-col h-full">
                <div className="flex flex-col px-6 pt-4 pb-8 gap-8">
                  <button
                    onClick={() => toggleSubmenu()}
                    className="group flex items-center gap-4 text-darkGrayText"
                  >
                    <div className="w-10 h-10 rounded-full border border-darkGrayText group-active:border-lightBlue flex items-center justify-center">
                      <IconChevronDown className="rotate-90 group-active:text-lightBlue" />
                    </div>
                    <span className="text-base font-medium group-active:text-lightBlue">Back</span>
                  </button>

                  <ul className="flex flex-col gap-8">
                    {routing?.locales?.map((lang) => {
                      const Icon = languageConfig?.[lang]?.icon;
                      if (!languageConfig?.[lang]) return null;

                      return (
                        <li key={lang}>
                          <button
                            className="group flex items-center gap-4 w-full"
                            onClick={() => handleLanguageChange(lang)}
                          >
                            {Icon && (
                              <div className={cx("flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center", {
                                "bg-lightBlue": locale === lang,
                                "bg-darkGrayText group-active:bg-lightBlue": locale !== lang
                              })}>
                                <Icon />
                              </div>
                            )}
                            <span className={cx("text-base font-medium", {
                              "text-lightBlue": locale === lang,
                              "text-darkGrayText group-active:text-lightBlue": locale !== lang,
                            })}>
                              {languageConfig?.[lang]?.name}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default LocaleSwitcher;