import React, { useState } from "react";
import { Table } from "antd";
import { Input, Space } from "antd";

function Tablegrid({data,loading}) {
  const { Search } = Input;
  const [searchText, setSearchText] = useState("");
  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "College",
      dataIndex: "college",
      key: "college",
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
    },
    {
      title: "Details of Camps Attended",
      dataIndex: "detailsOfCampsAttended",
      key: "detailsOfCampsAttended",
      render: (details) => details.join(', '), 
    },
    {
      title: "Father's Name",
      dataIndex: "father'sName",
      key: "father'sName",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.name).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.college).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.dateOfBirth).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.dateOfDischarge).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.dateOfEnrolment).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.dateOfPassingCertificateBExam).toLowerCase().startsWith(value.toLowerCase()) ||
        (record.detailsOfCampsAttended && record.detailsOfCampsAttended.join(', ').toLowerCase().startsWith(value.toLowerCase())) ||
        String(record.fatherName).toLowerCase().startsWith(value.toLowerCase()) ||
        String(record.id).toLowerCase().startsWith(value.toLowerCase())
    },
  ];

  
  const onSearch = (value) => setSearchText(value);
  return (
    <div className="flex flex-col justify-center gap-3">
      <Search
        placeholder="input search text"
        className="self-end mr-4"
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{
          x: 1300,
        }}
        pagination={{
          pageSize: 9, // Set the number of rows per page to 8
        }}
        size="middle"
      />
    </div>
  );
}

export default Tablegrid;
