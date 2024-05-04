import cn from "classnames";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useInterval } from "../../hooks/useInterval";
import Duck from "../common/Duck";
import Ground from "../common/Ground";
import Dog from "../common/Dog";

type IProps = {
  classname?: string;
};

const DuckHunt: FC<IProps> = ({ classname }) => {
  const [ducksPosition, setDucksPosition] = useState<any>({ x: 0, y: 0 });
  useInterval((): void => {
    const newPos = { x: ducksPosition.x + 1, y: ducksPosition.y + 1 };
    setDucksPosition(newPos);
  }, 6);

  // Actions
  const onDuckClick = () => {
    alert(5);
  };
  return (
    <div className={cn(styles.container, classname)}>
      <div className={styles.game_zone}>
        <Duck
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
        <Duck
          state="duck_right"
          position={{ x: ducksPosition.x, y: ducksPosition.y }}
        />
        <Duck state="duck_top_left" position={{ x: 160, y: 300 }} />
        <Duck state="duck_top_right" position={{ x: 200, y: 300 }} />
        <Dog state="dog_find" position={{ x: 40, y: 40 }} />
        <Dog state="dog_laugh" position={{ x: 300, y: 200 }} />
      </div>
      <Ground classname={styles.ground} />
    </div>
  );
};

export default DuckHunt;
