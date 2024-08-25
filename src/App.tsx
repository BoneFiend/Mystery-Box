import { useCallback, useRef, useState } from "react";

import { Gun } from "./components/gun";
import {
  guns,
  STANDARD_COST,
  TIME_BETWEEN_SPINS_MS,
  TIME_TO_TAKE_GUN_MS,
} from "./library/constants";
import { Box } from "./components/box";
import { Lid } from "./components/lid";
import { GunType } from "./library/types";
import { chooseGun, exponentialGunCycle } from "./library/utilities";
import { twMerge } from "tailwind-merge";
import { Glow } from "./components/glow";

function App() {
  const [boxGun, setBoxGun] = useState<GunType>(guns[0]);

  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isBoxOpenable, setIsBoxOpenable] = useState(true);
  const [isBoxClosing, setIsBoxClosing] = useState(false);

  const timerRef = useRef<number | null>(null);

  const onSpin = useCallback(() => {
    if (isBoxOpen) return;

    setIsBoxOpenable(false);
    setIsBoxOpen(true);

    const previousGuns: GunType[] = [];

    exponentialGunCycle(
      () => {
        const newGun = chooseGun(guns, previousGuns);
        previousGuns.push(newGun);
        setBoxGun(newGun);
      },
      () => {
        setIsBoxClosing(true);
        timerRef.current = setTimeout(() => {
          setIsBoxClosing(false);
          setIsBoxOpen(false);

          setTimeout(() => setIsBoxOpenable(true), TIME_BETWEEN_SPINS_MS);
        }, TIME_TO_TAKE_GUN_MS);
      },
    );
  }, [isBoxOpen]);

  const onGunSelect = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsBoxOpen(false);
    setIsBoxClosing(false);

    setTimeout(() => setIsBoxOpenable(true), TIME_BETWEEN_SPINS_MS);
  };

  const hoverText =
    isBoxOpenable || !isBoxClosing
      ? `Click for Mystery Box [Cost: ${STANDARD_COST}]`
      : isBoxClosing || !isBoxOpenable
        ? `Click for ${boxGun.name}`
        : "";

  return (
    <div className="flex h-[100vh] items-center justify-center overflow-x-hidden bg-zinc-700 px-4 text-white sm:px-8">
      <div className="relative mt-[30vh] grid w-full max-w-[45rem] transition-all sm:mt-[20vh]">
        <Glow isBoxOpen={isBoxOpen} />
        <Lid
          isBoxOpenable={isBoxOpenable}
          isBoxOpen={isBoxOpen}
          isBoxClosing={isBoxClosing}
          className="peer/box"
          onClick={onSpin}
        />
        <div className="peer/gun">
          <Gun
            isBoxOpen={isBoxOpen}
            isBoxClosing={isBoxClosing}
            gun={boxGun}
            onClick={onGunSelect}
            className="peer/gun"
          />
        </div>
        <Box isBoxOpen={isBoxOpen} className="peer/box" onClick={onSpin} />
        <div
          className={twMerge(
            "pointer-events-none absolute top-8 z-30 flex w-full justify-center",
            "opacity-0 transition-opacity duration-75",
            isBoxOpenable &&
              "peer-hover/box:opacity-100 peer-active/box:opacity-100",
            isBoxClosing &&
              "peer-hover/gun:opacity-100 peer-active/gun:opacity-100",
          )}
        >
          <div className="rounded-sm bg-black/50 px-4 py-2 text-xl sm:text-4xl">
            {hoverText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
