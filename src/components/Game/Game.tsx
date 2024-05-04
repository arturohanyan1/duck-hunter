import cn from "classnames";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useInterval } from "../../hooks/useInterval";
import Duck from "../common/Duck";
import Ground from "../common/Ground";
import Dog from "../common/Dog";
import GameHeader from "../common/GameHeader";
import { IDuckDataType } from "../../types/common";
import { createDuck } from "../../utils/helpers";

type IProps = {
  classname?: string;
};

const DuckHunt: FC<IProps> = ({ classname }) => {
  // States
  const [ducks, setDucks] = useState<IDuckDataType[]>([]);
  const [gameZoneSize, setGameZoneSize] = useState({ width: 0, height: 0 });

  // Actions
  const onDuckClick = (index: number) => {
    alert(index);
  };

  // Effects
  useEffect(() => {
    const gameZone = document.getElementById("game_zone");
    if (gameZone) {
      const handleResize = () => {
        setGameZoneSize({
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

  console.log(console.log(gameZoneSize));

  useInterval((): void => {
    if (ducks.length) {
      const newDucks = ducks.map((el: IDuckDataType) => ({
        ...el,
        position: { x: el.position.x + 1, y: el.position.y + 1 },
      }));
      setDucks(newDucks);
    }
  }, 6);

  // Game Logic
  useInterval((): void => {
    if (ducks.length < 4) {
      const newDuck = createDuck(gameZoneSize.width);
      const newDucks = [...ducks];
      newDucks.push(newDuck);
      setDucks(newDucks);
    }
  }, 4000);

  return (
    <div className={cn(styles.container, classname)}>
      <GameHeader classname={styles.header} />
      <div id="game_zone" className={styles.game_zone}>
        {/* <Duck
          onDuckClick={onDuckClick}
          state="duck_death"
          position={{ x: 0, y: 300 }}
        />
        <Duck state="duck_shot" position={{ x: 40, y: 300 }} />
        <Duck
          state="duck_left"
          position={{ x: 180, y: 200 }}
          onDuckClick={onDuckClick}
        />
        <Duck state="duck_top_left" position={{ x: 160, y: 300 }} />
        <Duck state="duck_top_right" position={{ x: 200, y: 300 }} /> */}
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
