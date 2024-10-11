import React from "react";
import { useDispatch } from "react-redux";
import { setCategories, clearCategories } from "../Redux/categoriesSlice";

const AuthContext = React.createContext();

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

const AuthProvider = ({ children }) => {
  let [user, setUser] = React.useState(null);
  const dispatch = useDispatch();

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
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
