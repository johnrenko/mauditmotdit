import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getRandomNumber, getRandomWord } from "../utils/utils";

export interface Guess {
  value: string;
  valid: boolean;
}

export interface State {
  answer: { word: string; tries: number };
  guess: { guessedWords: Guess[] };
  player: {
    name: string;
    guesses: string[];
    triesLeft: number;
    isWinner: boolean;
    isGuessing: boolean;
    hasGuessed: boolean;
  };
  tips: { values: string[]; hasGivenTip: boolean };
  liveblocks: {
    others: [];
    isStorageLoading: false;
    connection: "open";
  };
}

const initialState: State = {
  answer: { word: getRandomWord(), tries: getRandomNumber() },
  guess: { guessedWords: [] },
  player: {
    name: "",
    guesses: [],
    triesLeft: 0,
    isWinner: false,
    isGuessing: true,
    hasGuessed: false,
  },
  tips: { values: [], hasGivenTip: false },
  liveblocks: {
    others: [],
    isStorageLoading: false,
    connection: "open",
  },
};

export const slice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    newAnswer: (state) => {
      state.answer.word = getRandomWord();
      state.answer.tries = getRandomNumber();
    },
    guessAnswer: (state) => {
      state.answer.tries -= 1;
    },
    guessWord: (state, action: PayloadAction<Guess>) => {
      state.guess.guessedWords.push(action.payload);
    },
    resetGuesses: (state) => {
      state.guess.guessedWords = [];
    },
    newName: (state, action: PayloadAction<string>) => {
      state.player.name = action.payload;
    },
    updateTriesLeft: (state, action: PayloadAction<number>) => {
      state.player.triesLeft = action.payload;
    },
    hasWon: (state) => {
      state.player.isWinner = true;
    },
    isDriver: (state) => {
      state.player.isGuessing = false;
    },
    isGuesser: (state) => {
      state.player.isGuessing = true;
    },
    addUserGuess: (state, action: PayloadAction<string>) => {
      state.player.guesses.push(action.payload);
      state.player.triesLeft--;
      state.player.hasGuessed = true;
    },
    resetUser: (state) => {
      state.player.guesses = [];
      state.player.triesLeft = 0;
      state.player.isWinner = false;
      state.player.isGuessing = true;
      state.player.hasGuessed = false;
    },
    addTip: (state, action: PayloadAction<string>) => {
      state.tips.values.push(action.payload);
      state.tips.hasGivenTip = true;
    },
    resetTips: (state) => {
      state.tips.values = [];
    },
    resetGivenTip: (state) => {
      state.tips.hasGivenTip = false;
    },
  },
});

export const {
  newAnswer,
  guessAnswer,
  guessWord,
  resetGuesses,
  newName,
  updateTriesLeft,
  hasWon,
  isDriver,
  isGuesser,
  addUserGuess,
  resetUser,
  addTip,
  resetTips,
  resetGivenTip,
} = slice.actions;

export const selectAnswerWord = (state: RootState) => state.answer.word;
export const selectAnswerTries = (state: RootState) => state.answer.tries;

export const selectGuessAnswers = (state: RootState) =>
  state.guess.guessedWords;

export const selectUserName = (state: RootState) => state.player.name;
export const selectUserTries = (state: RootState) => state.player.triesLeft;
export const selectUserGuesses = (state: RootState) => state.player.guesses;
export const selectUserIsGuessing = (state: RootState) =>
  state.player.isGuessing;
export const selectUserWin = (state: RootState) => state.player.isWinner;
export const selectUserHasGuessed = (state: RootState) =>
  state.player.hasGuessed;

export const selectTipsValue = (state: RootState) => state.tips.values;
export const selectHasGivenTips = (state: RootState) => state.tips.hasGivenTip;

export default slice.reducer;
