import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui";

const BottomActions = (props) => {
  const { data } = props;
  const { title, description, buttons } = data;
  return (
    <section className="px-6 md:px-0 py-10 bg-[#333] text-center md:text-left overflow-hidden">
      <div className="container-custom items-center md:flex">
        <div className="text-white pb-4 font-medium text-3xl md:pb-0 md:text-4xl md:w-[500px]">
          {title}
        </div>
        <div className="text-white pb-4 md:text-base md:w-[480px] md:pb-0">
          {description}
        </div>
        <Link href={buttons[0]?.url} className="ml-auto">
          <Button type="button" variant={buttons[0]?.type}>
            {buttons[0]?.text}
          </Button>
        </Link>
      </div>
      <div className="stars"></div>
      <div className="stars2"></div>
    </section>
  );
};

export default BottomActions;
