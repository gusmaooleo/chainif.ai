import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { optionsList } from "../constants/originOptions";
import { FeedbackType } from "@/types/feedback";
import { SerializableFile } from "@/types/serializable-file";

interface Origin {
  icon: string;
  value: string;
}

interface FormState {
  inputValue: string;
  fileInputValue: SerializableFile | null;
  authorValue: string;
  originValue: Origin;
  feedbackValue: FeedbackType
}

const initialState: FormState = {
  inputValue: "",
  fileInputValue: null,
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
    setFileInputValue: (state, action: PayloadAction<SerializableFile | null>) => {
      state.fileInputValue = action.payload ? {...action.payload} : null;
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
      state.fileInputValue = null;
      state.authorValue = "";
      state.feedbackValue = 'Default';
      state.originValue = optionsList.Authorial;
    },
  },
});

export const { setInputValue, setFileInputValue, setOriginValue, setFeedbackValue, setAuthorValue, clearForm } = formSlice.actions;
export default formSlice.reducer;
