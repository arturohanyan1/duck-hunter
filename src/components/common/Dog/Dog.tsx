import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";

type IProps = {
  classname?: string;
  state?: "dog_find" | "dog_laugh";
  position: { x: number; y: number };
};

const Dog: FC<IProps> = ({ classname, state = "dog_find", position }) => {
  return (
    <div
      style={{ left: `${position?.x}px`, bottom: `${position?.y}px` }}
      className={cn(
        styles.dog,
        {
          [styles[`dog_state__${state}`]]: state,
        },
        classname
      )}
    ></div>
  );
};

export default Dog;
