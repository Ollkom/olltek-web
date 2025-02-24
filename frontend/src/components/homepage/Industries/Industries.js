import { Typography, EnhancedCard } from "@/components/ui";

const Industries = (props) => {
  const { data, fontInter } = props;
  const { title, description, industries } = data;
  return (
    <section className="py-12 px-6 bg-[#F2F4F8] md:py-24 md:px-0">
      <div className="mx-auto md:max-w-[1230px] 2xl:max-w-[1440px]">
        <div className="text-center">
          <Typography variant="gradient" className="tracking-widest">
            {title}
          </Typography>
          <Typography
            variant="heading1"
            className={`md:w-[800px] 2xl:w-[1000px] mx-auto ${fontInter.className}`}
          >
            {description}
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {industries?.data.map((industry) => {
            const media = industry?.attributes?.media?.file?.data?.attributes;
            return (
              <EnhancedCard
                title={industry?.attributes?.title}
                description={industry?.attributes?.description}
                media={media}
                key={industry?.id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
