import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { optionsList } from "../factories/dropdown-options-factory";
import { FeedbackType } from "@/types/feedback";

interface Origin {
  icon: string;
  value: string;
}

interface FormState {
  inputValue: string;
  authorValue: string;
  originValue: Origin;
  feedbackValue: FeedbackType
}

const initialState: FormState = {
  inputValue: "",
  authorValue: "",
  feedbackValue: 'Default',
  originValue: optionsList.Authorial,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setAuthorValue: (state, action: PayloadAction<string>) => {
      state.authorValue = action.payload;
    },
    setFeedbackValue: (state, action: PayloadAction<FeedbackType>) => {
      state.feedbackValue = action.payload;
    },
    setOriginValue: (state, action: PayloadAction<Origin>) => {
      state.originValue = action.payload;
    },
    clearForm: (state) => {
      state.inputValue = "";
      state.authorValue = "";
      state.feedbackValue = 'Default';
      state.originValue = optionsList.Authorial;
    },
  },
});

export const { setInputValue, setOriginValue, setFeedbackValue, setAuthorValue, clearForm } = formSlice.actions;
export default formSlice.reducer;
