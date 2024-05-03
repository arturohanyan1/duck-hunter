import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { duckHuntImages } from "../../../configs/duckHuntImages";

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
    </div>
  );
};

export default DuckHunt;
