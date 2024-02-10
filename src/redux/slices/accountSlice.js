import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    userName: null,
  }

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { token, userName } = action.payload;
      state.token = token
      state.userName = userName
      console.log("User logged in:", userName);
      console.log("token:", token);

    },
    logoutAction: (state) => {
      console.log("User logged out:", state.userName);
        return initialState
    }
  },
});

export const { loginAction, logoutAction } = accountSlice.actions;

export default accountSlice;
