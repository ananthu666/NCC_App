import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { Button, Card, DatePicker, Form, Input, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
const UnitFinance = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(10000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([
    { month: "January", year: 2021, description: "January Transaction" },
  ]);
  const formatBalanceWithCommas = (balance) => {
    return balance.toLocaleString();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = (month, year) => {
    navigate(`/unitfinance/${month}${year}`, { state: { month, year } });
  };

  const onFinish = (formData) => {
    const newData = {
      month: formData.month,
      year: formData.year, // Use the selected year
      description: formData.description,
    };
    setData((prevData) => [...prevData, newData]); // Use callback form of setData
    setIsModalOpen(false);

    // Close the modal
  };

  useEffect(() => {
    console.log(data); // Print data whenever it changes
  }, [data]);
  return (
    <div className="flex  ">
      <SideBar className="" />
      <div className="w-full flex flex-col justify-start h-full flex-1 self-start  ">
        <TopBar name="Unit Finance" />
        <div className="flex-1 bg-white">
          <div class="flex flex-col bg-white rounded-3xl">
            <div class="px-6 py-8 sm:p-10 sm:pb-6">
              <div class="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2 class="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                    Account Details
                  </h2>
                  <p class="mt-2 text-sm text-gray-500">
                    Current balance in your account :
                  </p>
                </div>
                <div class="mt-6">
                  <p>
                    <span class="text-5xl font-light tracking-tight text-black">
                      ₹ {formatBalanceWithCommas(balance)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="flex px-6 pb-8 sm:px-8">
              <Button
                onClick={showModal}
                icon={<PlusOutlined />}
                aria-describedby="tier-company"
                class="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                href="#"
              >
                Add transaction
              </Button>
            </div>
          </div>
        </div>
        <Modal
          title="Add transaction"
          open={isModalOpen}
          okButtonProps={{ className: "bg-blue-700 text-white hidden" }}
          cancelButtonProps={{ className: "bg-red-700 text-white hidden" }}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {/* Form to select year and month only */}
          <Form onFinish={onFinish}>
            <Form.Item
              label="Select Month"
              name={"month"}
              rules={[{ required: true, message: "Please input the month!" }]}
            >
              <Select
                defaultValue="january"
                style={{
                  width: 120,
                }}
                // onChange={}
                options={[
                  {
                    value: "january",
                    label: "January",
                  },
                  {
                    value: "february",
                    label: "February",
                  },
                  {
                    value: "march",
                    label: "March",
                  },
                  {
                    value: "april",
                    label: "april",
                  },
                  {
                    value: "may",
                    label: "may",
                  },
                  {
                    value: "june",
                    label: "june",
                  },
                  {
                    value: "july",
                    label: "july",
                  },
                  {
                    value: "august",
                    label: "august",
                  },
                  {
                    value: "september",
                    label: "september",
                  },
                  {
                    value: "october",
                    label: "october",
                  },
                  {
                    value: "november",
                    label: "november",
                  },
                  {
                    value: "december",
                    label: "december",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Select Year"
              name="year"
              rules={[{ required: true, message: "Please input the year!" }]}
            >
              <Input type="number" placeholder="Enter Year" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                name="description"
                placeholder="Add description"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="bg-blue-700 text-white">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="flex flex-wrap justify-start">
          {data.map((item, index) => (
            <Card
              onClick={() => onClick(item.month, item.year)}
              key={index}
              title={`${item.month} ${item.year}`}
              className="m-2"
              style={{ width: 250 }}
              onCanPlay={() => {}}
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
