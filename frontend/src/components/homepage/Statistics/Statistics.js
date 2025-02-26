import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";

const Statistics = (props) => {
  const { data } = props;
  return (
    <section className="bg-olltekDark py-10 md:py-14">
      <div className="container-custom px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          {data?.title && (
            <h2 className="text-2xl 2xl:text-3xl font-medium text-white mb-8 md:mb-0 md:w-1/6">
              {data?.title}
            </h2>
          )}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {data?.facts?.map((item, index) => (
              <div key={item?.id} className="flex flex-col items-center text-center relative">
                {/* Icon */}
                {item?.media?.data?.attributes?.url && (
                  <div className="mb-4">
                    <div className="flex items-center justify-center">
                      <Image
                        src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                        alt={
                          item?.media?.data?.attributes?.alternativeText ||
                          item?.title ||
                          `Feature ${index + 1}`
                        }
                        width={32}
                        height={32}
                        className="mx-auto w-10 h-10"
                      />
                    </div>
                  </div>
                )}

                {/* Text content */}
                {item?.title && (
                  <p className="text-sm md:text-base font-normal text-white px-1 2xl:px-8">
                    {item?.title}
                  </p>
                )}
                {index < (data?.facts?.length - 1) && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-[80%] w-[2px] bg-white"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
