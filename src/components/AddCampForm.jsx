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

import { data } from "autoprefixer";
const { Option } = Select;

const CadetForm=()=>
{
  return (
    <Card
      title="Camp  Form"
      className="flex-1 overflow-x-hidden  my-4 mx-6 py-2 px-4"
    >
      <Form
        
        name="campregister"
        
        // initialValues={data}
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
          </Col>
          <Col>
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

          </Col>
  
          <Col>
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
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="ifscCode" label="IFSC Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="identificationMark"
            label="Identification Mark"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          </Col>
  
          <Col>
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

          <Form.Item>
            <Button htmlType="submit" >
              Register
            </Button>
          </Form.Item>
          
        </Col>
      </Form>
    </Card>
  );
};

export default CadetForm;
