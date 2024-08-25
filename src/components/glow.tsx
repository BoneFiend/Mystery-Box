import { twMerge } from "tailwind-merge";

type Props = {
  isBoxOpen: boolean;
  className?: string;
};

export const Glow = ({ isBoxOpen, className }: Props) => {
  return (
    <div className={twMerge("z-60 flex justify-center", className)}>
      <div
        className={twMerge(
          "fixed blur-3xl transition-[border,transform]",
          "border-l-[170px] border-r-[170px] border-l-transparent border-r-transparent border-t-glow",
          isBoxOpen && "-translate-y-56 border-t-[375px] duration-500",
          !isBoxOpen && "translate-y-0 border-t-[0px] duration-100",
        )}
      />
    </div>
  );
};
