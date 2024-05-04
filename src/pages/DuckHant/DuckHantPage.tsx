import React, { FC } from "react";
import styles from "./styles.module.scss";
import Game from "../../components/Game";

const DuckHantPage: FC = () => {
  return (
    <div className={styles.page}>
      <Game />
    </div>
  );
};

export default DuckHantPage;
