import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  initialState: { data: false },
  name: "theme",
  reducers: {
    toggleTheme: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
