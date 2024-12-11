import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import viewedJokesReducer from "./viewedJokesSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  categories: categoriesReducer,
  viewedJokes: viewedJokesReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
