import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import answerReducer from "../features/answer/answerSlice";
import guessReducer from "../features/guess/guessSlice";

export const store = configureStore({
  reducer: {
    answer: answerReducer,
    guess: guessReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
