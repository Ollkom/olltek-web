import cx from "classnames";

const Section = ({ title, flip, id, grid }) => (
  <>
    <div
      className={cx("grid grid-cols-1 md:grid-cols-2 pt-4", {
        "md:gap-16": flip,
        "md:gap-28": !flip,
      })}
      id={id}
    >
      <div
        className={cx({
          "md:order-2": flip,
        })}
      >
        {title && (
          <h5 className="font-medium text-xl md:text-2xl 2xl:text-3xl text-darkGrayText">{title}</h5>
        )}
      </div>
    </div>
    {grid}
    <div className="h-[1px] bg-[#E5E5E7] my-5"></div>
  </>
);

export default Section;
