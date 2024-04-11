import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { Button, Card, Modal, Select, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { database } from "../../firebase";

const UnitFinance = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(10000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [months, setMonths] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchMonths = async () => {
      const monthsRef = collection(database, "unit_fin_monthly");
      const querySnapshot = await getDocs(monthsRef);
      const monthList = [];
      querySnapshot.forEach((doc) => {
        monthList.push({ id: doc.id, ...doc.data() });
      });
      setMonths(monthList);
    };
    fetchMonths();
  }, []);

  const onClick = (month, year) => {
    navigate(`/unitfinance/${month}${year}`, { state: { month, year } });
  };

  const onFinish = async (formData) => {
    // map month to word
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthWord = monthNames[formData.month - 1]; // Adjust index since months are 0-indexed in JavaScript Date object
    
    const newData = {
      month: monthWord,
      year: formData.year,
      description: formData.description,
    };
    
    try {
      const cadetsRef = collection(database, "unit_fin_monthly");
      
      const documentRef = doc(cadetsRef, `${formData.month}${formData.year}`);
      await setDoc(documentRef, newData);
      console.log("Data successfully sent to Firestore!");
      setMonths([...months, newData]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending data to Firestore:", error);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full flex flex-col justify-start h-full flex-1 self-start">
        <TopBar name="Unit Finance" />
        <div className="flex-1 bg-white">
          <div className="flex flex-col bg-white rounded-3xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                    Account Details
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Current balance in your account:
                  </p>
                </div>
                <div className="mt-6">
                  <p>
                    <span className="text-5xl font-light tracking-tight text-black">
                      ₹ {balance.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
              <Button
                onClick={showModal}
                icon={<PlusOutlined />}
                className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
              >
                Add transaction
              </Button>
            </div>
          </div>
        </div>
        <Modal
          title="Add transaction"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Form onFinish={onFinish}>
            <Form.Item
              label="Select Month"
              name="month"
              rules={[{ required: true, message: "Please select the month!" }]}
            >
              <Select style={{ width: 120 }}>
                {Array.from(Array(12).keys()).map((month) => (
                  <Select.Option key={month} value={month + 1}>
                    {new Date(0, month).toLocaleString("default", {
                      month: "long",
                    })}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Select Year"
              name="year"
              rules={[{ required: true, message: "Please input the year!" }]}
            >
              <Input type="number" placeholder="Enter Year" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Add description" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex flex-wrap justify-start">
          {months.map((item, index) => (
            <Card
              key={index}
              title={`${item.month} ${item.year}`}
              className="m-2"
              style={{ width: 250 }}
              onClick={() => onClick(item.month, item.year)}
            >
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitFinance;
