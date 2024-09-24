import React from "react";

let AuthContext = React.createContext(null);

const useAuth = () => {
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
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { AuthContext, useAuth, fakeAuthProvider };
