import { FC, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { resetAnimation } from "./gameSlice";

import { kiss } from "../../assets";
import kissSound from "../../assets/sounds/Kiss sound.mp3";

import styles from "./Game.module.css";

const KissAnimation: FC = () => {
  const dispatch = useDispatch();
  const { animationPlayers, gameStatus, players } =
    useSelector((state: RootState) => state.game);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (gameStatus === "animation" && animationPlayers) {
      audioRef.current?.play();

      const timer = setTimeout(() => {
        dispatch(resetAnimation());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [gameStatus, animationPlayers, dispatch]);

  if (gameStatus !== "animation" || !animationPlayers)
    return null;

  const leftPlayer = players.find(
    (p) => p.id === animationPlayers.from
  );
  const rightPlayer = players.find(
    (p) => p.id === animationPlayers.to
  );
  if (!leftPlayer || !rightPlayer) return null;

  return (
    <div className={styles.kissAnimationOverlay}>
      <div
        className={`${styles.kissAvatar} ${styles.leftAvatar}`}
        style={{
          backgroundImage: `url(${leftPlayer.avatar})`,
        }}
      />
      <div
        className={`${styles.kissAvatar} ${styles.rightAvatar}`}
        style={{
          backgroundImage: `url(${rightPlayer.avatar})`,
        }}
      />
      <img
        src={kiss}
        alt="Kiss"
        className={styles.kissImage}
      />
      <audio
        ref={audioRef}
        src={kissSound}
        preload="auto"
      />
    </div>
  );
};

export default KissAnimation;
