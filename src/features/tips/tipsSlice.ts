import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Tips {
  values: string[];
  hasGivenTip: boolean;
}

const initialState: Tips = {
  values: [],
  hasGivenTip: false,
};

export const tipsSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {
    addTip: (state, action: PayloadAction<string>) => {
      state.values.push(action.payload);
      state.hasGivenTip = true;
    },
    resetTips: (state) => {
      state.values = [];
    },
    resetGivenTip: (state) => {
      state.hasGivenTip = false;
    },
  },
});

export const { addTip, resetTips, resetGivenTip } = tipsSlice.actions;

export const selectTipsValue = (state: RootState) => state.tips.values;
export const selectHasGivenTips = (state: RootState) => state.tips.hasGivenTip;

export default tipsSlice.reducer;
