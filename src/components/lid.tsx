import { TIME_TO_TAKE_GUN_MS } from "../library/constants";
import { twMerge } from "tailwind-merge";

type Props = {
  isBoxOpenable: boolean;
  isBoxOpen: boolean;
  isBoxClosing: boolean;
  onClick: () => void;
  className?: string;
};

export const Lid = ({
  isBoxOpenable,
  isBoxOpen,
  isBoxClosing,
  className,
  onClick,
}: Props) => {
  const handleClick = () => {
    if (!isBoxOpen) onClick();
  };

  const transitionDuration = `${
    !isBoxOpen ? 100 : isBoxClosing ? TIME_TO_TAKE_GUN_MS : 500
  }ms`;

  return (
    <div
      className={twMerge(
        "relative z-20 flex h-4 border border-black bg-box",
        "transition-transform",
        isBoxOpenable && "cursor-pointer",
        isBoxOpen && !isBoxClosing && "-translate-y-72 ease-out",
        (!isBoxOpen || isBoxClosing) && `translate-y-0.5`,
        isBoxClosing && `ease-in`,
        !isBoxOpen && `transition-none`,
        className,
      )}
      style={{ transitionDuration }}
      onClick={handleClick}
    >
      <div className="sticky flex w-full justify-center">
        <div className="h-full w-4 bg-lock transition-[width] sm:w-6" />
      </div>
    </div>
  );
};
