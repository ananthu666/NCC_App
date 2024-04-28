import React, { useEffect, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { database } from "../../../../firebase";

const BalanceSheet = ({ retrievedData, grandtotal, bal }) => {
  // const [closebal, setClosebal] = useState([]);
  
  const columns = [
    "Balance",
    // "Cash",
    // "Bank",
    "TA/DA Officers/Cadets",
    "Messing Officers",
    "Messing Cadets",
    "Incidentals",
    "Rank pay/Honorarium",
    "TA/DA Civilians",
    "POL",
    "Ship Modelling",
  ];

  // useEffect(() => {
  //   const fetchClose = async () => {
  //     try {
  //       const querySnapshot = await getDocs(
  //         collection(database, "camp_in_out"),
  //         where("camp_day", "==", "Day_3")
  //       );

  //       let closedata = [];
  //       querySnapshot.forEach((doc) => {
  //         closedata.push(doc.data());
  //       });
        
  //       setClosebal(closedata);
  //     } catch (error) {
  //       console.log("Error fetching closing data:", error);
  //     }
  //   };

  //   fetchClose();
  // }, []);

  // Construct the list
  const data = [
    {
      Balance: "Opening Balance",
      ...bal["opening_balance"],
    },
    {
      Balance: "Total",
      ...retrievedData,
    },
    {
      Balance: "Grand Total",
      ...grandtotal,
    },
    {
      Balance: "Closing Balance",
      ...bal["closing_balance"],
    },
    // Add more objects to the list if needed
  ];

  return (
    <div className="flex gap-3 bg-white h-full w-full m-3 rounded-lg p-2">
      <div className="container mx-auto">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2 text-sm">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="">
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="border px-4 py-2">
                    {row[column] !== undefined ? row[column] : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceSheet;
