import { SPIN_RATE_END, SPIN_RATE_START, SPIN_TIME_MS } from "./constants";
import { GunType } from "./types";

export const chooseGun = (guns: GunType[], previousGuns: GunType[]) => {
  const gunsToChoose = guns.filter((gun) => !previousGuns.includes(gun));
  return gunsToChoose[Math.floor(Math.random() * gunsToChoose.length)];
};

export const getNextTimeout = (x: number) => {
  const b = -0.8;
  const a = SPIN_RATE_START - SPIN_RATE_END;

  return a * Math.exp(b * x) + SPIN_RATE_END;
};

export const exponentialGunCycle = (
  callBack: () => void,
  onFinish: () => void,
) => {
  const internalCallback = (totalTime: number) => {
    const nextTimeout = getNextTimeout(totalTime);
    const newTotalTime = totalTime + nextTimeout;

    if (newTotalTime < SPIN_TIME_MS / 1000) {
      window.setTimeout(() => {
        internalCallback(newTotalTime);
      }, nextTimeout * 1000);
      callBack();
    } else {
      onFinish();
    }
  };

  window.setTimeout(() => {
    internalCallback(0);
  }, 0);
};
