import { configureStore } from "@reduxjs/toolkit";
import {shipmentSlice ,
  newDataSlice,
  showUiSlice,
} from "@/features/counter/shipmentSlice";

const store = configureStore({
  reducer: {
    shipmentNumber: shipmentSlice.reducer,
    showUi: showUiSlice.reducer,
    newData: newDataSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { shipmentNumber: ShipmentNumberState }
export type AppDispatch = typeof store.dispatch;
