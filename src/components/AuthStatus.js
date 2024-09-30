import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./AuthStatus.css";

const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return (
      <div className="authContainer">
        <p className="signInStatus">You are not signed in.</p>
        <button className="authBtn" onClick={() => navigate("login")}>
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="authContainer">
      <p className="signInStatus">{auth.user.email}</p>
      <button
        className="authBtn"
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default AuthStatus;
