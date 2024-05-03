import React, { FC } from "react";
import styles from "./styles.module.scss";
import DuckHunt from "../../components/Game/DuckHunt";

const DuckHantPage: FC = () => {
  return (
    <div className={styles.page}>
      <DuckHunt />
    </div>
  );
};

export default DuckHantPage;
