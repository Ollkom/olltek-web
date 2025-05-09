import { Typography } from "@/components/ui";

const SectionHeader = ({ title, description, header }) => {

  if (!title && !description && !header) return null;
  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center pb-4 md:pb-8">
      {header && (
        <h3 className="text-lightBlue font-semibold text-sm">
          {header}
        </h3>
      )}
      {title && (
        <h2 className="inline-block text-darkGrayText font-medium text-2xl md:text-3xl">
          {title}
        </h2>
      )}
      {description && <p className="font-normal text-sm md:text-lg tracking-normal text-lightGrayText">{description}</p>}
    </div>
  );
};

export default SectionHeader;
