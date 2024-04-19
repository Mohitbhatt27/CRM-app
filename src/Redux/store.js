import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  devTools: true,
});
