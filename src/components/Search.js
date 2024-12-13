import { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import Button from "./Button";
import "./Search.css";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";
import { addViewedJoke } from "../Redux/viewedJokesSlice";
import { useAuth } from "./AuthProvider";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";

const SearchResult = ({
  joke,
  categories,
  added,
  randomIndex,
  hasBeenViewed,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isViewed, setIsViewed] = useState(hasBeenViewed);

  const dispatch = useAppDispatch();

  const dateAdded = new Date(added);

  //make it so that when you view a joke you call api for that joke to get category and stuff. then add that to viewed jokes.
  const viewJoke = () => {
    setIsTruncated(!isTruncated);
    if (!isViewed) {
      const viewedJokeData = {
        joke: joke,
        timestamp: Date.now(),
        categories: categories,
      };
      dispatch(addViewedJoke([viewedJokeData]));
      setIsViewed(true);
    }
  };

  return (
    <div
      onClick={viewJoke}
      className={isViewed ? "searchResult hasViewed" : "searchResult"}
      data-testid="searchedJoke"
    >
      {!isTruncated && <NorrisThumb chosenIndex={randomIndex} />}
      <div className="searchResultContent">
        <p>{isTruncated ? joke.value.substring(0, 50) + "..." : joke.value}</p>
        <div className="searchResultSubDetails">
          <div>
            {categories.length > 0 && <p>category: {categories}</p>}
            <p>
              added {dateAdded.getMonth() + 1}-{dateAdded.getDate()}-
              {dateAdded.getFullYear()}
            </p>
          </div>

          <Button onClick={viewJoke} type="button">
            {isTruncated ? "view" : "hide"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const [cleanResults, setCleanResults] = useState(null);
  const [randomIndexes, setRandomIndexes] = useState([]);

  let auth = useAuth();
  const viewedJokes = useAppSelector((state) => state.viewedJokes);

  useEffect(() => {
    if (auth.results) {
      setCleanResults(
        auth.results.result.filter((e) => !e.categories.includes("explicit"))
      );
    } else {
      setCleanResults(null);
    }
  }, [auth.results]);

  useEffect(() => {
    if (cleanResults) {
      setRandomIndexes(shuffledNorrisImageIndexes(cleanResults.length));
    }
  }, [cleanResults]);

  return (
    <ContentWrapper title="Search">
      <div className="search">
        <div>
          <label>
            Search:{" "}
            <input
              type="search"
              value={auth.searchInput}
              onChange={(e) => auth.setSearchInput(e.target.value)}
            />{" "}
            <Button
              onClick={() => auth.setSearchInput("")}
              isDisabled={auth.searchInput.length < 1}
              type="button"
            >
              Clear
            </Button>
          </label>
          <p className="searchWarn">
            Search results filter out explicit content.
          </p>
        </div>
        {cleanResults && <div>{cleanResults.length} results</div>}
      </div>
      {cleanResults &&
        viewedJokes &&
        cleanResults.map((r, i) => {
          const hasBeenViewed = viewedJokes.some((e) => e.joke.id === r.id);
          return (
            <SearchResult
              key={i}
              joke={r}
              categories={r.categories}
              added={r.created_at}
              randomIndex={randomIndexes[i]}
              hasBeenViewed={hasBeenViewed}
            />
          );
        })}
    </ContentWrapper>
  );
};

export default Search;
