import React from "react";
import SideBar from "../components/SideBar";
import "../assets/styles/dashboard.css";

const DashBoard = ({ co = "John Doe" }) => {
  return (
    <div className="flex justify-around">
      <SideBar />
      <div className="flex flex-col p-4 flex-1 min-h-lvh justify-start self-center text-center items-center ">
        <div className="dashboard relative self-start rounded-xl flex-1  bg-cover bg-center bg-no-repeat w-full">
          <div className="flex flex-1 flex-col w-full font-roboto py-6 px-4  absolute top-0 left-0 ">
            <div className="">
              <h1 className="relative text-left pb-2 z-30 text-6xl  font-semibold text-white">
                1(K) NAVAL NCC UNIT
              </h1>
              <h2 className="text-white text-opacity-40 text-2xl relative text-left z-20">
                Trivandrum
              </h2>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col justify-center items-start gap-2 text-xl  py-2 px-4 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm relative my-10 text-white z-30">
                <p>Commading Officer &ensp; :&ensp; {`  ${co}`}</p>
                <p>Training Officer &ensp; :&ensp; Lt. Cdr. Sreejith</p>
              </div>
              <div className="flex flex-col justify-center items-start gap-2 text-xl  py-2 px-4 bg-white bg-opacity-10 rounded-2xl backdrop-blur-md relative my-10 text-white z-30">
                <p>Commading Officer &ensp; :&ensp; {`  ${co}`}</p>
                <p>Training Officer &ensp; :&ensp; Lt. Cdr. Sreejith</p>
              </div>
            </div>
          </div>
          <div className="gradient-overlay"></div> {/* Gradient Overlay */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
