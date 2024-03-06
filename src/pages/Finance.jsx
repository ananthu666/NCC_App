import React from "react";
import SideBar from "../components/SideBar";

const Finance = () => {
  return (
    <div className="flex justify-around">
      <SideBar />
      <div className="flex-1 justify-center self-center text-center items-center">
        {" "}
        Finance
      </div>
    </div>
  );
};

export default Finance;
