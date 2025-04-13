import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../slices/form-slice";
import sseReducer from "../slices/sse-slice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    sse: sseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
