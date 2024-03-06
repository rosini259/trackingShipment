import { createSlice } from "@reduxjs/toolkit";

export const shipmentSlice = createSlice({
  name: "shipmentNumber",
  initialState: {
    value: 0,
  },
  reducers: {
    shipmentNumber: (state, action) => {
      state.value = action.payload;
    },
  },
});
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

export const { shipmentNumber } = shipmentSlice.actions;
export const { showUi } = showUiSlice.actions;
export const { newData } = newDataSlice.actions;
