import React from "react";
import SideBar from "../components/SideBar";

const Unauthorized = () => {
  return (
    <div className="flex gap-10">
      <SideBar className="" />
      <div className="flex flex-1 justify-center items-center">
        <div className="flex justify-center items-center bg-opacity-75 bg-white h-2/5 w-2/5 rounded-xl">
          <h1 className="text-4xl font-semibold text-center">
            Unauthorized <br /> Access
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
