import { SSEEvent } from "@/types/sseevent";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SSEState = {
  eventData: SSEEvent | null;
};

const initialState: SSEState = {
  eventData: null,
};

export const sseSlice = createSlice({
  name: "sse",
  initialState,
  reducers: {
    setSSEEvent: (state, action: PayloadAction<SSEEvent>) => {
      state.eventData = action.payload;
    },
    clearSSEEvent: (state) => {
      state.eventData = null;
    },
  },
});

export const { setSSEEvent, clearSSEEvent } = sseSlice.actions;
export default sseSlice.reducer;