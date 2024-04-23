import React from "react";

const BalanceSheet = ({ totalCredit, totalDebit }) => {
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
    "Ship Modeling",
  ];

  const data = [
    {
      Balance: "Total",
      Cash: 500,
      Bank: 1500,
      "TA/DA Officers/Cadets": 200,
      "Messing Officers": 100,
      "Messing Cadets": 150,
      Incidentals: 50,
      "Rank pay/Honorarium": 300,
      "TA/DA Civilians": 150,
      POL: 200,
      "Ship Modeling": 100,
    },
    {
      Balance: "Grand Total",
      Cash: 1000,
      Bank: 2500,
      "TA/DA Officers/Cadets": 400,
      "Messing Officers": 200,
      "Messing Cadets": 300,
      Incidentals: 100,
      "Rank pay/Honorarium": 600,
      "TA/DA Civilians": 300,
      POL: 400,
      "Ship Modeling": 200,
    },
    {
      Balance: "Col Total",
      Cash: 1000,
      Bank: 2500,
      "TA/DA Officers/Cadets": 400,
      "Messing Officers": 200,
      "Messing Cadets": 300,
      Incidentals: 100,
      "Rank pay/Honorarium": 600,
      "TA/DA Civilians": 300,
      POL: 400,
      "Ship Modeling": 200,
    },
    // Add more data objects here
  ];
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
