import cn from "classnames";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { duckHuntImages } from "../../../configs/duckHuntImages";
import Duck from "../Duck/Duck";
import Dog from "../Dog";
import { useInterval } from "../../../hooks/useInterval";

type IProps = {
  classname?: string;
};

const DuckHunt: FC<IProps> = ({ classname }) => {
  const [ducksPosition, setDucksPosition] = useState<any>({ x: 0, y: 0 });
  useInterval((): void => {
    const newPos = { x: ducksPosition.x + 1, y: ducksPosition.y + 1 };
    setDucksPosition(newPos);
  }, 6);
  return (
    <div className={cn(styles.container, classname)}>
      <img
        src={duckHuntImages.duck_hunt_tree}
        alt="tree"
        className={styles.tree_img}
      />
      <img
        src={duckHuntImages.duck_hunt_background}
        alt="background"
        className={styles.background_img}
      />
      <Duck state="duck_death" position={{ x: 0, y: 300 }} />
      <Duck state="duck_shot" position={{ x: 40, y: 300 }} />
      <Duck state="duck_left" position={{ x: 80, y: 300 }} />
      <Duck
        state="duck_right"
        position={{ x: ducksPosition.x, y: ducksPosition.y }}
      />
      <Duck state="duck_top_left" position={{ x: 160, y: 300 }} />
      <Duck state="duck_top_right" position={{ x: 200, y: 300 }} />
      <Dog state="dog_find" position={{ x: 40, y: 40 }} />
      <Dog state="dog_laugh" position={{ x: 300, y: 200 }} />
    </div>
  );
};

export default DuckHunt;
