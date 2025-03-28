import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { optionsList } from "../factories/dropdown-options-factory";

interface Origin {
  icon: string;
  value: string;
}

interface FormState {
  inputValue: string;
  authorValue: string;
  originValue: Origin;
}

const initialState: FormState = {
  inputValue: "",
  authorValue: "",
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
    setOriginValue: (state, action: PayloadAction<Origin>) => {
      state.originValue = action.payload;
    },
    clearForm: (state) => {
      state.inputValue = "";
      state.authorValue = "";
      state.originValue = optionsList.Authorial;
    },
  },
});

export const { setInputValue, setOriginValue, setAuthorValue, clearForm } = formSlice.actions;
export default formSlice.reducer;
