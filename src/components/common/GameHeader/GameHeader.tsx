import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { duckHuntImages } from "../../../configs/duckHuntImages";

type IProps = {
  classname?: string;
  score?: number;
};

const GameHeader: FC<IProps> = ({ classname, score }) => {
  return (
    <div className={cn(styles.container, classname)}>
      <div className={styles.score}>
        <img
          src={score ? duckHuntImages.score_2 : duckHuntImages.score_1}
          alt="score"
        />
        <div className={styles.score_value}>
          <span>{score}</span>
        </div>
      </div>
      <div className={styles.username}>username</div>
    </div>
  );
};

export default GameHeader;
