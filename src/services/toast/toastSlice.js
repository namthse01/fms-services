import { createSlice } from "@reduxjs/toolkit";

const initState = {
  show: false,
  title: "",
  time: "",
  content: "",
  color: {
    header: "",
    body: "",
  },
};

const toastSlice = createSlice({
  name: "toast",
  initialState: initState,
  reducers: {
    setToast: (state, action) => {
      return {
        ...state,
        show: action.payload.show,
        title: action.payload.title,
        time: action.payload.time,
        content: action.payload.content,
        color: action.payload.color,
      };
    },
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
