import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import cookie from "react-cookies";
import swal from "sweetalert";
import "../css/login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const errors = {};

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const validate = () => {
    if (username.trim().length === 0) {
      errors.username = "username is required";
      return;
    } else if (!validator.isEmail(username)) {
      errors.username = "invalid username format";
      return;
    } else if (password.trim().length === 0) {
      errors.password = "password is required";
      return;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = validate();
    if (isvalid) {
      axios
        .post("http://3.16.194.5:8000/api/v1/auth/host/signin", {
          email: username,
          password: password,
        })
        .then((response) => {
          const result = response;
          const token = result.data.data.token;
          if (result.data.success) {
            swal(result.data.message, {
              title: "Good job!",
              icon: "success",
            });
            cookie.save("token", token);
            window.location.reload();
          } else {
            swal(result.data.message);
          }
          console.log(cookie.load("token"));
        })
        .catch((err) => {
          swal(err.message);
        });
    }
    setError(errors);
  };

  return (
    <div className="login_page">
      <h3 className="login_page_heading">Login Form</h3>
      <div className="login_form">
        <div className="login_form_container">
          <h3 className="login_form_heading">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form_container">
              <div className="form_sub_container">
                <label className="form_label">Username:</label>
                <input
                  className="form_control"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                {error.username && <span> {error.username} </span>}
              </div>
              <div className="form_sub_container">
                <label className="form_label">Password:</label>
                <input
                  className="form_control"
                  type="text"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                {error.password && <span> {error.password} </span>}
              </div>
              <div className="form_submit">
                <input className="submit" type="submit" value="Login" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
