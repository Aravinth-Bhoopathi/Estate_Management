import React from "react";
import Sidebar from "./Sidebar";
import Route from "./Routes";
import "../css/main.css";

const Home = (props) => {
  return (
    <div className="main_parent">
      <div className="side_bar">
        <Sidebar />
      </div>
      <div className="content_div">
        <Route />
      </div>
    </div>
  );
};

export default Home;
