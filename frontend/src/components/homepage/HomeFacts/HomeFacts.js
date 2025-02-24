import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

const HomeFacts = (props) => {
  const { data } = props;
  return (
    <div className="py-16 px-6 border-[#999999] md:py-0 md:border-r md:px-0">
      <div className="grid grid-cols-2 gap-6 items-center">
        {data?.map((item) => (
          <div key={item?.id} className="md:my-3">
            {item?.media?.data && (
              <div>
                <Image
                  src={getStrapiMedia(item?.media?.data?.attributes?.url)}
                  alt={item?.title}
                  width={item?.media?.data?.attributes?.width}
                  height={item?.media?.data?.attributes?.height}
                  className="mx-auto"
                />
              </div>
            )}
            <div className="text-center">
              <div className="mb-2">
                <span className="text-4xl md:text-5xl text-[#333333] font-extrabold">
                  {item?.text}
                </span>
              </div>
              <p className="text-base min-h-[48px] md:min-h-0 md:max-w-[150px] md:mx-auto">
                {item?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFacts;
