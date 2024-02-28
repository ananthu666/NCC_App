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
    <div style={{display:"flex"}}>
    <Card
      title="Camp Register Form"
      className="flex-1 overflow-x-hidden  my-4 mx-3 py-2 px-4"
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
            name="CampArea"
            label="Camp Area"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="CampDate"
            label="Camp Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="CampCommander"
            label="Camp Commander"
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
        <Col>
        <Card
      title="Search Camp Form"
      className="flex-1 overflow-x-hidden  my-4 mx-3 py-2 px-4">
        <Col>
        <Form.Item name="name" label="Camp Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        <Form.Item>
            <Button htmlType="submit" >
              Search
            </Button>
          </Form.Item>
        </Col>
    </Card>
        </Col>
      </Form>
    </Card>
    <Card
      title="Cadet Register Form"
      className="flex-1 overflow-x-hidden  my-4 mx-6 py-2 px-4"
    >
      <Form
        
        name="cadetregister"
        
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
          

          <Form.Item name="Cadetnum" label="Cadet No" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="rank"
            label="Rank"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          

          <Form.Item
            name="name"
            label="Cadet Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="institution"
            label="Institution"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" >
              Add Cadet
            </Button>
          </Form.Item>
          </Col>
          <Col>
          
          <Form.Item
            name="activities"
            label="Activities"
            rules={[{ required: true }]}
            
            
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="veg" label="Veg/NonVeg" rules={[{ required: true }]}>
            <Select>
              <Option value="male">Veg</Option>
              <Option value="female">Non Veg</Option>
              
            </Select>
          </Form.Item>

          
          
        </Col>
      </Form>
    </Card>
    </div>
  );
};

export default CadetForm;
