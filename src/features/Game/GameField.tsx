import { FC } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { PlayerAvatar } from "../../components/PlayerAvatar";
import Bottle from "./Bottle";
import { KissCounter } from "../../components/KissCounter";

import styles from "./game.module.css";
import Timer from "../../components/Timer";
import KissAnimation from "./KissAnimation";

const GameField: FC = () => {
  const { players, activePlayerId, gameStatus } =
    useSelector((state: RootState) => state.game);
  const numberOfPlayers = players.length;

  return (
    <div className={styles.field}>
      <div className={styles.kissCounter}>
        <KissCounter />
      </div>
      <div className={styles.playersCircle}>
        {players.map((player, index) => {
          const angle = (360 / numberOfPlayers) * index;
          const radius = 40;
          const left =
            50 + radius * Math.cos((angle * Math.PI) / 180);
          const top =
            50 + radius * Math.sin((angle * Math.PI) / 180);

          const isActive = activePlayerId === player.id;

          return (
            <div
              key={player.id}
              className={styles.playerItem}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <PlayerAvatar
                avatar={player.avatar}
                active={isActive}
                kisses={player.kisses}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.bottleWrapper}>
        <Bottle />
      </div>
      <Timer />
      {gameStatus === "animation" && <KissAnimation />}
    </div>
  );
};

export default GameField;
