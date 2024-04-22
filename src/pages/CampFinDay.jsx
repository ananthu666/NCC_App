import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { useLocation, useNavigate } from "react-router";
import { Card, Typography, Modal, Input } from "antd";
import { List } from "antd";

const CampFinDay = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const camp = location.state;
  //   console.log(data.camp_name);
  const data = [
    {
      camp_name: "Day 1",
      date: "2021-10-01",
      total_expense: 1000,
      total_income: 2000,
      balance: 1000,
    },
    {
      camp_name: "Day 2",
      date: "2021-10-02",
      total_expense: 2000,
      total_income: 3000,
      balance: 1000,
    },
    {
      camp_name: "Day 3",
      date: "2021-10-03",
      total_expense: 3000,
      total_income: 4000,
      balance: 1000,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [values, setValues] = useState({
    value1: "",
    value2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    // Do something with the values, for example, log them
    console.log("Submitted values:", values);
  };
  const handleClick = (index) => {
    console.log(`Card clicked with name: ${index.camp_name}`);
    navigate(`/campfin/${camp}/${index.camp_name}`, {
      state: { camp_name: index },
    });
  };
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <div className="flex flex-col bg-white m-4 rounded-lg w-full min-h-full justify-start ">
        <div className="border-0 px-3 border-b  h-fit w-full">
          <h1 className="text-3xl m-3 font-semibold">{camp.camp_name}</h1>
        </div>
        <div className="flex flex-col gap-3  p-3">
          <div className="flex  justify-between p-3 border rounded-lg">
            <div className="">
              <Typography.Title level={5}>Camp Details</Typography.Title>
              <Typography.Text>Start Date: {camp.start_date}</Typography.Text>
              <br />
              <Typography.Text>End Date: {camp.end_date}</Typography.Text>
              <br />
              <Typography.Text>Location: {camp.location}</Typography.Text>
              <br />
              <Typography.Text>Organizer: {camp.organizer}</Typography.Text>
              <br />
              <Typography.Text>
                Organizer Contact: {camp.organizer_contact}
              </Typography.Text>
            </div>
            <div className="">
              <button
                onClick={showModal}
                className="bg-blue-600 text-white py-2 px-3 rounded-lg"
              >
                {" "}
                Add Day{" "}
              </button>
            </div>
          </div>

          <List
            header={<div className="font-semibold">Daily Expense</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item onClick={() => handleClick(item)}>
                <Typography.Text>{item.camp_name}</Typography.Text>
                <Typography.Text> {item.date}</Typography.Text>
                <Typography.Text>
                  Total Expense: {item.total_expense}
                </Typography.Text>
                <br />
                <Typography.Text>
                  Total Income: {item.total_income}
                </Typography.Text>
                <br />
                <Typography.Text>Balance: {item.balance}</Typography.Text>
              </List.Item>
            )}
          />
        </div>
        <Modal
          title="Add Day"
          open={isModalOpen}
          onCancel={handleCancel}
          okType="submit"
          okButtonProps={{ block: false }}
          footer={null}
        >
          <form onSubmit={handleSubmit}>
            <label className="flex gap-2">
              <div className="flex  whitespace-nowrap items-center justify-center">
                Day :
              </div>
              <Input
                type="text"
                name="value1"
                placeholder="Day No"
                value={values.value1}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="flex gap-2">
              <div className="flex  whitespace-nowrap items-center justify-center">
                Date :
              </div>
              <Input
                type="text"
                name="value2"
                placeholder="Date eg: 01-10-2024"
                value={values.value2}
                onChange={handleChange}
              />
            </label>
            <br />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CampFinDay;
