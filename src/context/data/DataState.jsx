import React, { useState } from "react";
import DataContext from "./DataContext";

const DataState = (props) => {
  const [cadets, setCadets] = useState([]);
  return (
    <DataContext.Provider value={{ cadets, setCadets }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
