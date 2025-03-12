import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { MotionContainer } from "@/components/ui";

const Statistics = (props) => {
  const { data } = props;
  const { title, facts } = data;
  return (
    <section className="bg-darkBlue py-10 md:py-14">
      <MotionContainer className="container px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          {title && (
            <h2 className="text-2xl 2xl:text-3xl font-medium text-white mb-8 md:mb-0 md:w-1/6">
              {title}
            </h2>
          )}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {facts?.map((item, index) => {
              const media = item?.media?.data?.attributes;
              return (
                <div key={item?.id} className="flex flex-col items-center text-center relative">
                  {/* Icon */}
                  {media?.url && (
                    <div className="mb-4">
                      <div className="flex items-center justify-center">
                        <Image
                          src={getStrapiMedia(media?.url)}
                          alt={
                            media?.alternativeText ||
                            item?.title ||
                            `Feature ${item?.id}`
                          }
                          width={media?.width}
                          height={media?.height}
                          className="mx-auto w-10 h-10"
                        />
                      </div>
                    </div>
                  )}

                  {/* Text content */}
                  {item?.title && (
                    <p className="text-sm 2xl:text-base font-normal text-white px-3 2xl:px-8">
                      {item?.title}
                    </p>
                  )}
                  {index < (facts?.length - 1) && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[80%] w-[2px] bg-white"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </MotionContainer>
    </section>
  );
};

export default Statistics;
