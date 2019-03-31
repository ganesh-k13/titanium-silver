import React from "react";
import ReactDOM from "react-dom";


import "./index.css";
import App from "./App";
import Navbar from "./components/layout/common/Navbar.js";
import Footer from "./components/layout/common/Footer.js";

ReactDOM.render(<Navbar />, document.getElementById("navbar"));
ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<Footer />, document.getElementById("footer"));
