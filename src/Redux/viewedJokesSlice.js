import { createSlice, current } from "@reduxjs/toolkit";

export const viewedJokesSlice = createSlice({
  name: "viewedJokes",
  initialState: [],
  reducers: {
    addViewedJoke: (state, action) => {
      //Ensure duplicate jokes aren't added.
      const newNoDuplicates = current(state).filter((joke) => {
        for (let i = 0; i < action.payload.length; i++) {
          if (joke.joke.id === action.payload[i].joke.id) {
            return false;
          }
        }
        return true;
      });

      return [...newNoDuplicates, ...action.payload];
    },
    clearViewedJokes: () => {
      return [];
    },
  },
});

export const { addViewedJoke, clearViewedJokes } = viewedJokesSlice.actions;

export default viewedJokesSlice.reducer;
