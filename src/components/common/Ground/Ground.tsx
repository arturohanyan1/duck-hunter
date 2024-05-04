import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { images } from "../../../configs/images";

type IProps = {
  classname?: string;
};

const Ground: FC<IProps> = ({ classname }) => {
  return (
    <div className={cn(styles.container, classname)}>
      <img src={images.tree} alt="tree" className={styles.tree} />
      <img src={images.ground} alt="ground" className={styles.ground} />
      <img src={images.bush_1} alt="bush" className={styles.bush_1} />
      <img src={images.bush_2} alt="bush" className={styles.bush_2} />
    </div>
  );
};

export default Ground;
