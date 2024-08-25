import { GunType } from "../library/types";
import { SPIN_TIME_MS, TIME_TO_TAKE_GUN_MS } from "../library/constants";
import { twMerge } from "tailwind-merge";

type Props = {
  isBoxOpen: boolean;
  isBoxClosing: boolean;
  gun: GunType;
  onClick: () => void;
  className?: string;
};

export const Gun = ({
  isBoxOpen,
  isBoxClosing,
  gun,
  onClick,
  className,
}: Props) => {
  const handleClick = () => {
    if (isBoxClosing) onClick();
  };

  const transitionDuration = `${
    !isBoxOpen ? 100 : isBoxClosing ? TIME_TO_TAKE_GUN_MS : SPIN_TIME_MS
  }ms`;

  return (
    <div className="z-60 flex justify-center">
      <div
        onClick={handleClick}
        className={twMerge(
          "fixed h-0 select-none text-4xl text-shadow md:text-5xl",
          "transition-transform",
          isBoxOpen && !isBoxClosing && `-translate-y-48 ease-out`,
          (!isBoxOpen || isBoxClosing) && `-translate-y-4`,
          isBoxClosing && `cursor-pointer ease-in`,
          !isBoxOpen && "transition-none text-shadow-none",
          className,
        )}
        style={{ transitionDuration }}
      >
        {gun.name}
      </div>
    </div>
  );
};
