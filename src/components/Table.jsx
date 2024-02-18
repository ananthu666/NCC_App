import React from "react";
import { Button, Flex, Table, Input, Select, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

function Tablegrid({ data, loading }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCamps, setSelectedCamps] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);
  const [selectedRank, setSelectedRank] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();

  const handleEdit = (cadet) => {
    console.log("Edit", cadet);
    navigate(`/edit/${cadet.id}`, {
      state: { cadet },
    }); // Redirect to the edit page
  };

  const { Search } = Input;

  const handleDelete = (id) => {
    console.log("Deleted", id);
  };

  const applyFilters = (cadetList) => {
    if (selectedCamps.length) {
      cadetList = cadetList.filter((cadet) =>
        selectedCamps.some((camp) =>
          cadet.detailsOfCampsAttended.includes(camp)
        )
      );
    }

    if (selectedCollege.length) {
      cadetList = cadetList.filter((cadet) =>
        selectedCollege.includes(cadet.college)
      );
    }

    if (selectedRank.length) {
      cadetList = cadetList.filter((cadet) =>
        selectedRank.includes(cadet.rank)
      );
    }

    return cadetList;
  };

  const handleCampsChange = (value) => {
    setSelectedCamps(value || []);
  };

  const handleCollegeChange = (value) => {
    setSelectedCollege(value || []);
  };

  const handleRankChange = (value) => {
    setSelectedRank(value || []);
  };

  const onSearch = (value) => setSearchText(value);

  const camps = [
    { label: "IGC", value: "IGC" },
    { label: "ATC", value: "ATC" },
    { label: "LC", value: "LC" },
  ];

  const ranks = [
    { label: "POC", value: "POC" },
    { label: "NC1", value: "NC1" },
    { label: "LC", value: "LC" },
  ];

  const colleges = [
    {
      label: "College of Engineering, Tvmp",
      value: "College of Engineering, Tvpm",
    },
    {
      label: "College of Agriculture, Vellayani",
      value: "College of Agriculture, Vellayani",
    },
    {
      label: "Mar Ivanios College, Nalanchira",
      value: "Mar Ivanios College, Nalanchira",
    },
    {
      label: "St. Xavier's College, Thumba",
      value: "St. Xavier's College, Thumba",
    },
    {
      label: "Mahatma Gandhi College, Tvpm",
      value: "Mahatma Gandhi College, Tvpm",
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 140,
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Cadet Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "College",
      dataIndex: "college",
      key: "college",
      width: 230,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 220,
    },
    {
      title: "Bank Account Holder's Name",
      dataIndex: "bankAccountHoldersName",
      key: "bankAccountHoldersName",
      width: 200,
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
    },
    {
      title: "Bank Account Number",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      width: 250,
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      width: 100,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "IFSC Code",
      dataIndex: "ifscCode",
      key: "ifscCode",
      width: 130,
    },
    {
      title: "Identification Mark",
      dataIndex: "identificationMark",
      key: "identificationMark",
      width: 180,
    },
    {
      title: "Mother’s Name",
      dataIndex: "motherName",
      key: "motherName",
      width: 130,
    },
    {
      title: "Date of Enrolment",
      dataIndex: "dateOfEnrolment",
      key: "dateOfEnrolment",
      width: 130,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Father's Name",
      dataIndex: "father'sName",
      key: "father'sName",
      width: 180,
    },

    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 170,
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
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Flex justify="center" gap={"middle"}>
          <Popconfirm
            title="Edit?"
            onConfirm={() => handleEdit(record)}
            okButtonProps={{
              style: {
                backgroundColor: "blue",
                color: "white",
              },
            }}
          >
            <Button>Edit</Button>
          </Popconfirm>
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
  ];

  const filterData = () => {
    let temp = applyFilters(data);
    setFilteredData(temp);
  };

  useEffect(() => {
    filterData();
  }, [data, selectedCamps, selectedCollege, selectedRank]);

  return (
    <div className="flex flex-col z-0">
      <div className="flex justify-end gap-2 items-center">
        <Select
          onSearch={onSearch}
          onChange={handleCampsChange}
          mode="multiple"
          placeholder="Filter by Campus Attended"
          allowClear
          style={{ width: "20%" }}
          options={camps}
        />
        <Select
          onChange={handleCollegeChange}
          showSearch
          allowClear
          placeholder="Search to Select"
          optionFilterProp="children"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          style={{ width: "20%" }}
          options={colleges}
        />
        <Select
          onChange={handleRankChange}
          mode="multiple"
          placeholder="Filter by Rank"
          allowClear
          style={{ width: "20%" }}
          options={ranks}
        />
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
        columns={columns}
        dataSource={filteredData}
        scroll={{
          x: 3000,
          y: 550,
        }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 14,
          showSizeChanger: false,
        }}
        size="small"
        style={{
          width: "85vw",
        }}
        loading={loading}
        showSizeChanger="false"
      />
    </div>
  );
}

export default Tablegrid;
