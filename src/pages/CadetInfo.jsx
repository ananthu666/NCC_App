import React, { useEffect } from "react";
import { useLocation } from "react-router";
import SideBar from "../components/SideBar";
import CadetForm from "../components/Cadet/CadetForm";

const CadetInfo = () => {
  const location = useLocation();
  const { cadet } = location.state || {};
  useEffect(() => {
    alert("CadetInfo", console.log(cadet));
  }, [cadet]);

  return (
    <div className="flex gap-10">
      <SideBar className="" />
      <div className="flex flex-1 justify-center items-center">
        <CadetForm data={cadet} />
      </div>
    </div>
  );
};

export default CadetInfo;
