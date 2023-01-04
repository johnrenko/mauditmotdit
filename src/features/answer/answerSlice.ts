import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getRandomNumber, getRandomWord } from "../../utils/utils";

export interface AnswerState {
  word: string;
  tries: number;
}

const initialState: AnswerState = {
  word: getRandomWord(),
  tries: getRandomNumber(),
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newAnswer: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.word = getRandomWord();
      state.tries = getRandomNumber();
    },
    guessAnswer: (state) => {
      state.tries -= 1;
    },
  },
});

export const { newAnswer, guessAnswer } = answerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAnswerWord = (state: RootState) => state.answer.word;
export const selectAnswerTries = (state: RootState) => state.answer.tries;

export default answerSlice.reducer;
