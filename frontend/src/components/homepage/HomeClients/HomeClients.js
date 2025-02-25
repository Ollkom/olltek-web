import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

const HomeClients = (props) => {
  const { data } = props;
  return (
    <div className="md:px-20">
      <div className="grid grid-cols-3 items-center">
        {data?.map((item) => (
          <div key={item?.id} className="my-6 px-7 md:px-8">
            <Image
              src={getStrapiMedia(item?.media?.data?.attributes?.url)}
              alt={item?.title || "Client Image"}
              width={item?.media?.data?.attributes?.width}
              height={item?.media?.data?.attributes?.height}
              className="mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeClients;
