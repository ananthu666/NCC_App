import React from "react";
import { Table } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
    sorter: true,
  },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
  },
  {
    title: "Column 2",
    dataIndex: "address",
    key: "2",
  },
  {
    title: "Column 3",
    dataIndex: "address",
    key: "3",
  },
  {
    title: "Column 4",
    dataIndex: "address",
    key: "4",
  },
  {
    title: "Column 5",
    dataIndex: "address",
    key: "5",
  },
  {
    title: "Column 6",
    dataIndex: "address",
    key: "6",
  },
  {
    title: "Column 7",
    dataIndex: "address",
    key: "7",
  },
  {
    title: "Column 8",
    dataIndex: "address",
    key: "8",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park",
  },
  {
    key: "3",
    name: "Anna Smith",
    age: 28,
    address: "Paris Street",
  },
  {
    key: "4",
    name: "Emily Jones",
    age: 35,
    address: "Berlin Avenue",
  },
  {
    key: "5",
    name: "Michael Johnson",
    age: 45,
    address: "Sydney Boulevard",
  },
  {
    key: "6",
    name: "Sophia Williams",
    age: 30,
    address: "Tokyo Lane",
  },
  {
    key: "7",
    name: "David Lee",
    age: 50,
    address: "Seoul Road",
  },
  {
    key: "8",
    name: "Emma Brown",
    age: 29,
    address: "Rome Square",
  },
  {
    key: "9",
    name: "Daniel Wilson",
    age: 38,
    address: "Moscow Place",
  },
  {
    key: "10",
    name: "Olivia Taylor",
    age: 42,
    address: "Madrid Court",
  },
  {
    key: "11",
    name: "Liam Martinez",
    age: 27,
    address: "Beijing Street",
  },
  {
    key: "12",
    name: "Ava Anderson",
    age: 33,
    address: "Rio de Janeiro Avenue",
  },
  {
    key: "13",
    name: "Noah Hernandez",
    age: 48,
    address: "Toronto Lane",
  },
  {
    key: "14",
    name: "Isabella Gonzalez",
    age: 31,
    address: "Hong Kong Road",
  },
  {
    key: "15",
    name: "Mason Rodriguez",
    age: 37,
    address: "Bangkok Boulevard",
  },
  {
    key: "16",
    name: "Sophia Lopez",
    age: 41,
    address: "Cairo Place",
  },
  {
    key: "17",
    name: "Logan Perez",
    age: 26,
    address: "Mumbai Court",
  },
  {
    key: "18",
    name: "Amelia Sanchez",
    age: 34,
    address: "Shanghai Street",
  },
  {
    key: "19",
    name: "Ethan Nguyen",
    age: 47,
    address: "Buenos Aires Avenue",
  },
  {
    key: "20",
    name: "Harper Kim",
    age: 39,
    address: "Mexico City Lane",
  },
  {
    key: "21",
    name: "William Wang",
    age: 36,
    address: "Berlin Place",
  },
  {
    key: "22",
    name: "Charlotte Li",
    age: 43,
    address: "Tokyo Street",
  },
  {
    key: "23",
    name: "James Patel",
    age: 29,
    address: "Seoul Avenue",
  },
];
function Tablegrid() {
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="flex flex-col justify-center gap-3">
      <Search
        placeholder="input search text"
        className="self-end mr-4"
        onChange={(e) => console.log(e.target.value)}
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <Table
        columns={columns}
        dataSource={data}
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
