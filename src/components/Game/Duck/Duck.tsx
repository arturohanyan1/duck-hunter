import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";

type IProps = {
  classname?: string;
  state?:
    | "duck_left"
    | "duck_right"
    | "duck_top_left"
    | "duck_top_right"
    | "duck_shot"
    | "duck_death";
  position: { x: number; y: number };
  onDuckClick?: () => void;
};

const Duck: FC<IProps> = ({
  classname,
  state = "duck_right",
  position,
  onDuckClick,
}) => {
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
