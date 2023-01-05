import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PlayerState {
  name: string;
}

const initialState: PlayerState = {
  name: "",
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    newName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { newName } = PlayerSlice.actions;

export const selectName = (state: RootState) => state.player.name;

export default PlayerSlice.reducer;
