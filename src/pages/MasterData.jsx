import React, { useContext, useState } from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Cadet/Table";
import Tablex from "../components/Cadet/Tablex";
import { Button } from "antd";
import { database } from "../../firebase";
import { useEffect } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import DataContext from "../context/data/DataContext";

const Home = () => {
  // const [cadets, setCadets] = useState([]);
  const context = useContext(DataContext);
  // console.log(context);

  const { cadets, setCadets } = context;
  const [exCadets, setExCadets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState("cadets");

  useEffect(() => {
    const unsubscribeCadets = fetchCadets();
    const unsubscribeExCadets = fetchExCadets();
    return () => {
      unsubscribeCadets();
      unsubscribeExCadets();
    };
  }, []);

  const fetchCadets = () => {
    setLoading(true);
    const q = query(
      collection(database, "cadets"),
      where("ex_cadet", "==", false)
    );
    return onSnapshot(q, (querySnapshot) => {
      const cadetList = [];
      querySnapshot.forEach((doc) => {
        const cadet = {
          id: doc.id,
          ...doc.data(),
        };
        if (Array.isArray(cadet.camps)) {
          cadet.camps = cadet.camps.join(", "); // Use a comma and space as separator
        }
        cadetList.push(cadet);
      });
      setCadets(cadetList);
      setLoading(false);
    });
  };

  const fetchExCadets = () => {
    setLoading(true);
    const q = query(collection(database, "cadets"), {
      where: { ex_cadet: true },
    });
    return onSnapshot(q, (querySnapshot) => {
      const exCadetList = [];
      querySnapshot.forEach((doc) => {
        const cadet = {
          id: doc.id,
          ...doc.data(),
        };
        if (Array.isArray(cadet.camps)) {
          cadet.camps = cadet.camps.join(", "); // Use a comma and space as separator
        }
        exCadetList.push(cadet);
      });
      setExCadets(exCadetList);
      setLoading(false);
    });
  };

  const toggleTable = () => {
    setShowTable((prev) => (prev === "cadets" ? "exCadets" : "cadets"));
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <SideBar />
        <div className=" justify-center items-center py-2 px-2 my-2">
          <Button onClick={toggleTable}>Cadets/EX_Cadets</Button>
          <img
            src="/NCC.png"
            className="absolute z-5 inset-0 mx-auto my-auto h-2/5 opacity-10"
            draggable="false"
            alt=""
          />
          {showTable === "cadets" ? (
            <Table data={cadets} loading={loading} />
          ) : (
            <Tablex data={exCadets} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
