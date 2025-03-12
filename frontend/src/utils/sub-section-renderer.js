import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Contact, Careers, RetailApplicationForm } from "@/components/forms";
import {
  PageHeader,
  BottomActions,
  BannerSlider,
  Faq,
  BlogPosts,
} from "@/components/common";
import {
  Features,
  Products,
  Company,
  LargeVideo,
  CeoMessage,
  EnhancedFeatures,
  Package,
  ShowReel,
} from "@/components/subpage";
import { FeaturedServices, Statistics } from "@/components/homepage";
import { Tabs } from "@/components/logistics";
import { TechProducts, TechExpertise } from "@/components/technology";
import { OurBrands } from "@/components/brands";
import { FeaturedProductsHorizontal } from "@/components/common";

const inter = Inter({ subsets: ["latin"] });

export function subSectionRenderer(section, index, pageName) {
  switch (section.__component) {
    case "layout.page-header":
      return <PageHeader key={index} data={section} fontInter={inter} />;
    case "sections.blog-posts":
      return <BlogPosts key={index} data={section} />;
    case "sections.contact-form":
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Contact key={index} data={section} />
        </Suspense>
      );
    case "sections.career-form":
      return <Careers key={index} data={section} />;
    case "sections.features":
      return <EnhancedFeatures key={index} data={section} fontInter={inter} />;
    case "sections.logistics":
      return <Products key={index} data={section} />;
    case "sections.marketing":
      return <Products key={index} data={section} />;
    case "sections.company":
      return <Company key={index} data={section} fontInter={inter} />;
    case "sections.bottom-actions":
      return <BottomActions key={index} data={section} />;
    case "sections.ceo-message":
      return <CeoMessage key={index} data={section} fontInter={inter} />;
    case "sections.large-video":
      return <LargeVideo key={index} data={section} fontInter={inter} />;
    case "sections.logistics-page-forms":
      return <Tabs key={index} data={section} />;
    case "sections.tech-products":
      return <TechProducts key={index} data={section} />;
    case "sections.tech-expertise":
      return <TechExpertise key={index} data={section} />;
    case "sections.services":
      return <FeaturedServices key={index} data={section} fontInter={inter} />;
    case "sections.package":
      return <Package key={index} data={section} />;
    case "sections.banner-slider":
      return <BannerSlider key={index} data={section} />;
    case "sections.faq":
      return <Faq key={index} data={section} />;
    case "sections.homepage-statistics":
      return <Statistics key={index} data={section} fontInter={inter} />;
    case "sections.retail-application-form":
      return (
        <RetailApplicationForm key={index} data={section} fontInter={inter} />
      );
    case "sections.our-brands":
      return <OurBrands key={index} data={section} />;
    case "sections.show-reel":
      return <ShowReel key={index} data={section} />;
    case "sections.featured-products":
      return <FeaturedProductsHorizontal key={index} data={section} />;

    default:
      return null;
  }
}
