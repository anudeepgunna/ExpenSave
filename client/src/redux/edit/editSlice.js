import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
     },
  },
});

export const { setName } = editSlice.actions;
export default editSlice.reducer;
