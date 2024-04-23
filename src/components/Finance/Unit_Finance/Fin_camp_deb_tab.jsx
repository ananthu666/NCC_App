import React from "react";
import {
  Button,
  Flex,
  Table,
  Input,
  Select,
  Popconfirm,
  message,
  DatePicker,
} from "antd";
import { useState, useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { database } from "../../../../firebase";
import { doc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
function Tablegrid({ data, loading, campid }) {
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(database, "camp_debit", id));
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
      title: "Vr NO",
      dataIndex: "vrno",
      key: "vr_num",
      width: 140,
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "To Whom Paid",
      dataIndex: "towhom",
      key: "to_whom_paid",
      fixed: "left",
      width: 230,
    },
    {
      title: "On what account",
      dataIndex: "onwhataccount",
      key: "on_what_account",
      width: 200,
    },

    {
      title: "Cash",
      dataIndex: "cash",
      key: "cash",
      width: 160,
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
      width: 160,
    },
    {
      title: "TA/DA Officers/Cadets",
      dataIndex: "ta_off",
      key: "ta_da_off",
      width: 250,
    },
    {
      title: "Messing Officers",
      dataIndex: "messing_off",
      key: "messing_officers",
      width: 200,
    },
    {
      title: "Messing Cadets",
      dataIndex: "messing_cad",
      key: "messing_cadets",
      width: 200,
    },
    {
      title: "Rank pay",
      dataIndex: "rank_pay",
      key: "rank_pay",
      width: 120,
    },
    {
      title: "TA/DA Civilians",
      dataIndex: "ta_da_civil",
      key: "ta_da_civil",
      width: 120,
    },
    {
      title: "POL",
      dataIndex: "pol",
      key: "pol",
      width: 120,
    },
    {
      title: "Security Deposit",
      dataIndex: "security_depo",
      key: "security_deposit",
      width: 120,
    },
    {
      title: "Suspense",
      dataIndex: "suspense",
      key: "suspense",
      width: 120,
    },
    {
      title: "Initials of Officer",
      dataIndex: "initials_of_off",
      key: "initials_of_officer",
      width: 120,
    },
    {
      title: "Ship Modelling",
      dataIndex: "ship_modelling",
      key: "ship_modelling",
      width: 120,
    },
    {
      title: "Mode Of Payment",
      dataIndex: "mode_of_payment",
      key: "mode_of_payment",
      width: 120,
    },

    {
      title: "Delete",
      fixed: "right",
      width: 102,
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

  const onChangeFrom = (date, dateString) => {
    setFromDate(dateString);
    console.log(fromDate);
  };

  const onChangeTo = (date, dateString) => {
    setToDate(dateString);
    1;
    console.log(toDate);
  };

  return (
    <div className="flex flex-col z-0 bg-white w-full m-3 items-center py-4 rounded-lg">
      <div style={{ textAlign: "center", color: "blue", fontSize: "25px" }}>
        PAYMENTS (DEBITS)
      </div>
      <div className="flex justify-end gap-2 items-center">
        <Search
          placeholder="Input search text"
          className="self-end mr-3 py-4"
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <div className="flex justify-center items-center  gap-2 ">
          <label htmlFor="fromdate">From </label>
          <DatePicker onChange={onChangeFrom} id="fromdate" />
        </div>
        <div className="flex justify-center items-center  gap-2 ">
          <label htmlFor="todate">To </label>
          <DatePicker onChange={onChangeTo} id="todate" />
        </div>
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
          width: "83vw",
        }}
        loading={loading}
        showSizeChanger="false"
      />
    </div>
  );
}

export default Tablegrid;
