import { useEffect, useState } from "react";
import NorrisThumb, { shuffledNorrisImageIndexes } from "./NorrisThumb";
import Button from "./Button";
import "./JokeModal.css";
import { useDispatch } from "react-redux";
import { addViewedJoke } from "../Redux/viewedJokesSlice";

const JokeModal = ({ category, setCategory }) => {
  const [joke, setJoke] = useState(null);
  const [jokeDate, setJokeDate] = useState(null);

  const dispatch = useDispatch();

  let randomIndexArr = shuffledNorrisImageIndexes(1);

  const fetchJokeByCategory = (category) => {
    fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then((response) => response.json())
      .then((json) => {
        return setJoke(json);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (category) {
      fetchJokeByCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (joke) {
      const viewedJokeData = {
        joke: joke,
        timestamp: Date.now(),
        categories: joke.categories,
      };
      dispatch(addViewedJoke([viewedJokeData]));
      setJokeDate(new Date(joke.created_at));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joke]);

  return (
    <div className="modal">
      <div className="modalHead">
        <h2>{category}</h2>
        <Button onClick={() => setCategory(null)} type="button" isLarge>
          Close
        </Button>
      </div>
      {joke && jokeDate && (
        <div className="modalContent">
          <NorrisThumb chosenIndex={randomIndexArr[0]} />
          <div className="modalText">
            <p>{joke.value}</p>
            <div className="modalSubDetails">
              <p>
                added {jokeDate.getMonth() + 1}-{jokeDate.getDate()}-
                {jokeDate.getFullYear()}
              </p>
              <Button
                onClick={() => fetchJokeByCategory(category)}
                type="button"
              >
                New Joke
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JokeModal;
