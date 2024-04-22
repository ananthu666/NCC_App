import React from 'react';
import { Table } from 'antd';

const ClothingTable = ({ clothes }) => {
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Qty auth',
      dataIndex: 'qtyAuth',
      key: 'qtyAuth',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Qty issued',
      dataIndex: 'qtyIssued',
      key: 'qtyIssued',
    },
    {
      title: 'Date of Issue',
      dataIndex: 'dateOfIssue',
      key: 'dateOfIssue',
    },
  ];

  return <Table dataSource={clothes} columns={columns} />;
};

export default ClothingTable;