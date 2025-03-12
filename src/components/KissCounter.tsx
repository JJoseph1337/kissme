import { FC } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store";

import styles from "./KissCounter.module.css";

export const KissCounter: FC = () => {
  const kissCount = useSelector(
    (state: RootState) => state.game.kissCount
  );
  return (
    <div className={styles.kissCounter}>{kissCount}</div>
  );
};
