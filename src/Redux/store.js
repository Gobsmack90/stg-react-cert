import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import viewedJokesReducer from "./viewedJokesSlice";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    viewedJokes: viewedJokesReducer,
  },
});
