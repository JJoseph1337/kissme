import { FC, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";
import {
  decrementCountdown,
  startSpin,
} from "../features/Game/gameSlice";

import styles from "../features/Game/Game.module.css";

const Timer: FC = () => {
  const dispatch = useDispatch();
  const { countdown, gameStatus } = useSelector(
    (state: RootState) => state.game
  );

  useEffect(() => {
    if (gameStatus === "countdown") {
      const interval = setInterval(() => {
        dispatch(decrementCountdown());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameStatus, dispatch]);

  useEffect(() => {
    if (gameStatus === "countdown" && countdown === 0) {
      dispatch(startSpin());
    }
  }, [countdown, gameStatus, dispatch]);

  if (gameStatus !== "countdown") return null;

  return <div className={styles.timer}>{countdown}</div>;
};

export default Timer;
