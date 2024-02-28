import React from "react";
import { Button, Flex, Table, Input, Select, Popconfirm} from "antd";
import { useState, useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";

function Tablegrid({ data, loading }) {
  const [searchText, setSearchText] = useState("");
  


  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();

  const { Search } = Input;
  const onSearch = (value) => setSearchText(value);

  

 

  
  const columns = [
    {
      title: "Cadet NO",
      dataIndex: "id",
      key: "id",
      width: 140,
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 160,
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
      title: "Instituion",
      dataIndex: "college",
      key: "college",
      width: 230,
    },
    {
      title: "Activities/Achievements",
      dataIndex: "activities",
      key: "activities",
      width: 250,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: 200,
    },
    {
      title: "VEG /NONVEG",
      dataIndex: "veg",
      key: "veg",
      width: 120,
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
    }
    
  ];

 

  

  return (
    <div className="flex flex-col z-0">
      

      

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
            </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
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
          width: "85vw",
        }}
        loading={loading}
        showSizeChanger="false"
      />
    </div>
  );
}

export default Tablegrid;
