import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../lib/slices/form-slice';
import sseReducer from '../lib/slices/sse-slice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    sse: sseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;