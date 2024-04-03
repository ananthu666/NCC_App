import { useNavigate } from "react-router";
import SideBar from "../components/SideBar";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Form,
  List,
  Modal,
  Skeleton,
  Input,
  InputNumber,
  DatePicker,
  Upload,
} from "antd";

const Training2 = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/training2/doc1`);
  };
  // const layout = {
  //   labelCol: {
  //     span: 8,
  //   },
  //   wrapperCol: {
  //     span: 16,
  //   },
  // };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const [data, setData] = useState([
    {
      title: "Title 1",
      desc: "Description of the document",
    },
    {
      title: "Title 2",
      desc: "Description of the document",
    },
    {
      title: "Title 3",
      desc: "Description of the document",
    },
    {
      title: "Title 4",
      desc: "Description of the document",
    },
  ]);

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

  const onFinish = (formData) => {
    const newData = {
      title: formData.name,
      date: formData.date, // Use the selected year
      desc: formData.desc,
    };
    setData((prevData) => [...prevData, newData]); // Use callback form of setData
    setIsModalOpen(false);

    // Close the modal
  };

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex gap-4 ">
      <SideBar className="" />
      <div className="flex-1 flex mr-4 rounded-md justify-center self-center  bg-white items-center p-4 h-full overflow-auto">
        <List
          header={
            <div className=" flex justify-between font-poppins">
              <div className="text-3xl text-left font-semibold ">Documents</div>
              <div className="">
                <Button
                  onClick={showModal}
                  type="danger"
                  className="bg-red-600 hover:bg-red-500 text-white"
                >
                  Upload
                </Button>
              </div>
            </div>
          }
          style={{
            height: "calc(100vh - 5rem)",
            overflow: "auto",
          }}
          className="flex-1"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<div>{item.title}</div>}
                description={<div>{item.desc}</div>}
              />
              <List.Item
                actions={[<Button onClick={handleClick}>View</Button>]}
              ></List.Item>
            </List.Item>
          )}
        />
        <Modal
          title="Upload Document"
          open={isModalOpen}
          okButtonProps={{ className: "bg-blue-700 text-white hidden" }}
          cancelButtonProps={{ className: "bg-red-700 text-white hidden" }}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            className="text-left"
            name="nest-messages"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
            validateMessages={validateMessages}
          >
            <Form.Item name={"name"} label="Name">
              <Input />
            </Form.Item>
            <Form.Item
              label="Date"
              name="date"
              rules={[
                {
                  message: "Please input!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name={"desc"}
              label="Description"
              rules={[
                {
                  type: "text",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="upload"
              label="Upload Image"
              valuePropName="fileList"
              // getValueFromEvent={normFile}
              extra="Image must smaller than 2MB and in JPG/PNG format"
            >
              <Upload
                name="logo"
                action="/upload.do"
                listType="picture"
                // beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="bg-blue-700 text-white">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Training2;
