import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { EnumRoutes } from "../../configs/routes";
import Game from "../../components/Game";

const Main: FC = () => {
  return (
    <div className={styles.container}>
      <Game />
    </div>
  );
};

export default Main;
