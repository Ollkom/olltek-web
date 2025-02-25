import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Typography } from "@/components/ui";

const Features = (props) => {
  const { data } = props;
  const { feature, enable } = data;

  if (enable === false) return;

  return (
    <section className="py-12 md:py-24">
      <div className="container-custom px-5 md:px-0 z-20 relative">
        <div className="items-center justify-between grid grid-cols-2 gap-0 max-w-[1162px] mx-auto md:grid-cols-4">
          {feature?.map((item) => (
            <div key={item?.id} className="pb-6 md:pb-0">
              {item?.media?.data && (
                <div className="mb-8">
                  <Image
                    src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                    alt={
                      item?.media?.data?.attributes?.alternativeText ||
                      item?.title ||
                      `Feature ${item?.id}`
                    }
                    width={item?.media?.data?.attributes?.width}
                    height={item?.media?.data?.attributes?.height}
                    className="mx-auto"
                  />
                </div>
              )}
              <div className="text-center">
                <div className="mb-3">
                  <Typography variant="gradient">
                    <span className="text-4xl md:text-5xl">{item?.text}</span>
                  </Typography>
                </div>
                <div>
                  <p className="text-base min-h-[48px] md:min-h-0">
                    {item?.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
