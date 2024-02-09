import React from "react";
import AddCadet from "../components/AddCadet";
import SideBar from "../components/SideBar";

const CadetReg = () => {
  return (
    <div className="flex gap-10">
      <SideBar className="" />
      <div className="flex justify-center items-center">
        <AddCadet />
      </div>
    </div>
  );
};

export default CadetReg;
