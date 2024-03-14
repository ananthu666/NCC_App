import React from 'react';
import { Card } from 'antd';
import { database } from "../../firebase";
import {
  doc,
  collection,onSnapshot,
  getDocs,query,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

function TextExample() {
const [camps, setcamps] = useState([]);
async function getCamps(db = database) {
  try {
    

    const q = query(collection(db, "camp_main"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const campData = [];
      querySnapshot.forEach((doc) => {
        const camp = {
          id: doc.id,
          ...doc.data(),
        };

        campData.push(camp);
      });
      setcamps(campData);
    });
    return () => {
      unsubscribe();
    };
  } catch (error) {
    console.error("Error fetching cadets:", error);
    
  }
}
const { Meta } = Card;
  // Sample data

  const navigate = useNavigate();
 
  const HandleCardClick = (index) => {
    console.log(`Card clicked with name: ${index}`);
    navigate(`/campfin/${index}`);
  };
  useEffect(() => {
    
    getCamps();
  }, []);
  console.log(camps);
  return (
    <>
      {camps.map((item) => (
        <Card
        
          key={item.camp_name}
          hoverable
          style={{ width: "370px", border: '1px dashed grey', textAlign: 'center', margin: '1rem' }}
          onClick={() => HandleCardClick(item.camp_name)}
          
        >
          <Meta title={item.camp_name} description={item.camp_commander} />
        </Card>
       ))} 

      
    </>
  );
}

export default TextExample;
