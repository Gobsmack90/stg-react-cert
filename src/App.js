import "./App.css";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Jokes from "./components/Jokes";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import AuthProvider, { useAuth } from "./components/AuthProvider";
import Button from "./components/Button";

const Layout = () => {
  return (
    <div className="layout">
      <div className="header">
        <div className="banner">
          <img
            src="https://i.imgur.com/1mnrEnj.png"
            alt="Site Header picture."
            className="icon"
          ></img>
          <h1 className="title">Gobsmack's Chuck Norris Joke Extravaganza</h1>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>

          <Link to="/categories">Categories</Link>

          <Link to="/search">Search</Link>

          <Link to="/jokes">Jokes</Link>
        </nav>
        <AuthStatus />
      </div>

      <Outlet />

      <div className="footer">
        <nav className="nav">
          <Link to="/">Home</Link>

          <Link to="/categories">Categories</Link>

          <Link to="/search">Search</Link>

          <Link to="/jokes">Jokes</Link>
        </nav>
      </div>
    </div>
  );
};

const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <div className="authContainer">
      <p className="signInStatus">
        {auth.user ? auth.user.email : "You are not signed in."}
      </p>
      <Button
        onClick={
          auth.user
            ? () => auth.signout(() => navigate("/"))
            : () => navigate("login")
        }
        isLarge
        type="button"
      >
        {auth.user ? "Sign Out" : "Sign in"}
      </Button>
    </div>
  );
};

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
