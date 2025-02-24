import { MotionContainer } from "@/components/ui";
import { HomeClients, HomeFacts } from "@/components/homepage";
const Statistics = (props) => {
  const { data } = props;
  return (
    <section>
      <MotionContainer className="py-12 md:pt-20">
        {data?.description && (
          <p className="text-center text-[#202529] font-medium md:pb-16 md:text-2xl 2xl:text-3xl">
            {data?.description}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 container-custom items-center">
          <HomeFacts data={data?.facts} description={data?.description} />
          <HomeClients data={data?.clients} description={data?.description} />
        </div>
      </MotionContainer>
    </section>
  );
};

export default Statistics;
