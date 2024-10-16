import { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import Button from "./Button";
import "./Search.css";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";
import { useSelector } from "react-redux";

const SearchResult = ({ value, added, randomIndex }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [hasViewed, setHasViewed] = useState(false);

  const dateAdded = new Date(added);

  //make it so that when you view a joke you call api for that joke to get category and stuff. then add that to viewed jokes.
  const viewJoke = () => {
    setIsTruncated(!isTruncated);
    setHasViewed(true);
  };

  return (
    <div
      onClick={viewJoke}
      className={hasViewed ? "searchResult hasViewed" : "searchResult"}
    >
      {!isTruncated && <NorrisThumb chosenIndex={randomIndex} />}
      <div className="searchResultContent">
        <p>{isTruncated ? value.substring(0, 50) + "..." : value}</p>
        <div className="searchResultSubDetails">
          <p>
            added {dateAdded.getMonth() + 1}-{dateAdded.getDate()}-
            {dateAdded.getFullYear()}
          </p>
          <Button onClick={viewJoke} type="button">
            {isTruncated ? "view" : "hide"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState(null);
  const [cleanResults, setCleanResults] = useState(null);
  const [randomIndexes, setRandomIndexes] = useState([]);

  const viewedJokes = useSelector((state) => state.viewedJokes);

  useEffect(() => {
    if (searchInput.length > 2 && searchInput.length < 121) {
      //Wait for user to stop typing for 1 sec before calling api.
      const delayDebounceFn = setTimeout(() => {
        fetch(`https://api.chucknorris.io/jokes/search?query=${searchInput}`)
          .then((response) => response.json())
          .then((json) => {
            return setResults(json);
          })
          .catch((error) => console.error(error));
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }

    if (searchInput.length === 0 && results) {
      setResults(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    if (results) {
      setCleanResults(
        results.result.filter((e) => !e.categories.includes("explicit"))
      );
    }
  }, [results]);

  useEffect(() => {
    if (cleanResults && viewedJokes) {
      console.log(cleanResults);
      console.log(viewedJokes);
      setRandomIndexes(shuffledNorrisImageIndexes(cleanResults.length));
    }
  }, [cleanResults, viewedJokes]);

  return (
    <ContentWrapper title="Search">
      <div className="search">
        <div>
          <label>
            Search:{" "}
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />{" "}
            <Button
              onClick={() => setSearchInput("")}
              isDisabled={searchInput.length < 1}
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
        cleanResults.map((r, i) => {
          return (
            <SearchResult
              key={i}
              value={r.value}
              added={r.created_at}
              randomIndex={randomIndexes[i]}
            />
          );
        })}
    </ContentWrapper>
  );
};

export default Search;
