import React from 'react';
import { Card } from 'antd';
import { database } from "../../firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

function TextExample() {
const [camps, setcamps] = useState([]);
async function getCamps(db = database) {
  const cadetsData = [];
  const querySnapshot = await getDocs(collection(db, "camp_main"));
  querySnapshot.forEach((doc) => {
    const cadet = {
      id: doc.id,
      ...doc.data(),
    };
    cadetsData.push(cadet);
  });
  return cadetsData;
}
const { Meta } = Card;
  // Sample data

  const navigate = useNavigate();
  async function fetchCamps() {
    try {
      
      const campList = await getCamps();
      setcamps(campList);
      
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const HandleCardClick = (index) => {
    console.log(`Card clicked with name: ${index}`);
    navigate(`/addcamp/${index}`);
  };
  useEffect(() => {
    
    fetchCamps();
  }, []);
  console.log(camps);
  return (
    <>
      {camps.map((item) => (
        <Card
        
          key={item.camp_name}
          hoverable
          style={{ width: "370px", border: '1px dashed grey', textAlign: 'center', margin: '1rem',boxShadow:"" }}
          onClick={() => HandleCardClick(item.camp_name)}
          
        >
          <Meta title={item.camp_name} description={item.camp_commander} />
        </Card>
       ))} 

      
    </>
  );
}

export default TextExample;
