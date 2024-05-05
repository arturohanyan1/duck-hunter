import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import { IDuckData } from "../../../types/common";
import { DUCK_SIZE } from "../../../utils/constants";

type IProps = {
  classname?: string;
  data: IDuckData;
  onDuckClick?: () => void;
};

const Duck: FC<IProps> = ({ classname, data, onDuckClick }) => {
  return (
    <div
      onClick={onDuckClick}
      style={{
        height: `${DUCK_SIZE}px`,
        width: `${DUCK_SIZE}px`,
        left: `${data.position?.x}px`,
        bottom: `${data.position?.y}px`,
      }}
      className={cn(
        styles.duck,
        {
          [styles[`duck_state__${data.state}`]]: data.state,
        },
        classname
      )}
    ></div>
  );
};

export default Duck;
