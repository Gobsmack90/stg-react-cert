import { createSlice } from "@reduxjs/toolkit";

export const viewedJokesSlice = createSlice({
  name: "viewedJokes",
  initialState: [],
  reducers: {
    addViewedJoke: (state, action) => {
      return [...new Set([...state, ...action.jokes])];
    },
    removeViewedJoke: (state, action) => {
      return state.filter((joke) => action.jokes.includes(joke));
    },
  },
});

export const { addViewedJoke, removeViewedJoke } = viewedJokesSlice.actions;

export default viewedJokesSlice.reducer;
