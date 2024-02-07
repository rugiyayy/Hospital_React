// selectedPageSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const selectedPageSlice = createSlice({
  name: "selectedPage",
  initialState: {
    page: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = selectedPageSlice.actions;

export default selectedPageSlice;
