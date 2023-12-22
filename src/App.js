import React from "react";
import PrivateRoute from "./component/PrivateRoute";
import PublicRoute from "./component/PublicRoute";
import cookie from "react-cookies";
import "./App.css";

function App() {
  const isLoggedIn = () => {
    return cookie.load("token");
  };
  console.log(isLoggedIn());

  return isLoggedIn() ? <PrivateRoute /> : <PublicRoute />;
}

export default App;
