import { createClient } from "@liveblocks/client";
import { liveblocksEnhancer } from "@liveblocks/redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sliceReducer, { State } from "./slice";

const client = createClient({
  publicApiKey:
    "pk_dev_j-Jgb23UDMI8zn8Cuc_4pjAX_8-hJFXhEQF2onxZE_MhagEGMZjAuYkOllmZFCnk",
});

export const store = configureStore({
  reducer: sliceReducer,
  enhancers: [
    liveblocksEnhancer<State>({
      client,
      presenceMapping: { player: true },
      storageMapping: { answer: true, guess: true, tips: true, isDriver: true, gameStatus: true },
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
