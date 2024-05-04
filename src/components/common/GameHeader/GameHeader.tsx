import cn from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";

type IProps = {
  classname?: string;
};

const GameHeader: FC<IProps> = ({ classname }) => {
  return <div className={cn(styles.container, classname)}>GameHeader</div>;
};

export default GameHeader;
