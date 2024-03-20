import React, { useContext } from "react";
import DataContext from "../context/data/DataContext";
import SideBar from "../components/SideBar";
import Table from "../components/DBT_Table";

const DBT = () => {
  const context = useContext(DataContext);
  const { cadets, setCadets } = context;
  console.log(cadets);
  return (
    <div className="flex gap-4 ">
      <SideBar className="" />
      <div className="w-full self-center  m-3">
        <Table />
      </div>
    </div>
  );
};

export default DBT;
