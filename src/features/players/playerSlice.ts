import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PlayerState {
  name: string;
  guesses: string[];
  triesLeft: number;
  isWinner: boolean;
  isGuessing: boolean;
}

const initialState: PlayerState = {
  name: "",
  guesses: [],
  triesLeft: 0,
  isWinner: false,
  isGuessing: true,
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    newName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateTriesLeft: (state, action: PayloadAction<number>) => {
      state.triesLeft = action.payload;
    },
    hasWon: (state) => {
      state.isWinner = true;
    },
    isDriver: (state) => {
      state.isGuessing = false;
    },
    isGuesser: (state) => {
      state.isGuessing = true;
    },
    addGuess: (state, action: PayloadAction<string>) => {
      state.guesses.push(action.payload);
      state.triesLeft--;
    },
    resetUser: (state) => {
      state.guesses = [];
      state.triesLeft = 0;
      state.isWinner = false;
      state.isGuessing = true;
    },
  },
});

export const {
  newName,
  updateTriesLeft,
  hasWon,
  isDriver,
  isGuesser,
  addGuess,
  resetUser,
} = PlayerSlice.actions;

export const selectUserName = (state: RootState) => state.player.name;
export const selectUserTries = (state: RootState) => state.player.triesLeft;
export const selectUserGuesses = (state: RootState) => state.player.guesses;
export const selectUserIsGuessing = (state: RootState) =>
  state.player.isGuessing;
export const selectUserWin = (state: RootState) => state.player.isWinner;

export default PlayerSlice.reducer;
