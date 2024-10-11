import React from "react";

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
    setTimeout(callback, 1500); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 1000);
  },
};

const AuthProvider = ({ children }) => {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      const userObj = JSON.parse(newUser);
      setUser(userObj);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
