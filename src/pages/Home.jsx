import React from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Table";

const Home = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <SideBar />
        <div className="flex py-4 px-2 flex-col justify-start gap-10">
          <h1 className="text-3xl my-2 font-semibold text-blue-600">
            NCC Cadet Management
          </h1>
          <Table className="px-2" />
        </div>
      </div>
    </>
  );
};

export default Home;
