import React from "react";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ClothingTable = ({ clothes, onDeleteItem }) => {
  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Qty auth",
      dataIndex: "qtyAuth",
      key: "qtyAuth",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Qty issued",
      dataIndex: "qtyIssued",
      key: "qtyIssued",
    },
    {
      title: "Date of Issue",
      dataIndex: "dateOfIssue",
      key: "dateOfIssue",
    },
    {
      title: "retention or Lifecycle",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => onDeleteItem(record)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return <Table dataSource={clothes} columns={columns} />;
};

export default ClothingTable;
