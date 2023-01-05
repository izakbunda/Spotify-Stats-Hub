import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
