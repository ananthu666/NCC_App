import React, { useState, useEffect } from "react";
import moment from "moment";
import { Card, Form, Input, Button, DatePicker, Row, Col, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useLocation } from "react-router-dom";
import Table from "../components/Finance/Logistics/Clothing_Table";
import { database } from "../../firebase";
import { doc, setDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

const Clothing = () => {
  const { ncc_no } = useParams();
  const { Option } = Select;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const cadetsRef = collection(database, "clothing");
        const querySnapshot = await getDocs(cadetsRef);
        const data = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData.no === ncc_no) {
            data.push(docData);
          }
        });
        setItems(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };
    fetchDataFromFirestore();
  }, [ncc_no]);

  const handleAddItem = async (formValues) => {
    try {
      // Assuming you have a Firestore reference named citiesRef
      const cadetsRef = collection(database, "clothing");
      // Data to be sent
      const data = {
        no: ncc_no || "999999",
        item: formValues.item || "Default Name",
        qtyAuth: formValues.qtyAuth || "Default Qty Auth",
        type: formValues.retentionOrLifecycle || "Default None",
        dueDate: formValues.dueDate ? formValues.dueDate : "01-01-2000",
        qtyIssued: formValues.qtyIssued || "Default Qty Issued",
        dateOfIssue: formValues.dateOfIssue
          ? formValues.dateOfIssue
          : "01-01-2000",
      };
      const documentRef = doc(cadetsRef);
      await setDoc(documentRef, data);
      console.log("Data successfully sent to Firestore!");
    } catch (error) {
      console.error("Error sending data to Firestore:", error);
    }
    setItems([...items, formValues]);
  };

  return (
    <div className="container">
      <Card title="INDIVIDUAL CLOTHING ISSUE CARD" className="issueCard">
        <Row gutter={20}>
          <Col span={15}>
            <AddItemForm handleAddItem={handleAddItem} />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={15}>
            <Table clothes={items} className="issueTable" />
          </Col>
        </Row>
      </Card>
      <style>{`
      .container {
          height: 95vh; /* Set container height to 80% of viewport height */
          overflow: auto; /* Add scrollbar when content exceeds the container height */
          margin: 0px auto; /* Center the container horizontally */
          max-width: 100%; /* Set a maximum width for the container */
          padding: 0px; /* Add some padding within the container */
          border: 1px solid #ccc; /* Add a border for better visual separation */
          border-radius: 8px; /* Add rounded corners */
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow */
      }
      .issueCard{
        width: 100%; /* Make the card take up the full width of the container */
          margin: 0; /* Remove any margin from the card */
          height: 95vh;

      }
      .issueTable{
        max-width: 1000px;
      }
    `}</style>
    </div>
  );
};

const AddItemForm = ({ handleAddItem }) => {
  const [form] = Form.useForm();
  const [dueDate, setDueDate] = useState(null);
  const [dateOfIssue, setDateOfIssue] = useState(null);

  const onAdd = (values) => {
    const formData = {
      ...values,
      dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null,
      dateOfIssue: dateOfIssue ? dateOfIssue.format("YYYY-MM-DD") : null,
    };
    handleAddItem(formData);
    form.resetFields();
    setDueDate(null);
    setDateOfIssue(null);
  };

  return (
    <div>
      <Form form={form} layout="inline" onFinish={onAdd} style={formStyles}>
        <Form.Item
          name="item"
          label="Item"
          rules={[{ required: true, message: "Please input the item!" }]}
          style={formItemStyles}
        >
          <Input style={inputStyles} />
        </Form.Item>
        <Form.Item
          name="qtyAuth"
          label="Qty auth"
          rules={[{ required: true, message: "Please input the qty auth!" }]}
          style={formItemStyles}
        >
          <Input style={inputStyles} />
        </Form.Item>

        <Form.Item
          name="retentionOrLifecycle"
          label="Retention or Lifecycle"
          rules={[
            {
              required: true,
              message: "Please select either Retention or Lifecycle!",
            },
          ]}
          style={formItemStyles}
        >
          <Select
            style={inputStyles}
            placeholder="Select Retention or Lifecycle"
          >
            <Option value="Retention">Retention</Option>
            <Option value="Lifecycle">Lifecycle</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select the due date!" }]}
          style={formItemStyles}
        >
          <DatePicker
            value={dueDate ? moment(dueDate) : null}
            onChange={(date) => setDueDate(date)}
            style={inputStyles}
          />
        </Form.Item>
        <Form.Item
          name="qtyIssued"
          label="Qty issued"
          rules={[{ required: true, message: "Please input the qty issued!" }]}
          style={formItemStyles}
        >
          <Input style={inputStyles} />
        </Form.Item>
        <Form.Item
          name="dateOfIssue"
          label="Date of Issue"
          rules={[
            { required: true, message: "Please select the date of issue!" },
          ]}
          style={formItemStyles}
        >
          <DatePicker
            value={dateOfIssue ? moment(dateOfIssue) : null}
            onChange={(date) => setDateOfIssue(date)}
            style={inputStyles}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={buttonStyles}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const formStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "900px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
  padding: "16px",
};

const formItemStyles = {
  marginBottom: "16px",
  marginRight: "16px",
};

const inputStyles = {
  width: "300px",
};

const buttonStyles = {
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
  marginBottom: "16px",
  marginLeft: "16px",
};

export default Clothing;
