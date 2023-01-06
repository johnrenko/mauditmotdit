import { createClient } from "@liveblocks/client";
import { liveblocksEnhancer } from "@liveblocks/redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import answerReducer, { AnswerState } from "../features/answer/answerSlice";
import guessReducer, { GuessState } from "../features/guess/guessSlice";
import tipsReducer, { TipsState } from "../features/tips/tipsSlice";
import playerReducer, { PlayerState } from "../features/players/playerSlice";

const client = createClient({
  publicApiKey:
    "pk_dev_j-Jgb23UDMI8zn8Cuc_4pjAX_8-hJFXhEQF2onxZE_MhagEGMZjAuYkOllmZFCnk",
});

type State = {
  answer: AnswerState;
  guess: GuessState;
  tips: TipsState;
  player: PlayerState;
};

export const store = configureStore({
  reducer: {
    answer: answerReducer,
    guess: guessReducer,
    tips: tipsReducer,
    player: playerReducer,
  },
  enhancers: [
    liveblocksEnhancer<State>({
      client,
      presenceMapping: { player: true },
      storageMapping: { answer: true, guess: true, tips: true },
    }),
  ],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
