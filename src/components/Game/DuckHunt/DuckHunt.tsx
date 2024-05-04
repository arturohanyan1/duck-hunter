import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { duckHuntImages } from "../../../configs/duckHuntImages";
import Duck from "../Duck/Duck";

type IProps = {
  classname?: string;
};

const DuckHunt: FC<IProps> = ({ classname }) => {
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
      <Duck state="duck_right" position={{ x: 120, y: 300 }} />
      <Duck state="duck_top_left" position={{ x: 160, y: 300 }} />
      <Duck state="duck_top_right" position={{ x: 200, y: 300 }} />
    </div>
  );
};

export default DuckHunt;
