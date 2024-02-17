import React from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Table";

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

const Home = () => {
  const [cadets, setcadets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCadets(db = database) {
    const cadetsData = [];
    const querySnapshot = await getDocs(collection(db, "cadets"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    querySnapshot.forEach((doc) => {
      const cadet = {
        id: doc.id,
        ...doc.data(),
      };
      cadetsData.push(cadet);
    });
    return cadetsData;
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

  async function addCadet(db = database) {
    await setDoc(doc(db, "cadets", "UP27SDN111968"), {
      college: "College of Engineering, Tvpm",
      dateOfBirth: "04-12-2001",
      dateOfDischarge: "31-03-2024",
      dateOfEnrolment: "22-12-2021",
      dateOfPassingCertificateBExam: "27-03-2023",
      detailsOfCampsAttended: ["ATC"],
      "father'sName": "S SREEHARSHAN",
      name: "ALOK S NAIR",
      rank: "NC1",
    });
  }

  async function updateCadet(db = database) {
    try {
      const cadetDocRef = doc(db, "cadets", "KL27SDN111968");
      await updateDoc(cadetDocRef, {
        dateOfDischarge: "31-03-2024",
        rank: "Martial",
      });
      console.log("Cadet data updated successfully");
    } catch (error) {
      console.error("Error updating cadet data:", error);
    }
  }

  useEffect(() => {
    //addCadet();
    //updateCadet();
    fetchCadets();
  }, []);

  return (
    <>
      <div className="flex justify-between items-start">
        <SideBar />
        <div className="relative   flex flex-1 justify-center items-center py-2 px-2 my-2 ">
          <img
            src="/NCC.png"
            className="absolute z-5 inset-0 mx-auto my-auto h-2/5 opacity-10"
            draggable="false"
            alt=""
          />

          <Table data={cadets} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Home;
