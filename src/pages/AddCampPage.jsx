import React from "react";
import SideBar from "../components/SideBar";
import AddCampForm from "../components/AddCampForm";
import Camptable from "../components/CampTable";
const Home = () => {
  return (
    <>
      <div className="flex justify-between items-start">
        <SideBar />
        <div style={{display:"flex",flexDirection:"column"}}>
        <div
          style={{
            display: "flex",
            flex: "2",
            height: "50vh",
            width: "100%",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <AddCampForm />
        </div>

        <div style={{height:"50vh"}}>
          <Camptable />
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
