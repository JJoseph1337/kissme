import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  player1,
  player2,
  player3,
  player4,
  player5,
  player6,
  player7,
  player8,
  player9,
  player10,
} from "../../assets";

interface Player {
  id: string;
  avatar: string;
  kisses: number;
}

export interface GameState {
  players: Player[];
  activePlayerId: string | null;
  gameStatus:
    | "idle"
    | "countdown"
    | "spinning"
    | "animation";
  kissCount: 0;
  countdown: number;
  animationPlayers: { from: string; to: string } | null;
  resetTime: number;
}

const initialState: GameState = {
  players: [
    { id: "player1", avatar: player1, kisses: 0 },
    { id: "player2", avatar: player2, kisses: 0 },
    { id: "player3", avatar: player3, kisses: 0 },
    { id: "player4", avatar: player4, kisses: 0 },
    { id: "player5", avatar: player5, kisses: 0 },
    { id: "player6", avatar: player6, kisses: 0 },
    { id: "player7", avatar: player7, kisses: 0 },
    { id: "player8", avatar: player8, kisses: 0 },
    { id: "player9", avatar: player9, kisses: 0 },
    { id: "player10", avatar: player10, kisses: 0 },
  ],
  activePlayerId: "player1",
  gameStatus: "idle",
  kissCount: 0,
  countdown: 0,
  animationPlayers: null,
  resetTime: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startCountdown(state) {
      state.gameStatus = "countdown";
      state.countdown = 3;
    },

    decrementCountdown(state) {
      if (state.countdown > 0) {
        state.countdown--;
      }
    },

    startSpin(state) {
      state.gameStatus = "spinning";
      state.countdown = 0;
    },

    endSpin(state, action: PayloadAction<string>) {
      if (
        state.activePlayerId &&
        state.activePlayerId !== action.payload
      ) {
        state.kissCount++;
        const activeIndex = state.players.findIndex(
          (player) => player.id === state.activePlayerId
        );
        const targetIndex = state.players.findIndex(
          (player) => player.id === action.payload
        );
        if (activeIndex !== -1) {
          state.players[activeIndex].kisses++;
        }
        if (targetIndex !== -1) {
          state.players[targetIndex].kisses++;
        }
        state.animationPlayers = {
          from: state.activePlayerId,
          to: action.payload,
        };
      }
      state.gameStatus = "animation";
    },

    resetAnimation(state) {
      if (state.animationPlayers) {
        state.activePlayerId = state.animationPlayers.to;
        state.animationPlayers = null;
      }

      state.gameStatus = "idle";
    },

    resetGame(state) {
      state.kissCount = 0;
      state.players.forEach((player) => {
        player.kisses = 0;
      });
      state.activePlayerId = initialState.activePlayerId;
      state.gameStatus = "idle";
      state.countdown = 0;
      state.animationPlayers = null;
      state.resetTime = Date.now();
    },
  },
});

export const {
  startCountdown,
  decrementCountdown,
  startSpin,
  endSpin,
  resetAnimation,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
