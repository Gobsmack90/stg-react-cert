import { useDispatch, useSelector } from "react-redux";
import ContentWrapper from "./ContentWrapper";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import "./Jokes.css";
import Button from "./Button";
import { clearViewedJokes, removeViewedJoke } from "../Redux/viewedJokesSlice";

const Jokes = () => {
  const [sortedJokes, setSortedJokes] = useState(null);

  let auth = useAuth();
  const dispatch = useDispatch();

  const viewedJokes = useSelector((state) => state.viewedJokes);

  const setSort = (column, isAsc) => {
    return auth.setCurrentSort({
      active: column,
      ascending: isAsc,
    });
  };

  useEffect(() => {
    if (viewedJokes && auth.currentSort.active === "timestamp") {
      auth.currentSort.ascending
        ? setSortedJokes(
            viewedJokes.toSorted((a, b) => a.timestamp - b.timestamp)
          )
        : setSortedJokes(
            viewedJokes.toSorted((a, b) => b.timestamp - a.timestamp)
          );
    } else if (viewedJokes && auth.currentSort.active === "category") {
      setSortedJokes(
        viewedJokes.toSorted((a, b) => {
          if (
            (a.categories.length < 1 && b.categories.length > 0) ||
            a.categories[0] < b.categories[0]
          ) {
            return auth.currentSort.ascending ? -1 : 1;
          }
          if (
            (a.categories.length > 0 && b.categories.length < 1) ||
            a.categories[0] > b.categories[0]
          ) {
            return auth.currentSort.ascending ? 1 : -1;
          }
          return 0;
        })
      );
    }
  }, [auth.currentSort, viewedJokes]);

  return (
    <ContentWrapper title="Jokes">
      <div className="headings">
        <div
          className="timestamp clickable"
          onClick={() =>
            setSort(
              "timestamp",
              auth.currentSort.active === "timestamp"
                ? !auth.currentSort.ascending
                : true
            )
          }
        >
          {auth.currentSort.active === "timestamp"
            ? auth.currentSort.ascending
              ? "Date Viewed ↑"
              : "Date Viewed ↓"
            : "Date Viewed"}
        </div>
        <div
          className="category clickable"
          onClick={() =>
            setSort(
              "category",
              auth.currentSort.active === "category"
                ? !auth.currentSort.ascending
                : true
            )
          }
        >
          {auth.currentSort.active === "category"
            ? auth.currentSort.ascending
              ? "Category ↑"
              : "Category ↓"
            : "Category"}
        </div>
        <div className="value">Joke</div>
        <div className="remove">
          <Button onClick={() => dispatch(clearViewedJokes())} type="button">
            Clear
          </Button>
        </div>
      </div>
      {sortedJokes &&
        sortedJokes.map((joke, i) => {
          const dateViewed = new Date(joke.timestamp);
          const timeString = `${
            dateViewed.getHours() > 12
              ? dateViewed.getHours() - 12
              : dateViewed.getHours()
          }:${dateViewed.getMinutes()}:${dateViewed.getSeconds()} ${
            dateViewed.getHours() > 12 ? "PM" : "AM"
          }`;
          return (
            <div className="row" key={i}>
              <p className="timestamp">
                {timeString}
                <br />
                {dateViewed.getMonth() + 1}-{dateViewed.getDate()}-
                {dateViewed.getFullYear()}
              </p>
              <div className="category">{joke.categories}</div>
              <div className="value">{joke.joke.value}</div>
              <div className="remove">
                <Button
                  onClick={() => dispatch(removeViewedJoke(joke))}
                  type="button"
                >
                  X
                </Button>
              </div>
            </div>
          );
        })}
    </ContentWrapper>
  );
};

export default Jokes;
