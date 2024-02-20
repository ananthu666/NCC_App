import React from "react";
import SideBar from "../components/SideBar";

const DashBoard = () => {
  return (
    <div className="flex justify-around">
      <SideBar />
      <div className="flex-1 justify-center self-center text-center items-center">
        {" "}
        DashBoard
      </div>
    </div>
  );
};

export default DashBoard;
