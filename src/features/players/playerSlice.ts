import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PlayerState {
  name: string;
  guesses: string[];
  triesLeft: number;
  isWinner: boolean;
  isGuessing: boolean;
  hasGuessed: boolean;
}

const initialState: PlayerState = {
  name: "",
  guesses: [],
  triesLeft: 0,
  isWinner: false,
  isGuessing: true,
  hasGuessed: false,
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
    addUserGuess: (state, action: PayloadAction<string>) => {
      state.guesses.push(action.payload);
      state.triesLeft--;
      state.hasGuessed = true;
    },
    resetUser: (state) => {
      state.guesses = [];
      state.triesLeft = 0;
      state.isWinner = false;
      state.isGuessing = true;
      state.hasGuessed = false;
    },
  },
});

export const {
  newName,
  updateTriesLeft,
  hasWon,
  isDriver,
  isGuesser,
  addUserGuess,
  resetUser,
} = PlayerSlice.actions;

export const selectUserName = (state: RootState) => state.player.name;
export const selectUserTries = (state: RootState) => state.player.triesLeft;
export const selectUserGuesses = (state: RootState) => state.player.guesses;
export const selectUserIsGuessing = (state: RootState) =>
  state.player.isGuessing;
export const selectUserWin = (state: RootState) => state.player.isWinner;
export const selectUserHasGuessed = (state: RootState) =>
  state.player.hasGuessed;

export default PlayerSlice.reducer;
