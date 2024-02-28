import React from "react";
import SideBar from "../components/SideBar";
import CampMainForm from "../components/CampMainForm";
import AddCamp from "../components/AddCamp";
import { Button, Flex } from 'antd';
import { database } from "../../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const Camp = () => {

  const navigate = useNavigate();

  const toaddcamp = () => {
    // Redirect to the "camp" page
    navigate("/addcamp");
  };
  return (
    <>
      <div className="flex justify-between items-start">
        <SideBar />
        <div style={{ flex: "1", padding: "30px" ,justifyContent: "center", alignItems: "center" }}>
        {/* <Button  type="dashed" size="large"  onClick={toaddcamp}>
            Add Camp
          </Button> */}
          <AddCamp />
          <div style={{ overflowY: "auto", maxHeight: "600px" }}>
          <div style={{ display: "flex", flexDirection: "row" ,flexWrap: "wrap" }}>

          <CampMainForm />
                    
          </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Camp;
