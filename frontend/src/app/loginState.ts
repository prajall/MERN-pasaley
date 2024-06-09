// Create slice for your loginstate
import { createSlice } from "@reduxjs/toolkit";

export interface LoggedInState {
  loginState: boolean;
}

const initialState: LoggedInState = {
  loginState: false,
};

export const counterSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    login: (state) => {
      state.loginState = true;
    },
    logout: (state) => {
      state.loginState = false;
    },
  },
});

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
