import React from "react";
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

const CadetForm = () => {
  const [form] = Form.useForm();

  // Function to handle form submission
  const onFinish = (values) => {
    // Process form values here
    console.log("Received values of form:", values);
  };

  // Function to handle file uploads
  const beforeUpload = (file) => {
    const isJPGOrPNG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPGOrPNG) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
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

  return (
    <Card
      title="Cadet Registration Form"
      className="flex-1 overflow-x-hidden  my-4 mx-6 py-2 px-4"
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="flex px-8 gap-2 justify-around"
      >
        <Col>
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="college"
            label="College"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bankAccountNumber"
            label="Bank Account Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="height" label="Height" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              {/* Add other categories here */}
            </Select>
          </Form.Item>

          <Form.Item
            name="division"
            label="Division"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="infantry">Infantry</Option>
              <Option value="armored">Armored</Option>
              {/* Add other divisions here */}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="ifsc" label="IFSC Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="identificationMark"
            label="Identification Mark"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="motherName"
            label="Mother's Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateOfEnrolment"
            label="Date of Enrolment"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="fatherName"
            label="Father's Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Image must smaller than 2MB and in JPG/PNG format"
          >
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Register</Button>
          </Form.Item>
        </Col>
      </Form>
    </Card>
  );
};

export default CadetForm;
