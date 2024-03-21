import React from "react";
import SideBar from "../components/SideBar";
import CadetForm from "../components/Cadet/CadetForm";

const CadetReg = () => {
  return (
    <div className="flex gap-10">
      <SideBar className="" />
      <div className="flex flex-1 justify-center items-center">
        <CadetForm />
      </div>
    </div>
  );
};

export default CadetReg;
