import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { IDogData } from "../../../types/common";

type IProps = {
  classname?: string;
  data: IDogData;
};

const Dog: FC<IProps> = ({ classname, data }) => {
  return (
    <div
      style={{ left: `${data.position?.x}px`, bottom: `${data.position?.y}px` }}
      className={cn(
        styles.dog,
        {
          [styles[`dog_state__${data.state}`]]: data.state,
        },
        classname
      )}
    ></div>
  );
};

export default Dog;
