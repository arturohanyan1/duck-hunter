import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { duckHuntImages } from "../../../configs/duckHuntImages";

type IProps = {
  classname?: string;
};

const Ground: FC<IProps> = ({ classname }) => {
  return (
    <div className={cn(styles.container, classname)}>
      <img src={duckHuntImages.tree} alt="tree" className={styles.tree} />
      <img src={duckHuntImages.ground} alt="ground" className={styles.ground} />
      <img src={duckHuntImages.bush_1} alt="bush" className={styles.bush_1} />
      <img src={duckHuntImages.bush_2} alt="bush" className={styles.bush_2} />
    </div>
  );
};

export default Ground;
