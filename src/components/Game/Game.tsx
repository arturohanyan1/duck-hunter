import cn from "classnames";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useInterval } from "../../hooks/useInterval";
import Duck from "../common/Duck";
import Ground from "../common/Ground";
import Dog from "../common/Dog";
import GameHeader from "../common/GameHeader";
import { IDogData, IDuckData, IZoneSize } from "../../types/common";
import {
  changeDogData,
  changeDucksData,
  createDog,
  createDuck,
} from "../../utils/gameHelpers";
import {
  DOG_STATE_INTERVAL,
  DUCKS_STATE_INTERVAL,
  MAX_FLAYING_DUCKS_COUNT,
  NEW_DUCK_CREATE_INTERVAL,
} from "../../utils/constants";

type IProps = {
  classname?: string;
};

const DuckHunt: FC<IProps> = ({ classname }) => {
  // States
  const [ducks, setDucks] = useState<IDuckData[]>([]);
  const [dog, setDog] = useState<IDogData | null>(null);
  const [dogActionDuck, setDogActionDuck] = useState<IDuckData | null>(null);
  const [zoneSize, setZoneSize] = useState<IZoneSize>({ width: 0, height: 0 });
  const [score, setScore] = useState<number>(0);

  // Actions
  const onDuckClick = (index: number) => {
    const currentDuck = ducks[index];
    if (!["shot", "death"].includes(currentDuck.state)) {
      setScore((prev: number) => prev + 1);
    }
    currentDuck.state = "shot";
    const newDucks = [...ducks];
    newDucks.splice(index, 1, currentDuck);
    setDucks(newDucks);
  };

  // Effects
  useEffect(() => {
    const gameZone = document.getElementById("game_zone");
    if (gameZone) {
      const handleResize = () => {
        const { clientWidth, clientHeight } = gameZone;
        setZoneSize({ width: clientWidth, height: clientHeight });
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (zoneSize.width && !dog) {
      const newDog = createDog(zoneSize.width);
      setDog(newDog);
    }
  }, [zoneSize, dog]);

  // Game Intervals
  useInterval((): void => {
    if (ducks.length < MAX_FLAYING_DUCKS_COUNT && zoneSize.width) {
      const newDuck = createDuck(zoneSize.width);
      const newDucks = [...ducks];
      newDucks.push(newDuck);
      setDucks(newDucks);
    }
  }, NEW_DUCK_CREATE_INTERVAL);

  useInterval((): void => {
    if (ducks.length) {
      const curState = changeDucksData(ducks, zoneSize);
      if (curState.flyAwayDucks.length && !dogActionDuck) {
        setDogActionDuck(curState.flyAwayDucks[0]);
      }
      if (curState.huntedDucks.length && !dogActionDuck) {
        setDogActionDuck(curState.huntedDucks[0]);
      }
      setDucks(curState.visibleDucks);
    }
  }, DUCKS_STATE_INTERVAL);

  useInterval((): void => {
    if (dog && dogActionDuck) {
      const newDog = changeDogData(dog, dogActionDuck, zoneSize);
      if (newDog.state === "dog_hide") {
        setDogActionDuck(null);
      }
      setDog(newDog);
    }
  }, DOG_STATE_INTERVAL);

  return (
    <div className={cn(styles.container, classname)}>
      <GameHeader score={score} classname={styles.header} />
      <div id="game_zone" className={styles.game_zone}>
        {ducks.map((duck: IDuckData, idx: number) => (
          <Duck key={idx} data={duck} onDuckClick={() => onDuckClick(idx)} />
        ))}
        {dog && <Dog data={dog} />}
      </div>
      <Ground classname={styles.ground} />
    </div>
  );
};

export default DuckHunt;
