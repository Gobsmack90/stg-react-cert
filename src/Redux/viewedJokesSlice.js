import { createSlice } from "@reduxjs/toolkit";

export const viewedJokesSlice = createSlice({
  name: "viewedJokes",
  initialState: [],
  reducers: {
    addViewedJoke: (state, action) => {
      return [...new Set([...state, ...action.payload])];
    },
    removeViewedJoke: (state, action) => {
      return state.filter((joke) => action.payload.includes(joke));
    },
    clearViewedJokes: () => {
      return [];
    },
  },
});

export const { addViewedJoke, removeViewedJoke, clearViewedJokes } =
  viewedJokesSlice.actions;

export default viewedJokesSlice.reducer;
