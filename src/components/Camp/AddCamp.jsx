import React, { useState } from "react";

import { database } from "../../../firebase";
import {
  doc,
  collection,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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
  const [form1] = Form.useForm();
  // add to database ****************************************
    const addcamptodb = async () => {
      const formValues = form1.getFieldsValue();
      console.log(formValues);
      try {
        // Assuming you have a Firestore reference named citiesRef
        const cadetsRef = collection(database, "camp_main");
  
        // Data to be sent
        const data = {
          camp_name: formValues.camp_name ,
          camp_area: formValues.camp_area ,
          camp_date: formValues.camp_date.format("DD-MM-YYYY") ,
          
          camp_bal:{},
          camp_commander: formValues.camp_commander,
          camp_assistant: formValues.camp_assistant,
          
        };
        const documentRef = doc(cadetsRef, formValues.camp_name);
        await setDoc(documentRef, data);
        console.log("Data successfully sent to Firestore!");
      } catch (error) {
        console.error("Error sending data to Firestore:", error);
      }
      form1.resetFields();
    };
    
  return (
    <div className="flex" style={styles.Container}>

    <Card
      title="Camp Register Form"
      className="flex-1 overflow-x-hidden  my-4 mx-3 py-2 px-4"
      
    >
      <Form
        style={styles.innerbox}
        name="campregister"
        form={form1}
        
        scrollToFirstError
        className="flex flex-1 px-8 gap-3 justify-around"
        onFinish={addcamptodb} 
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
          

          <Form.Item name="camp_name" label="Camp Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="camp_area"
            label="Camp Area"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit"  style={styles.btn}>
              Register Camp
            </Button>
          </Form.Item>
        </Col>
        <Col>

          <Form.Item
            name="camp_commander"
            label="Camp Commander"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="camp_assistant"
            label="Camp Assistant Commander"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="camp_date"
            label="Camp Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          
          
        </Col>
        
      </Form>
    </Card>
   
    </div>
  );
};

export default CadetForm;

const styles = {
  Container: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
  },
  btn: {
    
    height: "50px",
    fontSize: "20px",
    backgroundColor: "grey",
    borderRadius: "10px",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    
  },
  innerbox: {
    margin: "20px",
    padding: "20px",
    backgroundColor: "lightgrey",
    borderRadius: "10px",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};