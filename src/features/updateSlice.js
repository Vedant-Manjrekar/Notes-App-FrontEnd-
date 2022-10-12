import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  initialState: { data: { value: false, color: "white" } },
  name: "update",
  reducers: {
    toggleUpdate: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { toggleUpdate } = updateSlice.actions;

export default updateSlice.reducer;
