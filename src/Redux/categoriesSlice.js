import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    setCategories: (state, action) => {
      return [...new Set([...state, ...action.payload])];
    },
    clearCategories: () => {
      return [];
    },
  },
});

export const { setCategories, clearCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
