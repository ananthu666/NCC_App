import React from "react";
import SideBar from "../components/SideBar";
import AddCampcadetForm from "../components/AddCampcadetForm";
import Camptable from "../components/CampTable";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import { database } from "../../firebase";

import { useState, useEffect } from "react";
import { doc, getDoc ,onSnapshot,collection,query, where} from "firebase/firestore";
const Home = () => {
  const { index } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [cad, setcad] = useState([]);
  

async function getCadets(db = database) {
  try {
    setLoading(true);

    const q = query(collection(db, "cadet_in_camp"), where("campid", "==", index));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cadetsData = [];
      querySnapshot.forEach((doc) => {
        const cadet = {
          id: doc.id,
          ...doc.data(),
        };

        cadetsData.push(cadet);
      });
      // console.log("realtime",cadetsData);
      // console.log("cadet",cadetsData.campid);
      setLoading(false);
      setcad(cadetsData);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  } catch (error) {
    console.error("Error fetching cadets:", error);
    setLoading(false);
  }
}

  
  
  async function getCamps(db = database) {
    // ////////////////////////////////
    const docRef = doc(db, "camp_main", index);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setdata(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    // ////////////////////////////////
    // return docSnap.data();
  }
  
  useState(() => {
    getCamps();
    
    getCadets(); 
    
    
    
  });
  
  console.log(data);
 
  // console.log(cad);
  return (
    <>
      <div className="flex justify-between items-start">
        <SideBar />
        <div style={{ display: "flex", flexDirection: "column" }}>
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
            <div>
              <Card
                title="CAMP DETAILS"
                bordered={false}
                style={{
                  width: 400,
                  height: 300,
                  margin: "20px",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  top: "10vh",
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "lightGray",
                  
                }}
              >
               <p style={{ fontSize: "18px", fontWeight: "bold" }}>
      <span style={{ marginRight: '8px', color:'brown' }}>Camp Name:</span>
      {data.camp_name}
    </p>
    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
      <span style={{ marginRight: '8px', color:'brown' }}>Camp Area:</span>
      {data.camp_area}
    </p>
    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
      <span style={{ marginRight: '8px', color:'brown' }}>Camp Commander:</span>
      {data.camp_commander}
    </p>
    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
      <span style={{ marginRight: '8px', color:'brown'}}>Camp Date:</span>
      {data.camp_date}
    </p>
    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
      <span style={{ marginRight: '8px', color:'brown' }}>ASST. Commander:</span>
      {data.camp_assistant}
    </p>
              </Card>
            </div>
            <AddCampcadetForm index={index} />
          </div>

          <div style={{ height: "20vh" }}>
            <Camptable data={cad} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
