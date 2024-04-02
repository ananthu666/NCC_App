import React from "react";
import Spreadsheet from "react-spreadsheet";

const App = () => {
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];

  return <Spreadsheet data={data} />;
};

export default App;
