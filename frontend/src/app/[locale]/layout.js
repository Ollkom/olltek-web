import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import { Header, Footer } from "@/components/common";
import { Nunito_Sans, Inter } from "next/font/google";
import { getStrapiURL } from "@/utils/api-helpers";
import { FALLBACK_SEO } from "@/utils/constants";
import { getGlobal, getMainMenu } from "@/utils/api-loaders";
import { GoogleAnalyticsTracking } from "@/components/analytics";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

{
  /* TODO: Removed dmsans font later */
}

const dmSans = Nunito_Sans({
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(props) {
  const params = await props.params;
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const global = await getGlobal();
  const mainMenu = await getMainMenu();
  const direction = locale === "ar" ? "rtl" : "ltr";
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const { navbar, footer, leadForm, Advertisements } = global?.data?.attributes || {};
  const { MainMenuItems } = mainMenu?.data?.attributes || {};

  const navbarLogo = navbar?.navbarLogo?.logoImg?.data?.attributes;
  const navbarLogoMobile = navbar?.navbarLogoMobile?.logoImg?.data?.attributes;
  const contactButton = navbar?.button;
  const menuLinks = footer?.menuLinks;

  return (
    <html lang={locale} dir={direction}>
      <GoogleTagManager gtmId="GTM-5LH3SXGT" />
      <GoogleAnalyticsTracking />
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader showSpinner={false} />
          <Header
            links={MainMenuItems}
            navbarLogo={navbarLogo}
            contactButton={contactButton}
            socialLinks={footer?.socialLinks}
            menuLinks={menuLinks}
            navbarLogoMobile={navbarLogoMobile}
            advertisements={Advertisements}
          />

          <main className="min-h-screen">

            {children}

          </main>

          <Footer footer={footer} leadForm={leadForm} />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
