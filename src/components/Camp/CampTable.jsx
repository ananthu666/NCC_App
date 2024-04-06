import React from "react";
import { Button, Flex, Table, Input, Select, Popconfirm, message } from "antd";
import { useState, useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { database } from "../../../firebase";
import * as XLSX from "xlsx";
import { doc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
function Tablegrid({ data, loading, campid }) {
  const [searchText, setSearchText] = useState("");
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(database, "cadet_in_camp", id));
      console.log("Document successfully deleted!");
      // not a alert just a message
      message.success("Document successfully deleted!");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();

  const { Search } = Input;
  const onSearch = (value) => setSearchText(value);

  // promoting all cadets in the camp
  const promoteall = async () => {
    const userConfirmation = window.confirm(
      "Are you sure you want to promote all?"
    );

    // If the user confirms, proceed with the action
    if (userConfirmation) {
      // Extract all id from data
      const allIds = data.map((item) => item.id);

      try {
        // Iterate over each id and update the corresponding document in the "cadets" collection
        for (const id of allIds) {
          const cadetRef = doc(database, "cadets", id);

          // Update the "regions" field of the cadet document with the specified campid
          await updateDoc(cadetRef, {
            camps: arrayUnion(campid),
          });

          console.log(`Cadet with id ${id} updated successfully.`);
          // You can add additional logic or logging if needed
        }

        console.log("All cadets updated successfully.");
      } catch (error) {
        console.error("Error updating cadets:", error.message);
        // You can add additional error handling logic here
      }
    } else {
      // If the user cancels the action
      console.log("Update canceled by the user.");
      // You can add additional logic or simply return from the function
    }
  };
  // console.log("Hello",data);
  // if data is empty wait for data to be loaded

  const columns = [
    {
      title: "Sl NO",
      dataIndex: "sln",
      key: "sln",
      width: 50,
      fixed: "left",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Cadet NO",
      dataIndex: "cadet_num",
      key: "id",
      width: 140,
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Rank",
      dataIndex: "cadet_rank",
      key: "rank",
      width: 160,
    },
    {
      title: "Cadet Name",
      dataIndex: "cadet_name",
      key: "name",
      fixed: "left",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Instituion",
      dataIndex: "cadet_insti",
      key: "college",
      width: 230,
    },
    {
      title: "Activities/Achievements",
      dataIndex: "cadet_act",
      key: "activities",
      width: 250,
    },
    {
      title: "Remarks",
      dataIndex: "cadet_rem",
      key: "remarks",
      width: 200,
    },
    {
      title: "VEG /NONVEG",
      dataIndex: "cadet_veg",
      key: "veg",
      width: 120,
    },
    {
      title: "Delete",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Flex justify="center" gap={"middle"}>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
            okButtonProps={{
              style: {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            <Button danger icon={<DeleteFilled />} />
          </Popconfirm>
        </Flex>
      ),
    },

    {
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.name).toLowerCase().includes(value.toLowerCase()) ||
        String(record.college).toLowerCase().includes(value.toLowerCase()) ||
        String(record.dateOfBirth)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.address).toLowerCase().includes(value.toLowerCase()) ||
        String(record.bankAccountHolderName)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.bloodGroup).toLowerCase().includes(value.toLowerCase()) ||
        String(record.bankAccountNumber)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.height).toLowerCase().includes(value.toLowerCase()) ||
        String(record.category).toLowerCase().includes(value.toLowerCase()) ||
        String(record.division).toLowerCase().includes(value.toLowerCase()) ||
        String(record.email).toLowerCase().includes(value.toLowerCase()) ||
        String(record.gender).toLowerCase().includes(value.toLowerCase()) ||
        String(record.ifscCode).toLowerCase().includes(value.toLowerCase()) ||
        String(record.identificationMark)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.motherName).toLowerCase().includes(value.toLowerCase()) ||
        String(record.dateOfEnrolment)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.year).toLowerCase().includes(value.toLowerCase()) ||
        String(record.fatherName).toLowerCase().includes(value.toLowerCase()) ||
        String(record.id).toLowerCase().includes(value.toLowerCase()),
      width: 0,
    },
  ];

  // Export data to excel

  const exportData = (tableData) => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    worksheet["A1"] = { v: "Sl No" };
    worksheet["B1"] = { v: "Cadet No" };

    worksheet["C1"] = { v: "Rank" };
    worksheet["D1"] = { v: "Cadet Name" };
    worksheet["E1"] = { v: "Institution" };
    worksheet["F1"] = { v: "Activites/Achievements" };
    worksheet["G1"] = { v: "Remarks" };
    worksheet["H1"] = { v: "VEG/NONVEG" };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "Camp.xlsx");
  };

  console.log(data);

  return (
    <div className="flex flex-col z-0">
      <div className="flex justify-end gap-2 items-center">
        <div className="">
          <Button
            className="bg-blue-700 text-white"
            onClick={() => exportData(data)}
          >
            Export
          </Button>
        </div>
        <div>
          <Button type="primar" onClick={promoteall}>
            Promote All
          </Button>
        </div>

        <Search
          placeholder="Input search text"
          className="self-end mr-3 py-4"
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        scroll={{
          x: 1000,
          y: 250,
        }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 14,
          showSizeChanger: false,
        }}
        size="small"
        style={{
          width: "86vw",
        }}
        loading={loading}
        showSizeChanger="false"
      />
    </div>
  );
}

export default Tablegrid;
