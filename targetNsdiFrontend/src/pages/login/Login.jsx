import { useState } from "react";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "./login.css";

// import "./login.scss";

const Login = (props) => {
  let [authMode, setAuthMode] = useState("signin");
  const [user_name, setuser_name] = useState("");
  const [password, setPassword] = useState("");
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                value={user_name}
                onChange={(e) => setuser_name(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={() => {
                  props.authenticate(user_name, password);
                }}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="/">password?</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={() => {
                props.authenticate(user_name, password);
              }}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="/">password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
