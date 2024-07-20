import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuth: false

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
    isLoggedIn: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});
export const { setToken, logout, isLoggedIn } = authSlice.actions;
export default authSlice.reducer;
