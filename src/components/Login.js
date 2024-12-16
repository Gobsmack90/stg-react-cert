import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthProvider";
import Button from "./Button";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function formSubmit(data) {
    setIsLoading(true);
    const jsonData = JSON.stringify(data);
    auth.signin(jsonData, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  useEffect(() => {
    setIsLoading(false);
  }, [auth.user]);

  const loginBox = (
    <div className="loginBox">
      <h2 className="redirectMessage">
        Log in {from !== "/" ? " to view " + from : ""}
      </h2>

      <form
        onSubmit={handleSubmit((data) => formSubmit(data))}
        className="loginForm"
        data-testid="loginForm"
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
          <p className="error">{errors.email?.message}</p>
        </label>

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
          <Button
            onClick={() => setShowPass((showPass) => !showPass)}
            type={"button"}
          >
            {showPass ? "hide" : "show"}
          </Button>
          <p className="error">{errors.password?.message}</p>
        </label>

        <Button type="submit" isDisabled={!isDirty || !isValid} isLarge>
          Sign in
        </Button>
      </form>
    </div>
  );

  const loading = <div className="loading">...Loading</div>;

  return <div className="container">{isLoading ? loading : loginBox}</div>;
};

export default Login;
