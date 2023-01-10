import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getRandomNumber, getRandomWord } from "../utils/utils";

export interface Guess {
  value: string;
  valid: boolean;
  guesser: string;
}

export interface State {
  answer: { word: string; tries: number };
  guess: { guessedWords: Guess[]; everybodyHasGuessed: boolean };
  player: {
    name: string;
    guesses: string[];
    triesLeft: number;
    isWinner: boolean;
    isGuessing: boolean;
    hasGuessed: boolean;
    status: "idle" | "ready" | "playing";
  };
  tips: { values: string[]; hasGivenTip: boolean };
  gameStatus: "waiting" | "started";
}

const initialState: State = {
  answer: { word: getRandomWord(), tries: getRandomNumber(5) },
  guess: { guessedWords: [], everybodyHasGuessed: false },
  player: {
    name: "",
    guesses: [],
    triesLeft: 0,
    isWinner: false,
    isGuessing: true,
    hasGuessed: false,
    status: "idle",
  },
  tips: { values: [], hasGivenTip: false },
  gameStatus: "waiting",
};

export const slice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    newAnswer: (state) => {
      state.answer.word = getRandomWord();
      state.answer.tries = getRandomNumber(5);
    },
    guessAnswer: (state) => {
      state.answer.tries -= 1;
    },
    guessWord: (state, action: PayloadAction<Guess>) => {
      state.guess.guessedWords.push(action.payload);
    },
    resetGuesses: (state) => {
      state.guess.guessedWords = [];
      state.guess.everybodyHasGuessed = false;
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
    setEverybodyHasGuessed: (state) => {
      state.guess.everybodyHasGuessed = true;
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
    resetHasGuessed: (state) => {
      state.player.hasGuessed = false;
    },
    resetEverybodyHasGuessed: (state) => {
      state.guess.everybodyHasGuessed = false;
    },
    startGame: (state) => {
      state.player.status = "ready";
    },
    launchGame: (state) => {
      state.gameStatus = "started";
    },
  },
});

export const {
  newAnswer,
  guessAnswer,
  guessWord,
  resetGuesses,
  setEverybodyHasGuessed,
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
  resetHasGuessed,
  resetEverybodyHasGuessed,
  startGame,
  launchGame,
} = slice.actions;

export const selectAnswerWord = (state: RootState) => state.answer.word;
export const selectAnswerTries = (state: RootState) => state.answer.tries;

export const selectGuesses = (state: RootState) => state.guess;

export const selectUser = (state: RootState) => state.player;

export const selectTipsValue = (state: RootState) => state.tips.values;
export const selectHasGivenTips = (state: RootState) => state.tips.hasGivenTip;

export const selectGameStatus = (state: RootState) => state.gameStatus;

export default slice.reducer;
