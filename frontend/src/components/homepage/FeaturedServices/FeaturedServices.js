import Link from "next/link";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Typography, Button, MotionContainer } from "@/components/ui";

const FeaturedServices = (props) => {
  const { data, fontInter } = props;
  const { title, service, description } = data;
  return (
    <section className="py-12 px-5 relative bg-[#F4F8FF] md:py-0 md:px-0">
      <>
        <div className="text-center">
          {title && (
            <Typography variant="title" className="tracking-widest">
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="heading1" className="relative">
              <span className={`relative z-10 ${fontInter?.className}`}>
                {description}
              </span>
            </Typography>
          )}
        </div>
        {service?.map((item) => {
          const { name, subheader, description, icon } = item;
          const media = icon?.data?.attributes;
          return (
            <MotionContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 group">
              <div className="order-2 md:order-none md:group-odd:order-1 flex items-center">
                <div className="max-w-[540px] mx-auto">
                  {name && (
                    <span className="pb-5 block">
                      <Typography variant="title" className="tracking-widest">
                        {item?.name}
                      </Typography>
                    </span>
                  )}
                  {subheader && (
                    <p className="md:text-2xl 2xl:text-3xl text-[#202529] pb-4">
                      {item?.subheader}
                    </p>
                  )}
                  {description && (
                    <p className="text-sm pb-8 md:text-base text-[#202529]">
                      {item?.description}
                    </p>
                  )}

                  {item?.Button?.url && (
                    <Link
                      href={item?.Button?.url}
                      target={item?.Button?.newTab ? "_blank" : "_self"}
                      className="w-full mx-auto block pb-8 md:pb-0"
                    >
                      <Button>{item?.Button?.text}</Button>
                    </Link>
                  )}
                </div>
              </div>
              {media?.url && (
                <Image
                  src={getStrapiMedia(media?.url)}
                  alt={media?.alternativeText || "Featured Services"}
                  width={media?.width}
                  height={media?.height}
                  className="mx-auto"
                />
              )}
            </MotionContainer>
          );
        })}
      </>
    </section>
  );
};

export default FeaturedServices;
