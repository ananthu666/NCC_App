import React from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { useLocation } from "react-router";

const MonthFin = () => {
  const location = useLocation();
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];

  const { month, year } = location.state || {};
  return (
    <div className="flex  ">
      <SideBar className="" />
      <div className="w-full font-poppins self-start ">
        <TopBar name={`${month} ${year}`} />
      </div>
    </div>
  );
};

export default MonthFin;
