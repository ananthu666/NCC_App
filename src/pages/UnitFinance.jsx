import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Financebox from "../components/Finance/FinanceCamps";
import { PlusOutlined } from "@ant-design/icons";
import {Button} from "antd";
import { database } from "../../firebase";
import { collection, setDoc, doc } from "firebase/firestore";


const Finance = () => {
  const [showInputBox, setShowInputBox] = useState(false);
  const [financeDetails, setFinanceDetails] = useState({
    month: "",
    year: ""
  });
  const uploadmonth = async() => {
    try{
      
    
    const financeRef = collection(database, "unit_fin_monthly");
    const data = {
      month: "financeDetails.month",
      year: "financeDetails.year.toString()",
    };
    const documentRef = doc(financeRef, data.year);
    await setDoc(documentRef, data);
    setDoc(financeRef, data);
    setShowInputBox(false);
  }
  catch (error) {
    console.error("Error sending data to Firestore:", error);
  }
}
  const createbox = () => {
    // toggle show input box
    setShowInputBox(!showInputBox);

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinanceDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - 2019}, (_, i) => 2020 + i);


  return (
    <div style={styles.outercont}>
      <div style={styles.container}>
        <SideBar />
      </div>
      <div style={styles.headingContainer}>
        <h1 style={styles.unittext}>Unit Account</h1>
        <div style={styles.plusIconContainer}>
          <PlusOutlined style={styles.plusIcon} onClick={createbox}/>
        </div>
        {showInputBox && (
          <div style={styles.inputBoxContainer}>
            <select
              name="month"
              value={financeDetails.month}
              onChange={handleChange}
              style={styles.selectField}
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select
              name="year"
              value={financeDetails.year}
              onChange={handleChange}
              style={styles.selectField}
            >
              <option value="">Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
            <Button style={styles.btn} onClick={uploadmonth}>create</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finance;

const styles = {
  outercont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor:"green"
  },
  headingContainer: {
    textAlign: "center",
    flexGrow: 1,
    flexDirection: "column",
  },
  unittext: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "black",
    marginTop: "1rem",
  },
  plusIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: "10px"
  },
  plusIcon: {
    fontSize: "2.5rem",
    color: "blue",
    cursor: "pointer",
  },
  inputBoxContainer: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#fff",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    // textAlign: "right"
  },
  selectField: {
    width: "100%",
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px"
  },
  btn: {
    padding: "8px",
    fontSize: "1rem",
    backgroundColor: "blue",
    color: "#fff",
    // border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    height: "100%",
    
    
  }
};
