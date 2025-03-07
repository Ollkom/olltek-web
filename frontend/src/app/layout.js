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

export default async function RootLayout({ children }) {
  const global = await getGlobal();
  const mainMenu = await getMainMenu();

  if (!global.data || !mainMenu.data) return null;
  const { navbar, footer, leadForm, Advertisements } = global.data.attributes;

  const { MainMenuItems } = mainMenu.data.attributes;

  const navbarLogo = navbar?.navbarLogo?.logoImg?.data?.attributes;
  const navbarLogoMobile = navbar?.navbarLogoMobile?.logoImg?.data?.attributes;
  const contactButton = navbar?.button;
  const menuLinks = footer?.menuLinks;

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5LH3SXGT" />
      <GoogleAnalyticsTracking />
      <body className={inter.className}>
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
        <main className="min-h-screen">{children}</main>
        <Footer footer={footer} leadForm={leadForm} />
        <Analytics />
      </body>
    </html>
  );
}
