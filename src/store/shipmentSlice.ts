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

export const { shipmentNumber } = shipmentSlice.actions;
