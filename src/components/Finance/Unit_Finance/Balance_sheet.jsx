import React from "react";

const BalanceSheet = ({ retrievedData }) => {
  const columns = [

    "Balance",
    "Cash",
    "Bank",
    "TA/DA Officers/Cadets",
    "Messing Officers",
    "Messing Cadets",
    "Incidentals",
    "Rank pay/Honorarium",
    
    "TA/DA Civilians",
    "POL",
    "Ship Modelling",
  ];

  // Function to filter data until yesterday
  const getDataUntilYesterday = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the beginning of today
    return data.filter(item => new Date(item.date) < today);
  }

  // Function to filter today's data
  const getTodayData = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the beginning of today
    return data.filter(item => new Date(item.date) >= today);
  }

  // Define the columns you want to sum
  const columnsToSum = ["cash", "bank","ta_off", "ta_da_civil", "messing_off", "messing_cad", "incidentials", "rank_pay" ,"pol", "ship_modelling"];

  // Calculate the sum of each column for data until yesterday
  const yesterdayData = getDataUntilYesterday(retrievedData);
  const yesterdaySums = {};
  columnsToSum.forEach(column => {
    yesterdaySums[column] = yesterdayData.reduce((accumulator, item) => accumulator + (parseInt(item[column]) || 0), 0);
  });

  // Calculate the sum of each column for today's data
  const todayData = getTodayData(retrievedData);
  const todaySums = {};
  columnsToSum.forEach(column => {
    todaySums[column] = todayData.reduce((accumulator, item) => accumulator + (parseInt(item[column]) || 0), 0);
  });

  // Construct the list
  const data = [
    {
      Balance: "Total",
      ...todaySums
    },
    {
      Balance: "Grand Total", // You can adjust this label as needed
      ...yesterdaySums
    },
    {
      Balance: "Col Total", // You can adjust this label as needed
      ...todaySums
    }
    // Add more objects to the list if needed
  ];

  console.log(data);
  
  return (
    <div className="flex gap-3 bg-white h-full w-full m-3 rounded-lg p-2 ">
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
                {Object.values(row).map((value, index) => (
                  <td key={index} className="border  px-4 py-2">
                    {value}
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
