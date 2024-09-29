import { Outlet, Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import "./Layout.css";

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

export default Layout;
