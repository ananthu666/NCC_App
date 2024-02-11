import React from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Table";

import { database } from "../../firebase";
import { useState, useEffect } from "react";
// import { collection, query, where, orderBy, getDocs, doc } from "firebase/firestore"
import { collection, getDocs, addDoc } from "firebase/firestore";

const Home = () => {
  const [cadets, setcadets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCadets(db = database) {
    const citiesCol = collection(db, "cadets");
    const citySnapshot = await getDocs(citiesCol);
    // const cityList = citySnapshot.docs.map(doc => doc.data());
    const cityList = citySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return cityList;
  }

  async function fetchCadets() {
    try {
      setLoading(true);
      const cadetList = await getCadets();
      setcadets(cadetList);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchCadets();
    console.log(cadets);
  }, []);

  return (
    <>
      <div className="flex justify-between items-start">
        <SideBar />
        <div className="flex justify-center items-center py-2 px-2 my-2 ">
          <Table data={cadets} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Home;
