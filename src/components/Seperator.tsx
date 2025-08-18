import { twMerge } from "tailwind-merge";

const Seperator = ({ className }: { className?: string }) => {
  return (
    <hr
      className={twMerge(
        "h-px mx-10 my-4 text-gray-500 bg-gray-500",
        className
      )}
    />
  );
};

export default Seperator;
