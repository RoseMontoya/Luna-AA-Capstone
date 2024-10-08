import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../../redux";
import "./LoginForm.css";
import { FrontPageAnimation } from "../../subcomponents";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // If user is logged in, navigate to home page
  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    dispatch(
      login({
        email,
        password,
      })
    )
      .then(() => {
        navigate("/");
      })
      .catch(async (res) => {
        const errs = await res.json();
        setErrors(errs.errors);
      });
  };

  // Log in as demo user
  const demoLogIn = async () => {
    setEmail("leslie.knope@pawnee.gov");
    setPassword("wafflesrule456");
    dispatch(
      login({
        email: "leslie.knope@pawnee.gov",
        password: "wafflesrule456",
      })
    )
      .then(() => {
        navigate("/");
      })
      .catch(async (res) => {
        const errs = await res.json();
        setErrors(errs.errors);
      });
  };

  return (
    <main >
      <div id="login-page">
        <h1>Log In</h1>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form onSubmit={handleSubmit} id="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className={`${errors.email ? "error" : "hidden-error"} `}>
              {errors.email}
            </p>
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password ? (
              <p className={`${errors.password ? "error" : "hidden-error"} `}>
                {errors.password}
              </p>
            ) : (
              <p className={`${errors.credentials ? "error" : "hidden-error"} `}>
                {errors.credentials}
              </p>
            )}
          </label>
          <button
            className="submit-btn"
            onClick={(e) => {
              demoLogIn(e);
            }}
            style={{ marginBottom: "1.5em" }}
          >
            Log in as demo user
          </button>
          <button className="submit-btn" type="submit">
            Log In
          </button>
        </form>
        <FrontPageAnimation />
      </div>
    </main>
  );
}

export default LoginFormPage;
