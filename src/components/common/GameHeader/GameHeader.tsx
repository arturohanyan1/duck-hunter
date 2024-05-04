import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { images } from "../../../configs/images";

type IProps = {
  classname?: string;
  score?: number;
};

const GameHeader: FC<IProps> = ({ classname, score }) => {
  return (
    <div className={cn(styles.container, classname)}>
      <div className={styles.score}>
        <img src={score ? images.score_2 : images.score_1} alt="score" />
        <div className={styles.score_value}>
          <span>{score}</span>
        </div>
      </div>
      <div className={styles.username}>player</div>
    </div>
  );
};

export default GameHeader;
