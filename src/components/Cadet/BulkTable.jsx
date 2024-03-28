import React from "react";
import { Button, Flex, Table, Input, Select, Popconfirm, message } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { deleteDoc } from "firebase/firestore";
import { database } from "../../../firebase";

function Tablegrid({ data }) {
  // const handleDelete = async (id) => {
  //   try {
  //     await deleteDoc(doc(database, "cadet_in_camp", id));
  //     console.log("Document successfully deleted!");
  //     message.success("Document successfully deleted!");
  //   } catch (e) {
  //     console.error("Error removing document: ", e);
  //   }
  // };

  // Function to generate columns dynamically based on the keys of the first item in data
  const generateColumns = () => {
    if (!data || data.length === 0) return []; // Return an empty array if data is empty

    const keys = Object.keys(data[0]); // Get keys from the first item in data

    return keys.map((key) => ({
      title: key.toUpperCase(), // Use the key as title
      dataIndex: key, // Set dataIndex to key
      key: key, // Set key to key
      width: 150, // Set a default width
      render: (text) => {
        if (typeof text === 'boolean') {
          return text ? 'True' : 'False'; // Convert boolean to text
        }
        return text; // Return the original value for non-boolean values
      },
    }));
  };

  const columns = generateColumns(); // Generate columns dynamically

  return (
    <div className="flex flex-col z-0 mt-10 w-11/12">
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
        showSizeChanger="false"
        loading={!data} // Show loading when data is not available
      />
    </div>
  );
}

export default Tablegrid;
