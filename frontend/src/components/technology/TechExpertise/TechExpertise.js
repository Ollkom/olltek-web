import Image from "next/image";
import { Typography, Tabs, Tab } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
const TechExpertise = (props) => {
  const { data } = props;
  const { title, TechTabs } = data;
  return (
    <section className="py-12 md:py-24 bg-[#F2F4F8]">
      <div className="container-custom px-5 md:px-0">
        <div className="text-center mb-14">
          {title && (
            <Typography variant="gradient" className="tracking-widest">
              {title}
            </Typography>
          )}
        </div>
        <div>
          <Tabs>
            {TechTabs?.map((item) => {
              return (
                <Tab label={item?.title} key={item?.id}>
                  <div className="grid grid-cols-2 md:grid-cols-8 pt-6">
                    {item?.feature?.map((tabContent) => {
                      const image = tabContent?.media?.data?.attributes;
                      return (
                        <div className="text-center">
                          <Image
                            alt={
                              image?.alternativeText ||
                              item?.title ||
                              `Tech Expertise ${item?.id}`
                            }
                            width={image?.width}
                            height={image?.height}
                            src={getStrapiMedia(image?.url)}
                            className="mx-auto"
                          />
                          <p className="py-3">{tabContent?.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default TechExpertise;
