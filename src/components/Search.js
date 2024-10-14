import { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import Button from "./Button";
import "./Search.css";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";

const SearchResult = ({ value, added, randomIndex }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [hasViewed, setHasViewed] = useState(false);

  const dateAdded = new Date(added);

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
  const [randomIndexes, setRandomIndexes] = useState([]);

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
      console.log(results);
      setRandomIndexes(shuffledNorrisImageIndexes(results.total));
    }
  }, [results]);

  return (
    <ContentWrapper title="Search">
      <div className="search">
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
        {results && <div>{results.total} results</div>}
      </div>
      {results &&
        results.result.map((r, i) => {
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
