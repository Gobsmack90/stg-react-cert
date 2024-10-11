import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      state = [...new Set([...state, ...action.categories])];
    },
    removeCategory: (state, action) => {
      state = state.filter((cat) => action.categories.includes(cat));
    },
  },
});

export const { addCategory, removeCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
