import React from "react";
import { Button, Flex, Table, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";

function Tablegrid({ data, loading }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCamps, setSelectedCamps] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);
  const [selectedRank, setSelectedRank] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const { Search } = Input;

  const applyFilters = (cadetList) => {
    // Filter by campus if any campus is selected
    if (selectedCamps.length) {
      // cadetList = cadetList.filter((cadet) =>
      //   selectedCamps.includes(cadet.detailsOfCampsAttended)
      // );
      cadetList = cadetList.filter((cadet) =>
        selectedCamps.some((camp) =>
          cadet.detailsOfCampsAttended.includes(camp)
        )
      );
    }

    // Filter by college if any college is selected
    if (selectedCollege.length) {
      cadetList = cadetList.filter((cadet) =>
        selectedCollege.includes(cadet.college)
      );
    }

    // Filter by rank if any rank is selected
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
      title: "Full Name",
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
    },
    {
      title: "Date of Discharge",
      dataIndex: "dateOfDischarge",
      key: "dateOfDischarge",
    },
    {
      title: "Date of Enrolment",
      dataIndex: "dateOfEnrolment",
      key: "dateOfEnrolment",
    },
    {
      title: "Date of Passing Certificate B Exam",
      dataIndex: "dateOfPassingCertificateBExam",
      key: "dateOfPassingCertificateBExam",
      width: 150,
    },
    {
      title: "Details of Camps Attended",
      dataIndex: "detailsOfCampsAttended",
      key: "detailsOfCampsAttended",
      width: 200,
      render: (details) => details.join(", "),
    },
    {
      title: "Father's Name",
      dataIndex: "father'sName",
      key: "father'sName",
      width: 180,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.name).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.college).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.dateOfBirth)
          .toLowerCase()
          .startsWith(value.toLowerCase()) ||
        String(record.dateOfDischarge)
          .toLowerCase()
          .startsWith(value.toLowerCase()) ||
        String(record.dateOfEnrolment)
          .toLowerCase()
          .startsWith(value.toLowerCase()) ||
        String(record.dateOfPassingCertificateBExam)
          .toLowerCase()
          .startsWith(value.toLowerCase()) ||
        (record.detailsOfCampsAttended &&
          record.detailsOfCampsAttended
            .join(", ")
            .toLowerCase()
            .startsWith(value.toLowerCase())) ||
        String(record.fatherName)
          .toLowerCase()
          .startsWith(value.toLowerCase()) ||
        String(record.id).toLowerCase().startsWith(value.toLowerCase()),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: () => (
        <Flex justify="center" gap={"middle"}>
          <Button className="bg-blue-600 text-white">Edit</Button>
          <Button danger icon={<DeleteFilled />} />
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
    <div className="flex flex-col">
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
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
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
          placeholder="input search text"
          className="self-end mr-3 py-4"
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{
          x: 2000,
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
