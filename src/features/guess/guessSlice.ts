import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Guess {
  value: string;
  valid: boolean;
}

export interface GuessState {
  guessedWords: Guess[];
}

const initialState: GuessState = {
  guessedWords: [],
};

export const guessSlice = createSlice({
  name: "guess",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    guessWord: (state, action: PayloadAction<Guess>) => {
      state.guessedWords.push(action.payload);
    },
    resetGuesses: (state) => {
      state.guessedWords = [];
    },
  },
});

export const { guessWord, resetGuesses } = guessSlice.actions;

export const selectGuessAnswers = (state: RootState) => state.guess.guessedWords;

export default guessSlice.reducer;
