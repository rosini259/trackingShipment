import { createSlice } from "@reduxjs/toolkit";

export const newDataSlice = createSlice({
  name: "newData",
  initialState: {
    value: {},
  },
  reducers: {
    newData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { newData } = newDataSlice.actions;
