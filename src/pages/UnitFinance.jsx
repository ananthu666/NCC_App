import React, { useState } from "react";
import SideBar from "../components/SideBar";
import Financebox from "../components/Finance/FinanceCamps";
import { PlusOutlined } from "@ant-design/icons";

const Finance = () => {
  const [showInputBox, setShowInputBox] = useState(false);
  const [financeDetails, setFinanceDetails] = useState({
    title: "",
    amount: "",
    date: ""
  });

  const createbox = () => {
    setShowInputBox(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinanceDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

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
            <input
              type="text"
              name=""
              placeholder="Title"
              value={financeDetails.title}
              onChange={handleChange}
              style={styles.inputField}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={financeDetails.amount}
              onChange={handleChange}
              style={styles.inputField}
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={financeDetails.date}
              onChange={handleChange}
              style={styles.inputField}
            />
            {/* Add more fields as needed */}
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
    textAlign: "right"
  },
  inputField: {
    width: "100%",
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px"
  }
};
