import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";

import GameField from "../features/Game/GameField";

import { startCountdown } from "../features/Game/gameSlice";

import ResetButton from "../components/ResetButton";
import { table } from "../assets";
import { RootState } from "../store";

import styles from "./GamePage.module.css";

const GamePage: FC = () => {
  const dispatch = useDispatch();
  const { gameStatus } = useSelector(
    (state: RootState) => state.game
  );

  const handleStart = () => {
    dispatch(startCountdown());
  };

  return (
    <div
      className={styles.gamePage}
      style={{
        backgroundImage: `url(${table})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <GameField />
      <button
        className={styles.startButton}
        onClick={handleStart}
        disabled={
          gameStatus === "spinning" ||
          gameStatus === "animation"
        }
      >
        Крутить бутылочку
      </button>
       <ResetButton />
    </div>
  );
};

export default GamePage;
