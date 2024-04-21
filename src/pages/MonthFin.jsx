import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { useLocation } from "react-router";
import Finance_cred from "../components/Finance/Unit_Finance/Fin_camp_cred_tab";
import Finance_deb from "../components/Finance/Unit_Finance/Fin_camp_deb_tab";
import Finance_add_cred from "../components/Finance/Unit_Finance/Fin_camp_add_cred";
import Finance_add_deb from "../components/Finance/Unit_Finance/Fin_camp_add_deb";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { database } from "../../firebase";
import BalanceSheet from "../components/Finance/Unit_Finance/Balance_sheet";

const MonthFin = () => {
  const location = useLocation();
  const [cred_data, setCreddata] = useState([]);
  const [debit_data, setDebitdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  // console.log("month_id",month_id);
  useEffect(() => {
    const calculateBalance = () => {
      let creditTotal = 0;
      let debitTotal = 0;
      cred_data.forEach((credit) => {
        // Parse string to number
        creditTotal += parseFloat(credit.cash);
      });
      debit_data.forEach((debit) => {
        // Parse string to number
        debitTotal += parseFloat(debit.cash);
      });
      setTotalCredit(creditTotal);
      setTotalDebit(debitTotal);
    };
    calculateBalance();
  }, [cred_data, debit_data]);
  const fetch_cred = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(database, "unit_credit"),
        where("month_id", "==", month_id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const creditsData = [];
        querySnapshot.forEach((doc) => {
          const cadet = {
            id: doc.id,
            ...doc.data(),
          };

          creditsData.push(cadet);
        });
        // console.log("realtime",cadetsData);
        // console.log("cadet",cadetsData.campid);
        setLoading(false);
        setCreddata(creditsData);
      });

      // Cleanup function
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error fetching cadets:", error);
      setLoading(false);
    }
  };

  const fetch_debit = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(database, "unit_debit"),
        where("month_id", "==", month_id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const debitsData = [];
        querySnapshot.forEach((doc) => {
          const cadet = {
            id: doc.id,
            ...doc.data(),
          };

          debitsData.push(cadet);
        });
        // console.log("realtime",cadetsData);
        // console.log("cadet",cadetsData.campid);
        setLoading(false);
        setDebitdata(debitsData);
      });

      // Cleanup function
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Error fetching cadets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_cred();
    fetch_debit();
  }, []);

  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];

  const monthNameToNumber = (monthName) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames.indexOf(monthName) + 1; // Adding 1 because JavaScript months are zero-indexed
  };

  const { month: monthName, year } = location.state || {};
  const monthNumber = monthNameToNumber(monthName);
  const month_id = `${monthNumber}${year}`;
  // console.log('month',month_id);

  const [activeComponent, setActiveComponent] = useState("Finance_cred"); // State to determine which finance component to show

  // Function to toggle between finance components
  const toggleComponent = (componentName) => {
    setActiveComponent(componentName); // Set active component based on button clicked
  };

  // Function to render the active finance component
  const renderFinanceComponent = () => {
    switch (activeComponent) {
      case "Finance_cred":
        return (
          <div className="flex justify-center">
            <Finance_cred
              camp_id={month_id}
              data={cred_data}
              loading={loading}
            />
          </div>
        );
      case "Finance_deb":
        return (
          <Finance_deb
            month_id={month_id}
            data={debit_data}
            loading={loading}
          />
        );
      case "Finance_add_cred":
        return <Finance_add_cred month_id={month_id} />;
      case "Finance_add_deb":
        return <Finance_add_deb month_id={month_id} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <SideBar className="" />
      <div className="w-full ">
        <div className="w-full font-poppins self-start">
          <TopBar name={`${monthName} ${year}`} />
        </div>
        <div style={styles.btnContainer}>
          {/* Buttons to toggle between finance components */}
          <button
            onClick={() => toggleComponent("Finance_cred")}
            style={{
              ...styles.btn,
              ...(activeComponent === "Finance_cred" && styles.activeBtn),
            }}
          >
            Credit
          </button>
          <button
            onClick={() => toggleComponent("Finance_deb")}
            style={{
              ...styles.btn,
              ...(activeComponent === "Finance_deb" && styles.activeBtn),
            }}
          >
            Debit
          </button>
          <button
            onClick={() => toggleComponent("Finance_add_cred")}
            style={{
              ...styles.btn,
              ...(activeComponent === "Finance_add_cred" && styles.activeBtn),
            }}
          >
            Add Credit
          </button>
          <button
            onClick={() => toggleComponent("Finance_add_deb")}
            style={{
              ...styles.btn,
              ...(activeComponent === "Finance_add_deb" && styles.activeBtn),
            }}
          >
            Add Debit
          </button>
        </div>
        {/* Render the active finance component */}
        {renderFinanceComponent()}
        <div className="flex h-2/6 ">
          <BalanceSheet totalDebit={totalDebit} totalCredit={totalCredit} />
        </div>
      </div>
    </div>
  );
};

export default MonthFin;

const styles = {
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  btn: {
    padding: "10px 20px",
    margin: "0 10px",
    border: "2px solid transparent",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
    background: "none",
    color: "black",
    transition: "all 0.3s ease",
  },
  activeBtn: {
    borderColor: "blue",
    color: "blue",
  },
};
