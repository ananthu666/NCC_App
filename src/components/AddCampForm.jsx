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
        {/* <div className="bg_logo">
          <img
            src="/NCC.png"
            className="absolute inset-0 mx-auto my-auto h-2/5 opacity-10"
            draggable="false"
            alt=""
          />
        </div> */}
        <Col>
          

          <Form.Item name="Camp Name" label="CampName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="Camp Area"
            label="CampArea"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Camp Date"
            label="CampDate"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="Camp Commander"
            label="CampCommander"
            rules={[{ required: true }]}
          >
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
