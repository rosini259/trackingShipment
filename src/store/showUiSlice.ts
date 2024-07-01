import { createSlice } from "@reduxjs/toolkit";

export const showUiSlice = createSlice({
  name: "showUi",
  initialState: {
    value: false,
  },
  reducers: {
    showUi: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { showUi } = showUiSlice.actions;