import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";

type IProps = {
  classname?: string;
  state:
    | "left"
    | "right"
    | "top_left"
    | "top_right"
    | "bottom-left"
    | "bottom-right"
    | "shot"
    | "death";
  position: { x: number; y: number };
  onDuckClick?: () => void;
};

const Duck: FC<IProps> = ({ classname, state, position, onDuckClick }) => {
  return (
    <div
      onClick={onDuckClick}
      style={{ left: `${position?.x}px`, bottom: `${position?.y}px` }}
      className={cn(
        styles.duck,
        {
          [styles[`duck_state__${state}`]]: state,
        },
        classname
      )}
    ></div>
  );
};

export default Duck;
