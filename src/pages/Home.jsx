import React from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Table";

import { database } from "../../firebase";
import { useState, useEffect } from "react"
// import { collection, query, where, orderBy, getDocs, doc } from "firebase/firestore"
import { collection, getDocs, addDoc } from 'firebase/firestore';

const Home = () => {
  const [cadets, setcadets] = useState([]);
  const [loading,setLoading] = useState(false);
  


async function getCadets(db=database) {
  const citiesCol = collection(db, "cadets");
  const citySnapshot = await getDocs(citiesCol);
  // const cityList = citySnapshot.docs.map(doc => doc.data());
  const cityList = citySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return cityList;
}

async function fetchCadets() {
  try {
    setLoading(true);
    const cadetList = await getCadets();
    setcadets(cadetList);
    setLoading(false)
    
  } catch (error) {
    console.error('Error:', error);
  }
}

useEffect(() => {
  fetchCadets();
  console.log(cadets);
}, []);


  return (
    <>
      <div className="flex min-h-screen ">
        <SideBar />
        <div className="flex py-4 px-2 flex-col justify-start gap-10">
          <h1 className="text-3xl my-2 font-semibold text-blue-600">
            NCC Cadet Management
          </h1>
          <Table data={cadets}  loading = {loading} className="px-2" />
        </div>
      </div>
    </>
  );
};

export default Home;
