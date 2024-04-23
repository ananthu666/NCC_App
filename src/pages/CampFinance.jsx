  import React from "react";
  import SideBar from "../components/SideBar";
  import Financebox from "../components/Finance/Camp_Finance/FinanceCamps"

  const Finance = () => {
    return (
      <div style={styles.container} >
        <div>
        <SideBar />

        </div>
        <div style={styles.cont2}>
        <h1 style={styles.camptext}>camp Account</h1>
        <div  style={styles.finbox}>
          
          <Financebox />
        </div>
        </div>
      </div>
    );
  };

  export default Finance;

  const styles={
    finbox:{
      display: 'flex',
      flexWrap: "wrap",
       
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "50%",
      overflowY: "scroll",
    },
    container: {
      display: "flex",
      // flexDirection: "row",
      justifyContent: "left",
      
    },
    camptext:{
      
      fontSize: "2rem",
      fontWeight: "bold",
      color: "black",
      marginTop: "1rem",
      
    },
    cont2:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    }
  }