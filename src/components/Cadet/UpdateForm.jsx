import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  message,
  Card,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;
const UpdateForm = ({ data = {}, initialFileList = {}, handleSubmit }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(data);
  const storage = getStorage();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const handleButton = async (e) => {
    handleSubmit(formData);
  };

  const beforeUpload = (file) => {
    const isJPGOrPNG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPGOrPNG) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJPGOrPNG && isLt2M;
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const onUpload = (e) => {
    const value = e.fileList[0].originFileObj;
    setFormData({ ...formData, upload: value });
  };

  const myUrl =
    initialFileList && initialFileList.length > 0
      ? initialFileList[0]["url"]
      : "";
  const urlString = Array.isArray(myUrl) ? myUrl.join("") : myUrl.toString();
  return (
    <Card
      title="Cadet Registration Form"
      className="flex-1 overflow-x-hidden my-4 mx-6 py-2 px-4"
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={data}
        scrollToFirstError
        className="flex px-8 gap-2 justify-around"
      >
        <div className="bg_logo">
          <img
            src="/NCC.png"
            className="absolute inset-0 mx-auto my-auto h-2/5 opacity-10"
            draggable="false"
            alt=""
          />
        </div>
        <Col>
          <Form.Item name=" " label="Image" rules={[{ required: false }]}>
            <img
              src={urlString}
              alt="cadet image"
              style={{
                width: "180px",
                height: "210px",
                borderRadius: "8px",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
                objectFit: "cover",
              }}
            />
          </Form.Item>
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="college"
            label="College"
            rules={[{ required: true }]}
          >
            <Input onChange={onChange} />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="bankAccountNumber"
            label="Bank Account Number"
            rules={[{ required: true }]}
          >
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item name="height" label="Height" rules={[{ required: true }]}>
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select onChange={onChange}>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="division"
            label="Division"
            rules={[{ required: true }]}
          >
            <Select onChange={onChange}>
              <Option value="infantry">Infantry</Option>
              <Option value="armored">Armored</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input onChange={onChange} />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select onChange={onChange}>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="ifsc" label="IFSC Code" rules={[{ required: true }]}>
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="identificationMark"
            label="Identification Mark"
            rules={[{ required: true }]}
          >
            <Input.TextArea onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="motherName"
            label="Mother's Name"
            rules={[{ required: true }]}
          >
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="dateOfEnrolment"
            label="Date of Enrolment"
            rules={[{ required: true }]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>

          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item
            name="fatherName"
            label="Father's Name"
            initialValue={data["father'sName"]}
            rules={[{ required: true }]}
          >
            <Input onChange={onChange} />
          </Form.Item>

          <Form.Item
            name=" "
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Image must be smaller than 2MB and in JPG/PNG format"
          >
            <Upload
              name="logo"
              onChange={onUpload}
              action="/upload.do"
              listType="picture"
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" onClick={handleButton}>
              UPDATE
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Card>
  );
};
export default UpdateForm;
