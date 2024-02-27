import React from "react";
import SideBar from "../components/SideBar";
import CampMainForm from "../components/CampMainForm";

import { database } from "../../firebase";
import { useState, useEffect } from "react";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const Camp = () => {


  return (
    <>
      <div className="flex justify-between items-start">
        <SideBar />
        <div >
           
          <button>Add Camps</button>
         
          
          
          <CampMainForm/>
        </div>
          
        
      </div>
    </>
  );
};

export default Camp;
