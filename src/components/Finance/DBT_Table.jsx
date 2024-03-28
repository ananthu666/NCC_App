import React, { useContext, useEffect, useState } from "react";
import { Card, Form, Input, Table } from "antd";
import DataContext from "../../context/data/DataContext";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const DBT_Table = () => {
  const context = useContext(DataContext);
  const { cadets, setCadets } = context;
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCadetsNo, setSelectedCadetsNo] = useState(0);
  const [noOfCadets, setNoOfCadets] = useState(0);
  const [selectedCadets, setSelectedCadets] = useState([]);
  const [amount, setAmount] = useState(0);

  const exportToExcel = (tableData, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    worksheet["A1"] = { v: "Sl No" };
    worksheet["B1"] = { v: "Cadet No" };

    worksheet["C1"] = { v: "CadetName" };
    worksheet["D1"] = { v: "ParentName" };
    worksheet["E1"] = { v: "NameofEducationInstitution" };
    worksheet["F1"] = { v: "BackwardDistYN" };
    worksheet["G1"] = { v: "AmountRs" };
    worksheet["H1"] = { v: "BankAccNo" };
    worksheet["I1"] = { v: "IFSCCode" };
    worksheet["J1"] = { v: "NameofDirectorate" };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, fileName + ".xlsx");
  };

  useEffect(() => {
    setSelectedCadetsNo(selectedCadets.length);
  }, [selectedCadets]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      const newSelectedCadets = selectedRows.filter((row) => {
        return !selectedCadets.some((cadet) => cadet.id === row.id);
      });

      setSelectedCadets((prevState) => [...prevState, ...newSelectedCadets]);

      console.log("selected cadets : ", selectedCadets.length);
    },
  };
  const columns = [
    {
      title: "Sl No",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 50,
    },
    {
      title: "Cadet Id",
      dataIndex: "id",
      fixed: "left",
      width: 150,
    },
    {
      title: "Cadet Name",
      dataIndex: "name",
    },

    {
      title: "Parent Name",
      dataIndex: "fatherName",
    },
    {
      title: "College Name",
      dataIndex: "college",
      width: "250",
    },
    {
      title: "BackwardDistYN",
      dataIndex: "backwardDistYN",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Bank Acc Number",
      dataIndex: "bankAccountNumber",
    },
    {
      title: "IFSC Code",
      dataIndex: "ifscCode",
    },
    {
      title: "Name of Directorate",
      dataIndex: "directorate",
    },
    {
      width: "0",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.name).toLowerCase().includes(value.toLowerCase()),
    },
  ];

  useEffect(() => {
    setData();
  }, [amount]);

  const [data, setDatas] = useState([]);

  const setData = () => {
    const data = cadets.map((cadet, index) => ({
      key: index + 1,
      id: cadet.id,
      name: cadet.name,
      fatherName: cadet["fatherName"],
      college: cadet.college,
      backwardDistYN: "No",
      amount: amount || "NULL",
      bankAccountNumber: cadet.bankAccountNumber || "NULL",
      ifscCode: cadet.ifscCode || "NULL",
      directorate: "Kerala",
    }));
    setDatas(data);
  };

  const onSearch = (value, _e, info) => {
    const filter = data.filter((cadet) =>
      cadet.college.toLowerCase().includes(value.toLowerCase())
    );
    if (value === "") {
      setFilterData([]);
    } else setFilterData(filter);
    console.log("filteredData : ", filterData);
  };

  const selectCol = [
    {
      title: "Sl No",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 80,
    },
    {
      title: "Cadet Id",
      dataIndex: "id",
      fixed: "left",
    },
    {
      title: "Cadet Name",
      dataIndex: "name",
    },
  ];
  const addCadet = () => {
    setSelectedCadets(selectedCadets);
  };

  return (
    <div className="flex  flex-col  gap-4">
      <div className="flex gap-4">
        <Card className="flex-1">
          <Form>
            <Form.Item label="No of Cadets">
              <Input
                onChange={(e) => {
                  setNoOfCadets(e.target.value);
                }}
                type="number"
              />
            </Form.Item>
            <Form.Item label="Amount allocated">
              <Input onChange={(e) => setAmount(parseInt(e.target.value))} />
            </Form.Item>
            <Form.Item label="Directorate">
              <Input />
            </Form.Item>
          </Form>
          <div className="font-bold ">Selected Cadets : {selectedCadetsNo}</div>
          <div className="font-bold ">Amount Alotted: {amount}</div>
        </Card>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex">
            <button
              onClick={() => exportToExcel(selectedCadets, "DBT_Cadets")}
              className="bg-blue-600 rounded-lg text-white w-16 mr-4"
            >
              Export
            </button>
            <Input.Search onSearch={onSearch} placeholder="Search by College" />
          </div>

          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={selectCol}
            pagination={false}
            scroll={{
              x: 10,
              y: 240,
            }}
            dataSource={filterData}
            className="flex-1  mx-2 self-center justify-center"
          />
        </div>
      </div>
      <div className="">
        <Table
          title={() => (
            <div className="font-bold text-center text-xl">
              DBT Cadet Details
            </div>
          )}
          columns={columns}
          dataSource={selectedCadets}
          scroll={{
            y: 250,
          }}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  );
};
export default DBT_Table;
