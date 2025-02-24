import { EnhancedCard } from "@/components/ui";
import { Sidebar, Section } from "@/components/scroll-layout";

const Grid = ({ items }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 py-10">
    {items?.map((item) => {
      const { url, title, description } = item;
      return (
        <EnhancedCard
          url={url}
          title={title}
          description={description}
          bgColor="bg-white"
          smallClamp
          key={item?.id}
        />
      );
    })}
  </div>
);

const TechProducts = ({ data }) => {
  const { title, Features, Button, description } = data;

  const menuItem = Features?.map((feature) => feature?.heading);

  return (
    <section className="bg-white">
      <div className="container-custom">
        <div className="md:flex md:space-x-4">
          <Sidebar
            title={title}
            menuItem={menuItem}
            Button={Button}
            description={description}
          />
          <div className="bg-[#F4F8FF] px-5 md:py-10 md:px-10 md:w-[80%]">
            {Features?.map((section) => (
              <Section
                key={section?.id}
                title={section?.heading}
                subtitle={section?.description}
                id={section?.heading}
                grid={<Grid items={section?.feature} />}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechProducts;
