import React from "react";
import SideBar from "../components/SideBar";
import "../assets/styles/dashboard.css";

const DashBoard = () => {
  return (
    <div className="flex justify-around">
      <SideBar />
      <div className="flex flex-col  flex-1 min-h-lvh justify-start self-center text-center items-center ">
        <div className="dashboard relative self-start  flex-1  bg-cover bg-center bg-no-repeat w-full">
          <div className="font-roboto py-4 px-2  absolute top-0 left-0 mt-4 ml-4">
            <h1 className="relative text-left pb-2 z-30 text-6xl  font-semibold text-white">
              1(K) NAVAL NCC UNIT
            </h1>
            <h2 className="text-white text-opacity-40 text-2xl relative text-left z-20">
              Trivandrum
            </h2>
          </div>
          <div className="gradient-overlay"></div> {/* Gradient Overlay */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
