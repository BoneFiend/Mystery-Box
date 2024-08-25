import { twMerge } from "tailwind-merge";

type Props = {
  isBoxOpen: boolean;
  onClick: () => void;
  className?: string;
};

export const Box = ({ isBoxOpen, className, onClick }: Props) => {
  const handleClick = () => {
    if (!isBoxOpen) onClick();
  };

  return (
    <div
      className={twMerge(
        "relative z-20 h-32 border-x border-y border-black bg-box transition-[box-shadow] sm:h-40",
        !isBoxOpen && "cursor-pointer",
        isBoxOpen && "border-t shadow-top",
        className,
      )}
      onClick={handleClick}
    >
      <div className="sticky flex justify-center">
        {/* Lock */}
        <div className="h-6 w-4 rounded-b-md bg-lock transition-[height,width] sm:h-8 sm:w-6" />
      </div>
      <div
        className={twMerge(
          "sticky flex -translate-y-8 justify-between sm:-translate-y-10 sm:px-6 md:px-16",
          "transition-[padding,font-size,transform]",
          "text-[6rem] font-extrabold text-yellow-300 [font-family:arial] *:mx-auto *:h-min *:select-none *:drop-shadow-2xl *:text-shadow-lg sm:text-[7rem]",
        )}
      >
        <div className="">?</div>
        <div className="rotate-180">?</div>
      </div>
    </div>
  );
};
