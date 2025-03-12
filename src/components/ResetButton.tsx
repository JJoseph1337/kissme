import { FC } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../features/Game/gameSlice";
import styles from "./resetButton.module.css";

const ResetButton: FC = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <button
      className={styles.resetButton}
      onClick={handleReset}
    >
      Сброс игры
    </button>
  );
};

export default ResetButton;
