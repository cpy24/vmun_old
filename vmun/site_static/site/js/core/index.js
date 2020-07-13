import React, { useState } from "react";
import { render } from "react-dom";
import { DatePicker, message, version, Button, Alert } from "antd";
import "antd/dist/antd.css";
import Navbar from "../components/core/navbar";

const App = () => {
  const [date, setDate] = useState(null);
  const handleChange = value => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };
  return (
    <div style={{ marginRight: 100, marginLeft: 100, paddingTop: 50 }}>
      <h1>antd version: {version}</h1>
      <div
        style={{ width: 400, margin: "auto", marginTop: 50, marginBottom: 50 }}
      >
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
          <Alert
            message="Selected Date"
            description={date ? date.format("YYYY-MM-DD") : "None"}
          />
        </div>
      </div>
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </div>
  );
};

render(<Navbar />, document.querySelector("#navbar"));
render(<App />, document.getElementById("root"));
// render(<Footer />, document.getElementById("footer"));
