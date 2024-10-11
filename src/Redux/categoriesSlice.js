import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      return [...new Set([...state, ...action.payload])];
    },
    removeCategory: (state, action) => {
      return state.filter((cat) => action.payload.includes(cat));
    },
  },
});

export const { addCategory, removeCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
