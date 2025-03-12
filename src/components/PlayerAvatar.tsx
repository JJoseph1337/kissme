import { FC } from "react";
import styles from "./PlayerAvatar.module.css";
import { getKissString } from "../utils/pluralize";

interface PlayerAvatarProps {
  avatar: string;
  active?: boolean;
  kisses: number;
}

export const PlayerAvatar: FC<PlayerAvatarProps> = ({
  avatar,
  active = false,
  kisses,
}) => (
  <div
    className={`${styles.avatarWrapper} ${
      active ? styles.active : ""
    }`}
  >
    <div
      className={styles.avatarContainer}
      style={{ backgroundImage: `url(${avatar})` }}
    />
    <div className={styles.tooltip}>
      {getKissString(kisses)}
    </div>
  </div>
);
