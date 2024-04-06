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

  const onFinish = () => {
    const formValues = form.getFieldsValue();
    const newData = {
      title: formValues.name,
      date: formValues.date, // Use the selected year
      desc: formValues.desc,
    };
    setData((prevData) => [...prevData, newData]); // Use callback form of setData
    setIsModalOpen(false);

    // Close the modal
  };
  useEffect(() => {
    console.log(data); // Print data whenever it changes
  }, [data]);

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
  const beforeUpload = (file) => {
    // const isWordOrPdf =
    //   file.type === "application/msword" ||
    //   file.type === "application/pdf" ||
    //   file.type ===
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    // if (!isWordOrPdf) {
    //   message.error("You can only upload Word or PDF files!");
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("File must be smaller than 2MB!");
    // }
    // console.log(file);
    // return isWordOrPdf && isLt2M;
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    // Check if e contains a fileList property
    if (e && e.fileList && Array.isArray(e.fileList)) {
      return e.fileList;
    }
    // If neither array nor object with fileList property, return null or an empty array
    return null; // or [] depending on how you want to handle this case
  };

  return (
    <div className="flex gap-4 ">
      <SideBar className="" />
      <div className="flex-1 flex mr-4 flex-col rounded-md justify-center self-center  bg-white p-4 h-full overflow-auto">
        <div className="flex-1 flex flex-col">
          <div className=" flex flex-1 self-start justify-start font-poppins">
            <div className="text-3xl text-left font-semibold mb-3">
              Documents
            </div>
          </div>
          <Form
            form={form}
            className="text-left "
            name="nest-messages"
            // onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
            validateMessages={validateMessages}
          >
            <Form.Item name={"name"} label="Name">
              <Input />
            </Form.Item>
            <Form.Item label="Date" name="date">
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
              action="/"
              label="Upload Document"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Upload pdf or word file only. Max size: 2MB"
            >
              <Upload name="logo" listType="" beforeUpload={beforeUpload}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                onClick={onFinish}
                className="bg-blue-700 text-white"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>

        <List
          style={{
            maxHeight: "calc(100vh - 25rem)",
            height: "calc(100vh - 10rem)",
            overflow: "auto",
            width: "100%",
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
      </div>
    </div>
  );
};

export default Training2;
