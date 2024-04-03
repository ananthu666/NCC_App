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

  const onFinish = (values) => {
    console.log(values);
  };

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
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
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
          okButtonProps={{
            className: "bg-blue-600 text-white",
          }}
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
            <Form.Item name={["user", "name"]} label="Name">
              <Input />
            </Form.Item>
            <Form.Item
              label="Date"
              name="DatePicker"
              rules={[
                {
                  message: "Please input!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name={["desc", "desc"]}
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
              label="Upload"
              valuePropName="fileList"
              extra="Upload the document here"
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Training2;
