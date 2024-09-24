import { Outlet, Link } from "react-router-dom";
import AuthStatus from "./AuthStatus";

const Layout = () => {
  return (
    <div>
      <AuthStatus />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/jokes">Jokes</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

export default Layout;
