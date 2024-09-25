import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import "./Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function formSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email");

    auth.signin(email, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">Welcome to Chuck Norris Jokes</h1>
        <p>You must log in to view the page at {from}</p>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
          className="loginForm"
        >
          <label>
            Email:{" "}
            <input
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email.",
                },
              })}
              type="text"
            />
          </label>
          <p>{errors.email?.message}</p>
          <label>
            Password:{" "}
            <input
              {...register("password", {
                required: "Password required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/gm,
                  message:
                    "Password must contain at least 1 capital letter, 1 lower case letter, 1 number, and be between 6 and 10 characters.",
                },
              })}
              type={showPass ? "text" : "password"}
            />{" "}
            <button
              type="button"
              onClick={() => setShowPass((showPass) => !showPass)}
            >
              {showPass ? "hide" : "show"}
            </button>
          </label>
          <p>{errors.password?.message}</p>
          <button type="submit" disabled={!isDirty || !isValid}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
