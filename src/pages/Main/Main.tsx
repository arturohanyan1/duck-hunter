import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { EnumRoutes } from "../../configs/routes";

const Main: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={EnumRoutes.DUCK_HUNT}>Duck Hunt</Link>
    </div>
  );
};

export default Main;
