import React from "react";
import { render } from "react-dom";
import { version } from "antd";
import "antd/dist/antd.css";
import Navbar from "../components/core/navbar";

const App = () => {
  return (
    <div style={{ marginRight: 100, marginLeft: 100, paddingTop: 50 }}>
      <h1>Ant Design version: {version}</h1>
    </div>
  );
};

render(<Navbar />, document.querySelector("#navbar"));
render(<App />, document.getElementById("root"));
// render(<Footer />, document.getElementById("footer"));
