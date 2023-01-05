import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Tips {
  values: string[];
}

const initialState: Tips = {
  values: [],
};

export const tipsSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {
    addTip: (state, action: PayloadAction<string>) => {
      state.values.push(action.payload);
    },
    resetTips: (state) => {
      state.values = [];
    },
  },
});

export const { addTip, resetTips } = tipsSlice.actions;

export const selectTips = (state: RootState) => state.tips;

export default tipsSlice.reducer;
