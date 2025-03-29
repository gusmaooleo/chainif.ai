import { SSEEventType, SSEEventData } from "@/types/sseevent";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type SSEState = {
  eventType: SSEEventType | null;
  eventData: SSEEventData | null;
};

const initialState: SSEState = {
  eventType: null,
  eventData: null,
};

export const sseSlice = createSlice({
  name: "sse",
  initialState,
  reducers: {
    setSSEEvent: (state, action: PayloadAction<{ type: SSEEventType | null; data: SSEEventData }>) => {
      state.eventType = action.payload.type;
      state.eventData = action.payload.data;
    },
    clearSSEEvent: (state) => {
      state.eventType = null;
      state.eventData = null;
    },
  },
});

export const { setSSEEvent, clearSSEEvent } = sseSlice.actions;
export default sseSlice.reducer;