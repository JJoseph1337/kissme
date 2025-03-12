import { FC, useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";

import { endSpin } from "./gameSlice";
import { bottle } from "../../assets";
import spinSound from "../../assets/sounds/Spinning sound.mp3";
import memeSound from "../../assets/sounds/Meme sound.mp3";

import styles from "./Game.module.css";

const Bottle: FC = () => {
  const dispatch = useDispatch();
  const { gameStatus, players, activePlayerId, resetTime } =
    useSelector((state: RootState) => state.game);
  const audioRef = useRef<HTMLAudioElement>(null);
  const memeRef = useRef<HTMLAudioElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDecelerating, setIsDecelerating] =
    useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (resetTime && memeRef.current) {
      memeRef.current.play();

      setIsResetting(true);
      setRotation(0);

      const timer = setTimeout(
        () => setIsResetting(false),
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [resetTime]);

  useEffect(() => {
    if (audioRef.current) {
      if (gameStatus === "spinning") {
        audioRef.current.loop = true;
        audioRef.current.play();
      } else {
        audioRef.current.loop = false;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === "spinning") {
      audioRef.current?.play();

      setRotation((prev) => prev + 1440);

      const decelerationTimer = setTimeout(() => {
        setIsDecelerating(true);
        const eligiblePlayers = players.filter(
          (player) => player.id !== activePlayerId
        );
        const randomIndex = Math.floor(
          Math.random() * eligiblePlayers.length
        );
        const selectedPlayerId =
          eligiblePlayers[randomIndex].id;

        const targetIndex = players.findIndex(
          (player) => player.id === selectedPlayerId
        );
        const anglePerPlayer = 360 / players.length;
        const targetAngle = targetIndex * anglePerPlayer;
        const offset = 90;

        setRotation((prev) => {
          let finalRotation =
            Math.ceil(prev / 360) * 360 +
            targetAngle +
            offset;
          if (finalRotation < prev) {
            finalRotation += 360;
          }
          return finalRotation;
        });

        const finishTimer = setTimeout(() => {
          dispatch(endSpin(selectedPlayerId));
          setIsDecelerating(false);
        }, 1000);

        return () => clearTimeout(finishTimer);
      }, 3000);

      return () => clearTimeout(decelerationTimer);
    }
  }, [gameStatus, dispatch, players, activePlayerId]);

  let transitionStyle = "transform 0.5s ease-out";
  if (isResetting) {
    transitionStyle = "transform 2s ease-out";
  } else if (gameStatus === "spinning") {
    transitionStyle = isDecelerating
      ? "transform 1s ease-out"
      : "transform 3s linear";
  }

  return (
    <div
      className={styles.bottleWrapper}
      style={{
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        transition: transitionStyle,
      }}
    >
      <img
        src={bottle}
        alt="Bottle"
        className={styles.bottleImage}
      />
      <audio
        ref={audioRef}
        src={spinSound}
      />
      <audio
        ref={memeRef}
        src={memeSound}
      />
    </div>
  );
};

export default Bottle;
