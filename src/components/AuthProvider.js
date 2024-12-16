import React from "react";
import { setCategories, clearCategories } from "../Redux/categoriesSlice";
import { clearViewedJokes } from "../Redux/viewedJokesSlice";
import { useAppDispatch } from "../Redux/hooks";

const AuthContext = React.createContext();

// #React Hooks useContext
export const useAuth = () => {
  return React.useContext(AuthContext);
};

/**
 * This represents some generic auth provider API, like Firebase.
 * https://github.com/remix-run/react-router/blob/dev/examples/auth/src/auth.ts
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 1000); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 1000);
  },
};
// #React Context
const AuthProvider = ({ children }) => {
  let [user, setUser] = React.useState(null);
  //Help the Search results to persist after navigating away from search.
  let [searchInput, setSearchInput] = React.useState("");
  let [results, setResults] = React.useState(null);
  //Help the jokes sort page persist after navigating away.
  let [currentSort, setCurrentSort] = React.useState({
    active: "timestamp",
    ascending: false,
  });
  const dispatch = useAppDispatch();

  React.useEffect(() => {
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

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      const userObj = JSON.parse(newUser);
      setUser(userObj);
      fetch("https://api.chucknorris.io/jokes/categories")
        .then((response) => response.json())
        .then((json) => {
          dispatch(setCategories(json));
        })
        .catch((error) => console.error(error));
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      dispatch(clearCategories());
      dispatch(clearViewedJokes());
      setUser(null);
      callback();
    });
  };

  let value = {
    user,
    signin,
    signout,
    results,
    searchInput,
    setSearchInput,
    currentSort,
    setCurrentSort,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
