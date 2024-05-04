import cn from "classnames";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useInterval } from "../../hooks/useInterval";
import Duck from "../common/Duck";
import Ground from "../common/Ground";
import Dog from "../common/Dog";
import GameHeader from "../common/GameHeader";
import { IDuckDataType, IZoneSize } from "../../types/common";
import { changeDuckData, createDuck } from "../../utils/gameHelpers";

type IProps = {
  classname?: string;
};

const DuckHunt: FC<IProps> = ({ classname }) => {
  // States
  const [ducks, setDucks] = useState<IDuckDataType[]>([]);
  const [zoneSize, setZoneSize] = useState<IZoneSize>({ width: 0, height: 0 });

  // Actions
  const onDuckClick = (index: number) => {
    const currentDuck = ducks[index];
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
        setZoneSize({
          width: gameZone.clientWidth,
          height: gameZone.clientHeight,
        });
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Game Logic
  useInterval((): void => {
    if (ducks.length) {
      const newDucks = ducks.map((el: IDuckDataType) =>
        changeDuckData(el, zoneSize)
      );
      const filteredDucks = newDucks.filter(
        (el: IDuckDataType) => el.state !== "missed"
      );
      setDucks(filteredDucks);
    }
  }, 6);

  useInterval((): void => {
    if (ducks.length < 4) {
      const newDuck = createDuck(zoneSize.width);
      const newDucks = [...ducks];
      newDucks.push(newDuck);
      setDucks(newDucks);
    }
  }, 2000);

  return (
    <div className={cn(styles.container, classname)}>
      <GameHeader classname={styles.header} />
      <div id="game_zone" className={styles.game_zone}>
        {ducks.map((duck: IDuckDataType, idx: number) => (
          <Duck
            key={idx}
            state={duck.state}
            position={duck.position}
            onDuckClick={() => onDuckClick(idx)}
          />
        ))}
        {/* <Dog state="dog_find" position={{ x: 40, y: 40 }} /> */}
        {/* <Dog state="dog_laugh" position={{ x: 300, y: 200 }} /> */}
      </div>
      <Ground classname={styles.ground} />
    </div>
  );
};

export default DuckHunt;
