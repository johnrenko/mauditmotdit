import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import answerReducer from "../features/answer/answerSlice";
import guessReducer from "../features/guess/guessSlice";
import tipsReducer from "../features/tips/tipsSlice";

export const store = configureStore({
  reducer: {
    answer: answerReducer,
    guess: guessReducer,
    tips: tipsReducer,
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
