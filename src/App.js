import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Jokes from "./components/Jokes";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import AuthProvider, { useAuth } from "./components/AuthProvider";

/*
 * Much of the auth side of this app is borrowed and modified from:
 * https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
 */
const App = () => {
  const RequireAuth = ({ children }) => {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="categories"
            element={
              <RequireAuth>
                <Categories />
              </RequireAuth>
            }
          />
          <Route
            path="search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path="jokes"
            element={
              <RequireAuth>
                <Jokes />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
