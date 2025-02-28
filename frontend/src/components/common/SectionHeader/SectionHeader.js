import { Typography } from "@/components/ui";

const SectionHeader = ({ title, description, header }) => {

  if (!title && !description) return null;
  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center pb-4 md:pb-8">
      {header && (
        <Typography variant="heading1">
          {header}
        </Typography>
      )}
      {title && (
        <Typography variant="title">
          {title}
        </Typography>
      )}
      {description && <Typography variant="body1">{description}</Typography>}
    </div>
  );
};

export default SectionHeader;
