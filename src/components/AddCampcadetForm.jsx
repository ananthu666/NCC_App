import React, { useState } from "react";

import { database } from "../../firebase";
import {
  doc,
  collection,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

// Generate a UUID

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

const CadetForm=(index)=>
{
  const [form1] = Form.useForm();
  // add to database ****************************************
  const gen_id = uuidv4();
    const addcampcd = async () => {
      const formValues = form1.getFieldsValue();
      
      try {
        // Assuming you have a Firestore reference named citiesRef
        const cadetsRef = collection(database, "cadet_in_camp");
  
        // Data to be sent
        const data = {
          
          cadet_num: formValues.cadetnum,
          cadet_rank: formValues.rank ,
          cadet_name: formValues.cadetname ,
          cadet_insti: formValues.institution ,
          cadet_act: formValues.activities ,
          cadet_rem: formValues.remarks ,
          cadet_veg: formValues.veg ,
          campid: index.index,
          
          
  
          
          
        };
        console.log(data);
        const documentRef = doc(cadetsRef,gen_id);
        await setDoc(documentRef, data);
        console.log("Data successfully sent to Firestore!");
      } catch (error) {
        console.error("Error sending data to Firestore:", error);
      }
    };
    // ***************************************************
    const [data, setdata] = useState([]);

    async function getCamps(db = database) {
      // ////////////////////////////////
      const docRef = doc(db, "camp_main", index);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // ////////////////////////////////
      return docSnap.data();
    }
    async function fetchCamps() {
      try {
        
        const campList = await getCamps();
        setdata(campList);
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
    useState(() => {
        
        fetchCamps();
      });
      console.log(data);
  return (
    <div style={{display:"flex"}}>
    
    <Card
      title="Cadet Register Form"
      className="flex-1 overflow-x-hidden  my-4 mx-6 py-2 px-4"
    >
      <Form
        
        name="cadetregister"
        form={form1}
        // initialValues={data}
        onFinish={addcampcd} 
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
          

          <Form.Item name="cadetnum" label="Cadet No" rules={[{ required: true }]}>
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
            name="cadetname"
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
              <Option value="veg">Veg</Option>
              <Option value="nonveg">Non Veg</Option>
              
            </Select>
          </Form.Item>

          
          
        </Col>
      </Form>
    </Card>
    </div>
  );
};

export default CadetForm;
