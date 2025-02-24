import { Inter, Bakbak_One } from "next/font/google";
import { RichText, BottomActions } from "@/components/common";
import { PageHeader } from "@/components/innerpages";
import { Features, Company, EmbedVideo } from "@/components/subpage";

const inter = Inter({ subsets: ["latin"] });
const bakbak = Bakbak_One({ weight: "400", subsets: ["latin"] });

export function postRenderer(section, index, pageName) {
  switch (section.__component) {
    case "shared.rich-text":
      return <RichText key={index} data={section} />;
    case "layout.page-header":
      return (
        <PageHeader
          key={index}
          data={section}
          fontInter={inter}
          fontBakBak={bakbak}
        />
      );
    case "sections.features":
      return <Features key={index} data={section} fontInter={inter} />;
    case "sections.company":
      return <Company key={index} data={section} fontInter={inter} />;
    case "sections.bottom-actions":
      return <BottomActions key={index} data={section} />;
    case "shared.video-embed":
      return <EmbedVideo key={index} data={section} pageName={pageName} />;

    default:
      return null;
  }
}
